# `@ezkomment/client`

The front-end of the app hosted at https://ezkdev.joulev.dev. Written in Next.js and styled by Tailwind CSS.

It currently uses Firebase for authentication, which is _subject to change_. **Don't merge this to `prod` just yet when this message is still here.**

- Set up a [Firebase project](https://firebase.google.com)
- Set up a [GitHub OAuth application](https://github.com/settings/developers)
- Set up Firebase authentication by GitHub with the client ID and client secret in the GitHub app
- Create a `.env.local` file (**not `.env`**) based on the structure of `.env.example` with your
  Firebase project's specific values.
- Run this with `yarn build && yarn dev`.
