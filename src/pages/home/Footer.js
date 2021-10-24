import React, {useGlobal} from "reactn";
import styled from "styled-components";
import {mediaQuery} from "../../constants";
import {Tabs} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

export const Footer = () => {
    //open and save in local storage
    const [projectTab,] = useGlobal("projectTab");
    const [, setFooterTab] = useGlobal("footerTab");
    const [terminals, setTerminals] = useGlobal("terminals");

    const closeTerminal = async (key) => {
        const newTerminals = terminals.filter(editorTab => editorTab.key !== key);
        await setTerminals(newTerminals);

        if (newTerminals?.length) return;

        await setFooterTab(false);
    }

    return <FooterCss projectTab={projectTab}>
        <TabsCss type="card">
            {
                terminals
                    .map(terminal =>
                        <TabPane tab={
                            <>
                                {terminal.title} <CloseOutlined onClick={() => closeTerminal(terminal.key)}/>
                            </>
                        }
                                 key={terminal.key}>
                            <div className="terminal">
                                asd
                            </div>
                        </TabPane>
                    )
            }
        </TabsCss>
    </FooterCss>
}

const FooterCss = styled.div`
  background: ${props => props.theme.basic.default};

  ${mediaQuery.afterDesktop} {
    grid-column-start: 1;
    grid-column-end: ${props => props.projectTab ? 3 : 1};
    grid-row-start: 2;
    grid-row-end: 2;
  }

  .terminal {
    height: 250px;
    color: ${props => props.theme.basic.white};
    background: ${props => props.theme.basic.blackDarken};
  }
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
