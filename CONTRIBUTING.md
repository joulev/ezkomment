# ezkomment development guide

_Effective as of 13 May 2022_

## Repository structure

This application is developed mainly on two branches.

- [`prod`](https://github.com/joulev/ezkomment/tree/prod) is the production branch. All code on it should be production ready. Deployed to https://ezkomment.joulev.dev. **Never do direct development on `prod`.**

- [`main`](https://github.com/joulev/ezkomment/tree/main) is the development branch. This is where you normally push your code. Deployed to https://ezkdev.joulev.dev.

## Development guide

### Large commits, refactoring, complicated implementation

For relatively large commits or sets of commits (around &ge;50 lines added and/or &ge;50 lines deleted in total, excluding generated files such as `yarn.lock`), they should be made on a separate branch, preferably with a name indicative of the goal/purpose of that (set of) commits (e.g. `google-auth-integration`).

Afterwards, pull requests should be opened for them to be merged into `main`. They should only be merged if they have been approved by the developer in charge of that field: @joulev for front-end matters and @VietAnh1010 for back-end matters.

In case the author is a core developer and he worked on the field he is in charge of, code review is not required; however the PR should only be merged after a self-reviewing session after a cool-down (about 3 hours or more) period.

PR should be merged _by rebasing_. Why? My personal preference &ndash; I don't like merged commits with 1000 lines added and 500 lines deleted, they are a nightmare to look at after merging, also you can't simply `git revert`.

### Smaller commits

Core developers can make commits directly on the `main` branch if those commits are relatively small _and_ they only concern the fields that the developer is in charge of. For example, a pull request should be avoided in trivial cases such as adding a banner to the website, so as not to send other developers too many notifications.

### Merge to `prod`

Once the code in `main` is stable and production-ready, core developers can merge it to `prod` and publish it. It is not possible to do that from GitHub UI, but on the command line it is as simple as

```sh
[main] git checkout prod
[prod] git merge main
[prod] git push
[prod] git checkout main # change back to main to continue development
```

### Hotfixes

Hotfixes are also subject to above rules (excluding cooldown periods), however you can contact the developer in charge directly to get things done more quickly.
