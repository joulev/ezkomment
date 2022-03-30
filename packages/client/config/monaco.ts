import { editor } from "monaco-editor/esm/vs/editor/editor.api";

const monacoOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    lineHeight: 1.4,
    fontSize: 13,
};

export default monacoOptions;
