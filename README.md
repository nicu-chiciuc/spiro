## About
The deployed version is on [nicu-chiciuc.github.io/spiro](https://nicu-chiciuc.github.io/spiro/)

![Screen capture of the project ](https://raw.githubusercontent.com/nicu-chiciuc/spiro/master/demo/demo.gif)

The project is a spirograph that can have multiple rotating arms.
This allows the creation of different interesting pictures.

The algorithm itself isn't very hard.
The biggest problem was creating a easy-to-use interface and also smoothing the curve by adding multiple points if the rotation is too fast.

The application doesn't use any build system.

## Cloudflare Worker Previews

Workers Builds runs `pnpm run build`, then `pnpm run deploy` for the production
branch or `pnpm run deploy:preview` for other branches.

For the one-time Cloudflare setup, use the
[Worker Previews migration guide](https://samebase.com/docs/cloudflare-previews-migration).
