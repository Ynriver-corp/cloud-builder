import React, {useGlobal} from "reactn";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

export const Lading = () => {
    const history = useHistory();
    const [authUser] = useGlobal("user");

    /*
    const [codeTheme] = useGlobal("codeTheme");
    const [code, setCode] = useState("console.log('hola')");
    const options = {
        selectOnLineNumbers: true
    };

    useEffect(() => {
        authUser && history.push("/home")
    }, [authUser]);

    const onChange = (value) => setCode(value)

    const editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();
    }

    const code1 = "// your original code...";
    const code2 = "// a different version...";
    const optionss = {
        smartSelect: false
    };
     */

    return <LadingContainer>
        {/*<MonacoEditor
            width="800"
            height="600"
            language="javascript"
            theme={codeTheme}
            value={code}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
        />
            <MonacoDiffEditor
            width="800"
            height="600"
            language="javascript"
            original={code1}
            value={code2}
            options={optionss}
            />*/}
    </LadingContainer>
}

const LadingContainer = styled.div`
  color: ${props => props.theme.basic.white};
`;
