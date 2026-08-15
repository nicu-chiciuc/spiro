## About

The deployed version is on [nicu-chiciuc.github.io/spiro](https://nicu-chiciuc.github.io/spiro/)

![Screen capture of the project ](https://raw.githubusercontent.com/nicu-chiciuc/spiro/master/demo/demo.gif)

The project is a spirograph that can have multiple rotating arms.
This allows the creation of different interesting pictures.

The algorithm itself isn't very hard.
The biggest problem was creating a easy-to-use interface and also smoothing the curve by adding multiple points if the rotation is too fast.

The application doesn't use any build system.

## Samebase deployment

The application source remains the original static HTML and canvas code. The repository now adds a
portable build and deployment contract for Samebase and Cloudflare Workers Static Assets; it does
not add a backend, authentication, server routes, or application data.

Install dependencies and start the local Vite+ server:

```sh
vp install
vp dev
```

Run the complete validation and provider build with:

```sh
vp run check
vp run build
```

Cloudflare Workers Builds runs `pnpm run build`, followed by `pnpm run deploy` for `master` or
`pnpm run deploy:preview` for non-production branches. The Worker name is supplied by Workers
Builds and is intentionally not committed to `wrangler.jsonc`.

`index.html` remains the original browser application and is excluded from automated formatting and
linting so migration-only reviews do not contain a behavior-risking source rewrite.
`dat.gui.min.new.js` and `stats.min.js` are the unchanged, required browser artifacts from the
original application. They remain at their GitHub Pages paths and are copied into the Cloudflare
build output. They remain minified JavaScript and share that tooling exception so the migration
preserves the existing interface and runtime behavior.
