import {
    editor,
    /* languages, */
} from "monaco-editor/esm/vs/editor/editor.api";

export const options: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    lineHeight: 1.4,
    fontSize: 13,
    tabSize: 2,
};

/**
 * The HTML Monarch language definition from Monaco, slightly modified to highlight `data-ezk`
 * attributes.
 *
 * Actual type is `languages.IMonarchLanguage`, BUT the object itself, provided from the source code
 * itself, is *not* compatible with the type. (??)
 *
 * @see {@link https://microsoft.github.io/monaco-editor/monarch.html}
 */
export const modifiedHTML: any /* languages.IMonarchLanguage */ = {
    defaultToken: "",
    tokenPostfix: ".html",
    ignoreCase: true,

    // The main tokenizer for our languages
    tokenizer: {
        root: [
            [/<!DOCTYPE/, "metatag", "@doctype"],
            [/<!--/, "comment", "@comment"],
            [/(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/, ["delimiter", "tag", "", "delimiter"]],
            [/(<)(script)/, ["delimiter", { token: "tag", next: "@script" }]],
            [/(<)(style)/, ["delimiter", { token: "tag", next: "@style" }]],
            [/(<)((?:[\w\-]+:)?[\w\-]+)/, ["delimiter", { token: "tag", next: "@otherTag" }]],
            [/(<\/)((?:[\w\-]+:)?[\w\-]+)/, ["delimiter", { token: "tag", next: "@otherTag" }]],
            [/</, "delimiter"],
            [/[^<]+/], // text
        ],

        doctype: [
            [/[^>]+/, "metatag.content"],
            [/>/, "metatag", "@pop"],
        ],

        comment: [
            [/-->/, "comment", "@pop"],
            [/[^-]+/, "comment.content"],
            [/./, "comment.content"],
        ],

        otherTag: [
            [/\/?>/, "delimiter", "@pop"],
            [/"([^"]*)"/, "attribute.value"],
            [/'([^']*)'/, "attribute.value"],
            [/data-ezk/, "strong"],
            [/[\w\-]+/, "attribute.name"],
            [/=/, "delimiter"],
            [/[ \t\r\n]+/], // whitespace
        ],

        // -- BEGIN <script> tags handling

        // After <script
        script: [
            [/type/, "attribute.name", "@scriptAfterType"],
            [/"([^"]*)"/, "attribute.value"],
            [/'([^']*)'/, "attribute.value"],
            [/[\w\-]+/, "attribute.name"],
            [/=/, "delimiter"],
            [/>/, { token: "delimiter", next: "@scriptEmbedded", nextEmbedded: "text/javascript" }],
            [/[ \t\r\n]+/], // whitespace
            [/(<\/)(script\s*)(>)/, ["delimiter", "tag", { token: "delimiter", next: "@pop" }]],
        ],

        // After <script ... type
        scriptAfterType: [
            [/=/, "delimiter", "@scriptAfterTypeEquals"],
            [/>/, { token: "delimiter", next: "@scriptEmbedded", nextEmbedded: "text/javascript" }], // cover invalid e.g. <script type>
            [/[ \t\r\n]+/], // whitespace
            [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
        ],

        // After <script ... type =
        scriptAfterTypeEquals: [
            [/"([^"]*)"/, { token: "attribute.value", switchTo: "@scriptWithCustomType.$1" }],
            [/'([^']*)'/, { token: "attribute.value", switchTo: "@scriptWithCustomType.$1" }],
            [/>/, { token: "delimiter", next: "@scriptEmbedded", nextEmbedded: "text/javascript" }], // cover invalid e.g. <script type=>
            [/[ \t\r\n]+/], // whitespace
            [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
        ],

        // After <script ... type = $S2
        scriptWithCustomType: [
            [/>/, { token: "delimiter", next: "@scriptEmbedded.$S2", nextEmbedded: "$S2" }],
            [/"([^"]*)"/, "attribute.value"],
            [/'([^']*)'/, "attribute.value"],
            [/[\w\-]+/, "attribute.name"],
            [/=/, "delimiter"],
            [/[ \t\r\n]+/], // whitespace
            [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
        ],

        scriptEmbedded: [
            [/<\/script/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
            [/[^<]+/, ""],
        ],

        // -- END <script> tags handling

        // -- BEGIN <style> tags handling

        // After <style
        style: [
            [/type/, "attribute.name", "@styleAfterType"],
            [/"([^"]*)"/, "attribute.value"],
            [/'([^']*)'/, "attribute.value"],
            [/[\w\-]+/, "attribute.name"],
            [/=/, "delimiter"],
            [/>/, { token: "delimiter", next: "@styleEmbedded", nextEmbedded: "text/css" }],
            [/[ \t\r\n]+/], // whitespace
            [/(<\/)(style\s*)(>)/, ["delimiter", "tag", { token: "delimiter", next: "@pop" }]],
        ],

        // After <style ... type
        styleAfterType: [
            [/=/, "delimiter", "@styleAfterTypeEquals"],
            [/>/, { token: "delimiter", next: "@styleEmbedded", nextEmbedded: "text/css" }], // cover invalid e.g. <style type>
            [/[ \t\r\n]+/], // whitespace
            [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
        ],

        // After <style ... type =
        styleAfterTypeEquals: [
            [/"([^"]*)"/, { token: "attribute.value", switchTo: "@styleWithCustomType.$1" }],
            [/'([^']*)'/, { token: "attribute.value", switchTo: "@styleWithCustomType.$1" }],
            [/>/, { token: "delimiter", next: "@styleEmbedded", nextEmbedded: "text/css" }], // cover invalid e.g. <style type=>
            [/[ \t\r\n]+/], // whitespace
            [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
        ],

        // After <style ... type = $S2
        styleWithCustomType: [
            [/>/, { token: "delimiter", next: "@styleEmbedded.$S2", nextEmbedded: "$S2" }],
            [/"([^"]*)"/, "attribute.value"],
            [/'([^']*)'/, "attribute.value"],
            [/[\w\-]+/, "attribute.name"],
            [/=/, "delimiter"],
            [/[ \t\r\n]+/], // whitespace
            [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
        ],

        styleEmbedded: [
            [/<\/style/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
            [/[^<]+/, ""],
        ],

        // -- END <style> tags handling
    },
};

