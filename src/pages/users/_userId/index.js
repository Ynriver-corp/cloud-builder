import React, {useEffect, useGlobal, useState} from "reactn"
import styled from "styled-components";
import {firestore} from "../../../firebase";
import get from "lodash/get";
import {useHistory, useParams} from "react-router";
import {ButtonAnt} from "../../../components/form";
import {spinLoader} from "../../../components/common/loader";

export const UserProfile = props => {
    const [authUser] = useGlobal("user");
    const history = useHistory();
    const {userId} = useParams();
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const canEdit = userId === get(authUser, "id");

    useEffect(() => {
        const fetchUser = () =>
            firestore
                .collection("users")
                .doc(userId)
                .onSnapshot((userOnSnapShot) => {
                    if (!userOnSnapShot.exists) return history.back();

                    setUser(userOnSnapShot.data());
                    setLoadingUser(false);
                });

        const unSub = fetchUser();
        return () => unSub && unSub();
    }, [userId])

    if (loadingUser) return spinLoader()

    return <UserContainer>
        Profile container
        <div>
            Nombre: {user.name}
        </div>
        <div>
            Apellido: {user.lastName}
        </div>
        <div>
            Correo: {user.email}
        </div>
        {
            canEdit &&
            <ButtonAnt onClick={() => history.push(`/users/${userId}/edit`)}
                       variant="primary"
                       margin="0">
                EDITAR PERFIL
            </ButtonAnt>
        }
    </UserContainer>;
};

const UserContainer = styled.div`
  width: 100%;
  padding: 1rem;
  color: ${props => props.theme.basic.white}
`
