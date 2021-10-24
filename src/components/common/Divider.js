import React from "reactn";
import styled from "styled-components";

export const Divider = props =>
    <DividerCss className="subtitle-between-lines-desktop">
        <hr/>
        <span>{props.children}</span>
        <hr/>
    </DividerCss>;


const DividerCss = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  hr {
    background-color: ${props => props.theme.basic.white};
    border: none;
    width: 25%;
    height: 1px;
  }

  span {
    color: ${props => props.theme.basic.white};
    font-size: 11px;
    font-weight: 900;
    padding: 0 10px 0 10px;
  }
`;
