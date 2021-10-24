import React, {useEffect, useState} from "reactn";
import styled from "styled-components";
import {spinLoader} from "../../../components/common/loader";
import {Anchor, ButtonAnt} from "../../../components/form";
import {Divider} from "../../../components/common/Divider";
import {firestore} from "../../../firebase";
import {snapshotToArray} from "../../../utils";
import {useHistory} from "react-router-dom";

export default props => {
    const history = useHistory();
    const [hosts, setHosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHosts = async () => {
            const hostsRef = await firestore
                .collection("hosts")
                .where("isDeleted", "==", false)
                .get();

            setHosts(snapshotToArray(hostsRef));
            setIsLoading(false);
        };

        fetchHosts();
    }, []);

    return <HostsContainerCss>
        <div className="title">LISTA DE DOMINIOS</div>
        <ul className="list-hosts">
            {
                isLoading
                    ? spinLoader()
                    : hosts?.length
                        ? hosts
                            .map(host =>
                                <li key={host.hostId}>
                                    {host.hostId.toUpperCase()}
                                    <Anchor variant="primary"
                                            margin="auto 5px"
                                            onClick={() => history.push(`/admin/hosts/${encodeURIComponent(host.hostId)}`)}>
                                        [EDIT]
                                    </Anchor>
                                    <Anchor variant="primary"
                                            margin="auto 5px"
                                            disabled={!host.isValidate}
                                            onClick={() => history.push(`/admin/hosts/${encodeURIComponent(host.hostId)}/routes`)}>
                                        [ROUTES]
                                    </Anchor>
                                    <Anchor variant="primary"
                                            margin="auto 5px"
                                            disabled={!host.isValidate}
                                            onClick={() => history.push(`/admin/hosts/${encodeURIComponent(host.hostId)}/manifests`)}>
                                        [MANIFEST]
                                    </Anchor>
                                    <Anchor variant="primary"
                                            margin="auto 5px"
                                            disabled={!host.isValidate}
                                            onClick={() => history.push(`/admin/hosts/${encodeURIComponent(host.hostId)}/templates`)}>
                                        [TEMPLATE]
                                    </Anchor>
                                </li>
                            )
                        : "No hay DOMINIOS"
            }
        </ul>
        <Divider/>
        <ButtonAnt variant="primary"
                   onClick={() => history.push("/admin/hosts/new")}>
            AGREGAR DOMINIO
        </ButtonAnt>
    </HostsContainerCss>
};

const HostsContainerCss = styled.div`
  color: ${props => props.theme.basic.white};
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: 400px;

  .title {
    font-size: 15px;
    font-weight: bold;
  }

  .list-hosts {
    color: ${props => props.theme.basic.white};
  }
`;
