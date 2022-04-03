const comments = [
    {
        author: "John Doe",
        text: "This is a great post. I like it.",
        date: "3 months ago",
    },
    {
        author: "Jane Doe",
        text: "I think there is a mistake when you talk about CSS, but otherwise it is a great post.",
        date: "1 year ago",
    },
];

/**
 * Construct a preview HTML for the given templates in the /site/[siteName]/customise page
 *
 * @param allTemplate The template for the whole comment section, with a placeholder `<COMMENTS>`
 * to insert comments in
 * @param commentTemplate The template for each comment, with placeholders `<AUTHOR>`, `<TIME>` and
 * `<CONTENT>`
 * @param styles The CSS styles
 * @param addDarkClass Whether to add `.dark` to `<body>` or not
 * @returns The preview HTML
 */
export default function generateCommentHTML(
    allTemplate: string,
    commentTemplate: string,
    styles: string,
    addDarkClass: boolean = false
) {
    const commentHTML = comments.map(comment => {
        const commentTemplateWithData = commentTemplate
            .replace("<AUTHOR>", comment.author)
            .replace("<TIME>", comment.date)
            .replace("<CONTENT>", comment.text);
        return commentTemplateWithData;
    });
    const allComments = commentHTML.join("");
    const allTemplateWithData = allTemplate.replace("<COMMENTS>", allComments);
    return `<html><head><style>${styles}</style></head><body${
        addDarkClass ? ' class="dark"' : ""
    }>${allTemplateWithData}</body></html>`;
}
