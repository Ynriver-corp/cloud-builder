import React, {useEffect, useGlobal, useState} from "reactn";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import MonacoEditor from "react-monaco-editor";

export const Lading = () => {
    const history = useHistory();
    const [authUser] = useGlobal("user");
    const [code, setCode] = useState("console.log('hola')");
    const options = {
        selectOnLineNumbers: true
    };

    useEffect(() => {
        authUser && history.push("/home")
    }, [authUser]);

    const onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
    }

    const editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();
    }

    return <LadingContainer>

        <MonacoEditor
            width="800"
            height="600"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
        />

    </LadingContainer>
}

const LadingContainer = styled.div`
  color: ${props => props.theme.basic.white};
`;
