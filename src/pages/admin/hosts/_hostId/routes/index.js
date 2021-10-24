import {spinLoader} from "../../../../../components/common/loader";
import {Divider} from "../../../../../components/common/Divider";
import {Anchor, ButtonAnt} from "../../../../../components/form";
import React, {useEffect, useGlobal, useState} from "reactn";
import {snapshotToArray} from "../../../../../utils";
import {firestore} from "../../../../../firebase";
import {useAcl} from "../../../../../hooks";
import styled from "styled-components";
import {Modal} from "antd";
import {useHistory, useParams} from "react-router";
import {useLocation} from "react-router-dom";

export default props => {
    const history = useHistory();
    const location = useLocation();
    const {hostId} = useParams();
    const {Acl} = useAcl();
    const [authUser] = useGlobal("user");
    const [, setCurrentRoute] = useGlobal("currentRoute");
    const [routes, setRoutes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoutes = async () => {
            const routesQuery = await firestore
                .collection("routes")
                .where("hostId", "==", hostId)
                .where("user.id", "==", authUser.id)
                .get();

            setRoutes(snapshotToArray(routesQuery));
            setIsLoading(false);
        };

        fetchRoutes();
    }, []);

    const confirmDelete = routeId_ =>
        Modal.confirm({
            title: "Estás seguro de eliminar?",
            content: "Todos los datos con conexión a este artículo borrados.",
            okText: "SI",
            okType: "danger",
            cancelText: "NO",
            onOk: async () => {
                await firestore
                    .collection("routes")
                    .doc(routeId_)
                    .delete();

                const newRoutes = routes
                    .filter(route => route.id !== routeId_);
                setRoutes(newRoutes);
            }
        });

    return <RoutesContainerCss>
        <div className="title">LISTA DE RUTAS</div>
        <div className="list-routes">
            {
                isLoading
                    ? spinLoader()
                    : routes?.length
                        ? routes
                            .map(route =>
                                <div key={route.path}>
                                    <div key={route.path}>
                                        https://{hostId}{route.path}
                                        <Anchor variant="primary"
                                                margin="auto 5px"
                                                onClick={() => history.push(`/admin/hosts/${hostId}/routes/${route.id}`)}>
                                            [DESIGN]
                                        </Anchor>
                                        <Anchor variant="primary"
                                                margin="auto 5px"
                                                onClick={async () => {
                                                    await setCurrentRoute(route);
                                                    history.push(`/admin/hosts/${hostId}/routes/${route.id}/seo`)
                                                }}>
                                            [SEO]
                                        </Anchor>
                                        <Acl name={`/admin/hosts/:hostId/routes#delete`}>
                                            <Anchor variant="danger"
                                                    margin="auto 5px"
                                                    onClick={() => confirmDelete(route.id)}>
                                                [DEL]
                                            </Anchor>
                                        </Acl>
                                    </div>
                                </div>
                            )
                        : "No hay Rutas"
            }
        </div>
        <Divider/>
        <ButtonAnt variant="primary"
                   onClick={() => history.push(`/admin/hosts/${hostId}/routes/new`)}>
            AGREGAR RUTA
        </ButtonAnt>
    </RoutesContainerCss>
};

const RoutesContainerCss = styled.div`
  color: ${props => props.theme.basic.white};
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: 400px;

  .title {
    font-size: 15px;
    font-weight: bold;
  }

  .list-routes {
    color: ${props => props.theme.basic.white};
  }
`;
