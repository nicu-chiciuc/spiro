## About
The deployed version is on [nicu-chiciuc.github.io/spiro](https://nicu-chiciuc.github.io/spiro/)

![Screen capture of the project ](https://raw.githubusercontent.com/nicu-chiciuc/spiro/master/demo/demo.gif)

The project is a spirograph that can have multiple rotating arms.
This allows the creation of different interesting pictures.

The algorithm itself isn't very hard.
The biggest problem was creating a easy-to-use interface and also smoothing the curve by adding multiple points if the rotation is too fast.

The application doesn't use any build system.

## Deployment

Alchemy deploys the site from GitHub Actions. A push to `master` deploys
[spiro.pfp.workers.dev](https://spiro.pfp.workers.dev), and each pull request
gets a preview Worker that goes away when it closes. See `alchemy.run.ts` and
`.github/workflows/alchemy.yml`.
