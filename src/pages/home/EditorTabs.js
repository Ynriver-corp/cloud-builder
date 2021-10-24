import React, {useEffect, useGlobal, useRef, useState} from "reactn";
import styled from "styled-components";
import {Tabs} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {Editor} from "./Editor";

const {TabPane} = Tabs;

export const EditorTabs = () => {
    //open and save in local storage
    const [footerTab,] = useGlobal("footerTab");
    const [projectTab,] = useGlobal("projectTab");
    const [editorTabs, setEditorTabs] = useGlobal("editorTabs");

    const divRef = useRef(null);

    const [currentTab, setCurrentTab] = useState(null);

    const [clientWidth, setClientWidth] = useState(null);
    const [clientHeight, setClientHeight] = useState(null);

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

    const closeTab = async (key) => {
        const newEditorTabs = editorTabs.filter(editorTab => editorTab.key !== key);
        await setEditorTabs(newEditorTabs);

        if (newEditorTabs?.length) return;

        setClientWidth(null);
        setClientHeight(null);
    };

    return <EditorCss ref={divRef}>
        <TabsCss type="card" defaultActiveKey={currentTab} key={currentTab}>
            {
                editorTabs
                    .map(tabFile =>
                        <TabPane tab={
                            <>
                                {tabFile.fileName} <CloseOutlined onClick={() => closeTab(tabFile.key)}/>
                            </>
                        } key={tabFile.key}>
                            <Editor file={tabFile}
                                    divRef={divRef}
                                    clientWidth={clientWidth}
                                    clientHeight={clientHeight}/>
                        </TabPane>
                    )
            }
        </TabsCss>
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
