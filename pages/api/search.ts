import { NextApiRequest, NextApiResponse } from 'next';

import { posts as postsEn } from '../../_cache/posts-en';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const query = req.query.q as string;
  // eslint-disable-next-line no-irregular-whitespace
  const words = query ? query.toLowerCase().replace(/　/g, ' ').split(' ') : [];

  const posts = postsEn;

  const results =
    words.length > 0
      ? posts.filter(
          (post) =>
            words.every((word) => post.title.includes(word)) ||
            words.every((word) => post.content.includes(word))
        )
      : [];

  res.status(200).json({ results });
};
