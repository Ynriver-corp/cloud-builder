import React, {useEffect, useGlobal} from "reactn";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

export const Lading = () => {
    const history = useHistory();
    const [authUser] = useGlobal("user");

    useEffect(() => {
        authUser && history.push("/home")
    }, [authUser]);

    return <LadingContainer>lading page</LadingContainer>
}

const LadingContainer = styled.div`
  color: ${props => props.theme.basic.white};
`;
