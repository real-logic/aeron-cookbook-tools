import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import title from 'title';

type Items = {
  [key: string]: string;
};

type Post = {
  data: {
    [key: string]: string;
  };
  content: string;
  headingList: Heading[];
  counterKey : string;
};

export type Heading = {
  title: string;
  link: string;
  level: number;
};

const ARTICLES_PATH = join(process.cwd(), '_articles');
const NOTES_PATH = join(process.cwd(), '_notes');

function getArticleFilePaths(): string[] {
  const lang = 'en';

  return (
    fs
      .readdirSync(join(ARTICLES_PATH, `${lang}`))
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
  );
}

function getNoteFilePaths(): string[] {
  const lang = 'en';

  return (
    fs
      .readdirSync(join(NOTES_PATH, `${lang}`))
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
  );
}

export function getArticle(slug: string): Post {
  const lang = 'en';
  const fullPath = join(ARTICLES_PATH, `${lang}`, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  data['title'] = title(data['title']);
  const regex = /<\/?!?(svg)[^]*\/svg>/ig;
  const repl = content.replace(regex, '');
  data['readingtime'] = readingTime(repl).text;
  const headingList = getHeadings(content);
  const counterKey = slug;
  return { data, content, headingList, counterKey };
}

export function getHeadings(source: string) : Heading[] {
  const allHeadings: Heading[] = [];
  const headingLines = source
    .split('\n')
    .filter((line) => {
      return line.match(/^###*\s/);
    });

  headingLines.map((raw) => {
    const titleRaw = raw.replace(/^###*\s/, '');
    const link = toLink(titleRaw);
    const level = raw.slice(0, 4) === '####' ? 4 : raw.slice(0, 3) === '###' ? 3 : 2;
    allHeadings.push(createHeading(titleRaw, link, level))
  });

  return allHeadings;
}

function createHeading(title: string, link: string, level: number): Heading {
  return { title, link, level };
}

export function toLink(input: string) : string {
  const stripped = input
    .replace(/^\s+|\s+$/g, "")
    .replace(/,/g, "")
    .replace(/&/g, "");
  return '#' + stripped.toLowerCase().replace(/ /g, '-')
    .replace(/--/g, '-');
}

export function getNote(slug: string): Post {
  const lang = 'en';
  const fullPath = join(NOTES_PATH, `${lang}`, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  data['title'] = title(data['title']);
  const regex = /<\/?!?(svg)[^]*\/svg>/ig;
  const repl = content.replace(regex, '');
  data['readingtime'] = readingTime(repl).text;
  const headingList = getHeadings(content);
  const counterKey = slug;
  return { data, content, headingList, counterKey };
}

export function getArticleItems(
  filePath: string,
  fields: string[] = []
): Items {
  const slug = filePath.replace(/\.mdx?$/, '');
  const { data, content } = getArticle(slug);

  if (!fields.includes('published')) {
    fields.push('published');
  }
  if (!fields.includes('area')) {
    fields.push('area');
  }
  if (!fields.includes('readingtime')) {
    fields.push('readingtime');
  }

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'area') {
      items[field] = 'article';
    }
    if (data[field]) {
      items[field] = data[field];
    }
    if (field === 'readingtime') {
      const rt = String(readingTime(content).minutes);
      items[field] = rt;
    }
  });

  return items;
}

export function getNoteItems(
  filePath: string,
  fields: string[] = []
): Items {
  const slug = filePath.replace(/\.mdx?$/, '');
  const { data, content } = getNote(slug);

  if (!fields.includes('published')) {
    fields.push('published');
  }
  if (!fields.includes('area')) {
    fields.push('area');
  }
  if (!fields.includes('readingtime')) {
    fields.push('readingtime');
  }

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'area') {
      items[field] = 'note';
    }

    if (data[field]) {
      items[field] = data[field];
    }
    if (field === 'readingtime') {
      const rt = String(readingTime(content).minutes);
      items[field] = rt;
    }

  });

  return items;
}

export function getAllArticles(fields: string[] = []): Items[] {
  const filePaths = getArticleFilePaths();
  const articles = filePaths
    .map((filePath) => getArticleItems(filePath, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  const filtered: Items[] = [];
  articles.forEach(item => String(item['published']) === 'true' ? filtered.push(item) : console.warn('skipping article slug=' + item['slug'] + ' as pub=' + item['published']));
  return filtered;
}

export function getAllNotes(fields: string[] = []): Items[] {
  const filePaths = getNoteFilePaths();
  const notes = filePaths
    .map((filePath) => getNoteItems(filePath, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  const filtered: Items[] = [];
  notes.forEach(item => String(item['published']) === 'true' ? filtered.push(item) : console.warn('skipping note slug=' + item['slug'] + ' as pub=' + item['published']));
  return filtered;
}

export function getEverything(fields: string[] = []) {
  const art = getAllArticles(fields);
  return art.concat(getAllNotes(fields));
}