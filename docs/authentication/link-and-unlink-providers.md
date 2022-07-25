# Link and unlink providers

Since ezkomment uses third-party authentication providers (GitHub and Google), it is possible to link GitHub and Google accounts to your ezkomment account. After linking, it is possible to sign in to ezkomment with that linked GitHub/Google account.

## Restrictions

No GitHub/Google accounts are permanently tied to your ezkomment account: you can always link and unlink any accounts. However there are a few restrictions:

- Each ezkomment account must be linked with _at least_ one GitHub/Google account at all time. Otherwise, it is impossible to sign in to your ezkomment account.

- You cannot link more than one account from the same provider at the same time. For example, it is impossible to link two Google accounts to the same ezkomment account.

- A Google account cannot be linked to more than one ezkomment account, and the same for a GitHub account.

## View currently linked providers

You can view the GitHub/Google accounts currently linked to your ezkomment accounts.

- Navigate to the **Account settings** page.

- You can view the account list under the **Link accounts** section.

![An example list with both Google and GitHub linked](/images/docs/authentication/link-and-unlink-providers/view-linked-accounts.png)

## Link a new account

You can link a new account by clicking on one of the buttons under **Link accounts** > **Link new account**. After clicking, there will be a popup where the whole authentication flow is handled by the third-party provider, similar to [how you sign up/sign in](/docs/authentication/authentication-flow#sign-up-and-sign-in).

![In this screenshot, it is possible to link a new Google account to the ezkomment account](/images/docs/authentication/link-and-unlink-providers/link-new-account.png)

Do note that there are a few restrictive rules in regards to account linking that you must follow. [They are documented above](#restrictions).

## Unlink a linked account

Since you must have at least one linked account at all time, this feature is only enabled when you have linked to both your GitHub and Google accounts. If you want to delete your ezkomment account instead, read [Delete account](/docs/authentication/delete-account).

In that case, you can unlink either of the two linked accounts at any time by following the steps below.

- Navigate to the **Account settings** page.

- Under the **Link accounts** section, click on either of the two red **Unlink** buttons available.