/**
 * The themes are based on default themes
 * @see {@link https://github.com/microsoft/vscode/blob/a3c4e5ffcee85677f1dd7e208cbd32bc84fee4d5/src/vs/editor/standalone/common/themes.ts#L10-L79}
 */
const colours = {
    light: {
        bg: "#F5F5F5",
        muted: "#737373",
        fg: "#171717",
        primary: "#6366F1",
        red: "#EF4444",
        yellow: "#D97706",
        green: "#059669",
        blue: "#0EA5E9",
    },
    dark: {
        bg: "#171717",
        muted: "#737373",
        fg: "#F5F5F5",
        primary: "#818CF8",
        red: "#F87171",
        yellow: "#FBBF24",
        green: "#34D399",
        blue: "#0EA5E9",
    },
};
export const lightTheme: editor.IStandaloneThemeData = {
    base: "vs",
    inherit: false,
    rules: [
        { token: "", foreground: colours.light.fg, background: colours.light.bg },
        { token: "invalid", foreground: colours.light.red },
        { token: "emphasis", fontStyle: "italic" },
        { token: "strong", fontStyle: "bold", foreground: colours.light.red },

        { token: "variable", foreground: colours.light.fg },
        { token: "variable.predefined", foreground: colours.light.fg },
        { token: "constant", foreground: colours.light.primary },
        { token: "comment", foreground: colours.light.muted },
        { token: "number", foreground: colours.light.red },
        { token: "number.hex", foreground: colours.light.blue },
        { token: "regexp", foreground: colours.light.yellow },
        { token: "annotation", foreground: colours.light.muted },
        { token: "type", foreground: colours.light.blue },

        { token: "delimiter", foreground: colours.light.muted },
        { token: "delimiter.html", foreground: colours.light.muted },

        { token: "tag", foreground: colours.light.primary },
        { token: "metatag", foreground: colours.light.muted },
        { token: "metatag.content.html", foreground: colours.light.muted },
        { token: "metatag.html", foreground: colours.light.muted },

        { token: "key", foreground: colours.light.yellow },
        { token: "string.key.json", foreground: colours.light.yellow },
        { token: "string.value.json", foreground: colours.light.yellow },

        { token: "attribute.name", foreground: colours.light.green },
        { token: "attribute.value", foreground: colours.light.yellow },
        { token: "attribute.value.number", foreground: colours.light.red },
        { token: "attribute.value.unit", foreground: colours.light.red },
        { token: "attribute.value.html", foreground: colours.light.yellow },

        { token: "string", foreground: colours.light.yellow },
        { token: "string.html", foreground: colours.light.yellow },

        { token: "keyword", foreground: colours.light.primary },
    ],
    colors: {
        editorBackground: colours.light.bg,
        editorForeground: colours.light.fg,
    },
};
export const darkTheme: editor.IStandaloneThemeData = {
    base: "vs-dark",
    inherit: false,
    rules: [
        { token: "", foreground: colours.dark.fg, background: colours.dark.bg },
        { token: "invalid", foreground: colours.dark.red },
        { token: "emphasis", fontStyle: "italic" },
        { token: "strong", fontStyle: "bold", foreground: colours.dark.red },

        { token: "variable", foreground: colours.dark.fg },
        { token: "variable.predefined", foreground: colours.dark.fg },
        { token: "constant", foreground: colours.dark.primary },
        { token: "comment", foreground: colours.dark.muted },
        { token: "number", foreground: colours.dark.red },
        { token: "number.hex", foreground: colours.dark.blue },
        { token: "regexp", foreground: colours.dark.yellow },
        { token: "annotation", foreground: colours.dark.muted },
        { token: "type", foreground: colours.dark.blue },

        { token: "delimiter", foreground: colours.dark.muted },
        { token: "delimiter.html", foreground: colours.dark.muted },

        { token: "tag", foreground: colours.dark.primary },
        { token: "metatag", foreground: colours.dark.muted },
        { token: "metatag.content.html", foreground: colours.dark.muted },
        { token: "metatag.html", foreground: colours.dark.muted },

        { token: "key", foreground: colours.dark.yellow },
        { token: "string.key.json", foreground: colours.dark.yellow },
        { token: "string.value.json", foreground: colours.dark.yellow },

        { token: "attribute.name", foreground: colours.dark.green },
        { token: "attribute.value", foreground: colours.dark.yellow },
        { token: "attribute.value.number", foreground: colours.dark.red },
        { token: "attribute.value.unit", foreground: colours.dark.red },
        { token: "attribute.value.html", foreground: colours.dark.yellow },

        { token: "string", foreground: colours.dark.yellow },
        { token: "string.html", foreground: colours.dark.yellow },

        { token: "keyword", foreground: colours.dark.primary },
    ],
    colors: {
        editorBackground: colours.dark.bg,
        editorForeground: colours.dark.fg,
    },
};
