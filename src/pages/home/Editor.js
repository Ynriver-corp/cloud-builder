import React, {useGlobal} from "reactn";
import MonacoEditor from "react-monaco-editor";

const options = {
    selectOnLineNumbers: true,
    fontSize: 11
};

export const Editor = (props) => {
    const [codeTheme,] = useGlobal("codeTheme");

    const onChange = (value) => console.log(value);

    const editorDidMount = (editor, monaco) => {
        //console.log('editor', editor);
        //console.log('monaco', monaco);
        editor.focus();
    };

    return <MonacoEditor
        width={`${props.clientWidth}px`}
        height={`${props.clientHeight - 21}px`}
        language="javascript"
        theme={codeTheme}
        value={props.file.code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
    />
}
