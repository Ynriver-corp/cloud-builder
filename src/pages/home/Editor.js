import React, {useEffect, useGlobal, useRef, useState} from "reactn";
import styled from "styled-components";
import {Tabs} from "antd";
import MonacoEditor from "react-monaco-editor";
import {CloseOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

export const Editor = () => {
    //open and save in local storage
    const [editorTabs, setEditorTabs] = useGlobal("editorTabs");

    const [codeTheme,] = useGlobal("codeTheme");
    const [footerTab,] = useGlobal("footerTab");
    const [projectTab,] = useGlobal("projectTab");

    const divRef = useRef(null);
    const [code, setCode] = useState("console.log('hola')");
    const [clientWidth, setClientWidth] = useState(null);
    const [clientHeight, setClientHeight] = useState(null);
    const [currentTab, setCurrentTab] = useState(null);

    const options = {
        selectOnLineNumbers: true,
        fontSize: 11
    };

    const onChange = (value) => setCode(value)

    const editorDidMount = (editor, monaco) => {
        console.log('editor', editor);
        console.log('monaco', monaco);
        editor.focus();
    }


    useEffect(() => {
        const clientWidth = divRef.current?.clientWidth ?? 0;
        let clientHeight = divRef.current?.clientHeight ?? 0;

        if (editorTabs?.length) setCurrentTab(editorTabs[editorTabs.length - 1].key);

        setClientWidth(clientWidth);
        setClientHeight(clientHeight);
    }, [divRef.current, projectTab, footerTab, editorTabs]);

    useEffect(() => {
        const clientWidth = divRef.current?.clientWidth ?? 0;
        let clientHeight = divRef.current?.clientHeight ?? 0;

        if (footerTab) clientHeight = clientHeight - 250;

        setClientWidth(clientWidth);
        setClientHeight(clientHeight);
    }, [footerTab]);

    /*
    const code1 = "// your original code...";
    const code2 = "// a different version...";
    const optionss = {
        smartSelect: false
    };
    */

    const closeFile = async (key) => {
        const newEditorTabs = editorTabs.filter(editorTab => editorTab.key !== key);
        await setEditorTabs(newEditorTabs);

        if (newEditorTabs?.length) return

        setClientWidth(null);
        setClientHeight(null);
    };

    return <EditorCss ref={divRef}>
        <TabsCss type="card" defaultActiveKey={currentTab} key={currentTab}>
            {
                editorTabs
                    .map(tab =>
                        <TabPane tab={<>
                            {tab.fileName} <CloseOutlined onClick={() => closeFile(tab.key)}/>
                        </>} key={tab.key}>
                            {
                                clientWidth && clientHeight
                                    ? <MonacoEditor
                                        key={projectTab}
                                        width={`${clientWidth}px`}
                                        height={`${clientHeight - 21}px`}
                                        language="javascript"
                                        theme={codeTheme}
                                        value={tab.code}
                                        options={options}
                                        onChange={onChange}
                                        editorDidMount={editorDidMount}
                                    /> : null
                            }
                        </TabPane>
                    )
            }
        </TabsCss>
        {/*
            <MonacoDiffEditor
            width="800"
            height="600"
            language="javascript"
            original={code1}
            value={code2}
            options={optionss}
            />
            */}
    </EditorCss>
}

const EditorCss = styled.div`
  background: ${props => props.theme.basic.default};
`;

const TabsCss = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0;

    &::before {
      border-bottom: 1px solid ${props => props.theme.basic.blackLighten};
    }

    .ant-tabs-nav-wrap {
      .ant-tabs-nav-list {

        .ant-tabs-tab-active {
          background: ${props => props.theme.basic.blackDarken} !important;

          .ant-tabs-tab-btn {
            color: ${props => props.theme.basic.success} !important;
          }
        }

        .ant-tabs-tab {
          padding: 2px 10px;
          border: none;
          border-radius: 0;
          background: ${props => props.theme.basic.default};

          .ant-tabs-tab-btn {
            color: ${props => props.theme.basic.primary};
            font-size: 11px;

            .anticon {
              margin: 0;
            }
          }
        }
      }
    }
  }
`;
