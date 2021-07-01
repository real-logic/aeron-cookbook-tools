import fs from 'fs';
import title from 'title';

import { getEverything } from '../utils/mdxUtils';

const stringifyPosts = () =>
  `export const posts = ${JSON.stringify(
    getEverything(
      [
        'slug',
        'title',
        'content',
        'area',
      ]
    ).map((post) => ({
      slug: post.slug,
      title: post.title.toLowerCase(),
      area: post.area.toString().toLowerCase(),
      content: post.content.toLowerCase(),
    }))
  )}`;

fs.writeFile('_cache/posts-en.ts', stringifyPosts(), (err) => {
  if (err) return console.log(err);
  console.log('English posts cached.');
});
