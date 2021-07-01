const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');
const globby = require('globby');
const title = require('title');

async function generate() {
  const feed = new RSS({
    title: 'Shaun Laurens',
    site_url: 'https://www.shaunlaurens.com',
    feed_url: 'https://www.shaunlaurens.com/feed.xml',
    generator: 'TypeScript'
  });

  const posts = await globby([
    '_articles/en/*.mdx',
    '_notes/en/*.mdx',
  ]);

  console.log("reading from " + posts);

  await Promise.all(
    posts
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
      .map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, '..', name)
      );
      const frontmatter = matter(content);

      feed.item({
        title: title(frontmatter.data.title),
        url: 'https://www.shaunlaurens.com/' + name.replace(/\.mdx?/, '').replace(/\/en/, '').replace("_articles","article").replace("_notes","note"),
        date: frontmatter.data.date,
        description: frontmatter.data.description
      });
    })
  );

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
