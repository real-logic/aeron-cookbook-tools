const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.json');
  const pages = await globby([
    'pages/*.js',
    '_articles/en/*.mdx',
    '_notes/en/*.mdx',
    '!pages/_*.js',
    '!pages/api',
    '!pages/404.js',
  ]);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const todayStr = yyyy + '-' + mm + '-' + dd;

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages', '')
                  .replace('_articles/en', 'article')
                  .replace('_notes/en', 'note')
                  .replace('.js', '')
                  .replace('.mdx', '');
                const route = path === '/index' ? '' : path;

                return `
                        <url>
                            <loc>${`https://www.shaunlaurens.com/${route}`}</loc>
                            <lastmod>${todayStr}</lastmod>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted);
})();
