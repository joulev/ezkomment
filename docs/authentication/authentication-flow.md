# Authentication flow

ezkomment currently uses [Firebase Authentication](https://firebase.google.com).

## Supported authentication methods

At the moment, ezkomment supports authentication via **GitHub** and **Google**, called _authentication providers_. To authenticate, you simply need to click on the corresponding button on [the authentication page](https://ezkomment.joulev.dev/auth). The remaining authentication flow is automatically handled by your authentication provider of choice.

If you use GitHub to authenticate to ezkomment, we recommend [using a strong password](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-strong-password) and use [two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/about-two-factor-authentication) on GitHub to further protect your accounts.

If you use Google to authenticate to ezkomment, we recommend [using a strong password](https://support.google.com/accounts/answer/32040) and set up more layers of security (e.g. by [setting up using phones to authenticate](https://support.google.com/accounts/answer/6361026) and/or [using two-factor authentication](https://support.google.com/accounts/answer/185839)) to further protect your accounts.

### Other authentication providers

Currently, ezkomment only supports the above two providers. If you would like to use a different authentication provider (such as Facebook, Apple, etc.), please [contact us](https://github.com/joulev/ezkomment/discussions).

ezkomment does not support authenticating with email addresses, whether with password or with one-time email links (magic links). We also do not intend to support this at any point in the future.

## Sign up and sign in

There is no need to explicitly sign up for ezkomment. To create an account, you simply need to click on either **Continue with Google** or **Continue with GitHub**. Your ezkomment account will automatically be created and populated with the display name and profile picture taken from your Google or GitHub account. Read [the section below](#data-from-github-andor-google-used-by-ezkomment) on how we use this data.

To sign in, you only need to click on one of the two buttons again &ndash; the sign up and sign in processes, from the user's point of view, are identical.

## Sign out

This section assumes you are already authenticated. To sign out, navigate to any pages under `/app`.

For mobile users, the sign out button is in the top navigation bar. Click on the top-left [hamburger icon](https://en.wikipedia.org/wiki/Hamburger_button) to display it, then click on **Log out**.

For users using wider screens, the sign out button is at the top right.

![The sign out button on desktop](/images/docs/authentication/authentication-flow/sign-out-button-desktop.png)

## Data from GitHub and/or Google used by ezkomment

Internally, ezkomment identifies users by their unique user ID (`uid`), which is a cryptographically random string generated on account creation. This `uid` is only associated with your ezkomment account and cannot be traced to any of your information.

Therefore, ezkomment neither store nor make use of any information (including public information) from your GitHub or Google account permanently.

On account creation, your public display name and profile picture from your GitHub/Google account will be used as the initial values for the respective fields in your ezkomment profile. However, you can always [update it](/docs/authentication/update-information) at any time, after which these initial values will be deleted permanently.

If you already have [linked a different provider](/docs/authentication/link-and-unlink-providers) to your account, you can always unlink the current provider (GitHub or Google) from your account. After that, all information about the unlinked provider will be permanently deleted and the unlinked account will be completely disassociated with your ezkomment account.
