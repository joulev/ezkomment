# Moderation

In several occasions, you would want to have some control over comments in your website. Whether that is for removing profanity, hate speech, abuse or any other reasons, being able to dictate whether a comment is visible to the public is something you would probably need sometimes. ezkomment does support that, and it is called the moderation feature.

## Approving comments

When a new comment arrives, whether or not it is immediately visible to the public depends on the _auto-approval configuration_ in which the ezkomment page operates:

- Auto-approval _enabled_ (default): All coming comments are automatically approved and made visible to everyone viewing the comment section. Therefore, when a commenter makes a comment, it will automatically be reflected everywhere.

- Auto-approval _disabled_: All coming comments are marked as "pending". You, as the page admin, have to go to the ezkomment page dashboard to read and approve those comments manually, one-by-one. Only after being approved would the comments be visible to everyone visiting your page. You may also choose to [delete any comments](#deleting-comments) if you want to.

  With auto-approval disabled, when a user inputs a new comment, it will _not_ be shown automatically. This may cause confusion, therefore we recommend updating the help text in the comment section (see [Customisation](/docs/customisation/introduction)) to clarify this.

You can [approve comments](/docs/moderation/approve-and-delete-comments#approve-comments) in the page dashboard and [update the auto-approval configuration](/docs/moderation/auto-approval-configuration) in the page settings.

## Deleting comments

You as page admin can always delete any comments you consider inappropriate, regardless of whether it has been approved or not.

**This is dangerous!**

Deleted comments are, well, deleted: your visitor cannot see them anymore. In fact, in accordance with our no-permanent-data policy, we will also completely delete it from all of our databases. In other words, comment deletions are **irreversible**: you cannot get a comment back once it has been removed.

As usual, throughout the whole ezkomment application, please think twice before deleting anything.

You can [delete comments](/docs/moderation/approve-and-delete-comments#delete-comments) in the page dashboard.
