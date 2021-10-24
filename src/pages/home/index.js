import React, {useGlobal} from "reactn";
import styled from "styled-components";
import {Project} from "./Project";
import {Footer} from "./Footer";
import {EditorTabs} from "./EditorTabs";
import {mediaQuery} from "../../constants";

export const Home = () => {
    const [footerTab,] = useGlobal("footerTab");
    const [projectTab,] = useGlobal("projectTab");

    return <HomeCss projectTab={projectTab} footerTab={footerTab}>
        {projectTab && <Project/>}
        <EditorTabs/>
        {footerTab && <Footer/>}
    </HomeCss>;
};

const HomeCss = styled.div`
  height: 100%;
  display: grid;
  padding: 5px;
  grid-gap: 5px;
  max-width: 100%;
  color: ${props => props.theme.basic.white};
  background: ${props => props.theme.basic.black};

  ${mediaQuery.afterDesktop} {
    ${props => props.projectTab ? "grid-template-columns: 250px auto;" : ""}
    ${props => props.footerTab ? "grid-template-rows: auto 250px;" : ""}
  }
`;
