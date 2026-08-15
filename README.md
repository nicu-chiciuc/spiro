## About

The deployed version is on [nicu-chiciuc.github.io/spiro](https://nicu-chiciuc.github.io/spiro/)

![Screen capture of the project ](https://raw.githubusercontent.com/nicu-chiciuc/spiro/master/demo/demo.gif)

The project is a spirograph that can have multiple rotating arms.
This allows the creation of different interesting pictures.

The algorithm itself isn't very hard.
The biggest problem was creating a easy-to-use interface and also smoothing the curve by adding multiple points if the rotation is too fast.

The browser application doesn't use a framework or bundler.

## Samebase deployment

The application source remains the original static HTML and canvas code. The repository adds only a
portable build and deployment contract for Samebase and Cloudflare Workers Static Assets; it does
not add a backend, authentication, server routes, or application data.

Install dependencies and create the exact three-file provider artifact:

```sh
pnpm install
pnpm run build
```

Cloudflare Workers Builds runs `pnpm run build`, followed by `pnpm run deploy` for `master` or
`pnpm run deploy:preview` for non-production branches. The Worker name is supplied by Workers
Builds and is intentionally not committed to `wrangler.jsonc`.

The build copies only `index.html`, `dat.gui.min.new.js`, and `stats.min.js` into `dist/client`.
Repository documentation, package metadata, and deployment configuration are therefore not public
assets. Missing paths return 404 instead of falling back to the application HTML.

The three browser files remain unchanged at their existing GitHub Pages paths. The two scripts stay
as minified JavaScript because they are the original required browser artifacts, not authored build
or deployment code.
