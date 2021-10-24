import React, {useGlobal} from "reactn";
import styled from "styled-components";
import {mediaQuery} from "../../constants";

export const Footer = () => {
    //open and save in local storage
    const [projectTab,] = useGlobal("projectTab");

    return <FooterCss projectTab={projectTab}>
        hello
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
`;
