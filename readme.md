# `ezkomment`

Monorepo for everything related to `ezkomment`. See readme in each individual package folder for
more details.

- [`client`](/packages/client): The client of the app hosted at https://ezkomment.vercel.app.
- [`server`](/packages/server): The server of the app. Currently just a dummy test file though.

This project uses NPM workspaces. To install all dependencies, simply run

```
$ npm install
```

from the project root directory. This command should also install the packages at `/packages` as if
they were NPM packages. Currently it is not yet necessary but it will in the future when we need to
import code cross-packages.

[See development guide in the Wiki](https://github.com/joulev/ezkomment/wiki/Development-Guide).
