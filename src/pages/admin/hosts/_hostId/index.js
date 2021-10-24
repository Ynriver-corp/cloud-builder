import React, {useEffect, useState} from "reactn";
import styled from "styled-components";
import {useSendError} from "../../../../hooks";
import {firestore} from "../../../../firebase";
import {spinLoader} from "../../../../components/common/loader";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import {ButtonAnt, Input} from "../../../../components/form";
import {useHistory, useParams} from "react-router";

export default props => {
    const history = useHistory();
    const {hostId} = useParams();
    const {sendError} = useSendError();

    const [host, setHost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSave, setIsLoadingSave] = useState(false);

    const schema = object().shape({
        hostId: string().matches(".com").required()
    });

    const {errors, handleSubmit, register} = useForm({
        validationSchema: schema,
        reValidateMode: "onSubmit",
    });

    useEffect(() => {
        if (hostId === "new") return setIsLoading(false);

        const fetchHost = async () => {
            const hostRef = await firestore
                .doc(`hosts/${hostId}`)
                .get()

            setHost(hostRef.data());
            setIsLoading(false);
        };

        fetchHost();
    }, []);

    const savehost = async data => {
        try {
            setIsLoadingSave(true);

            const hostId_ = data.hostId
                .toLowerCase()
                .replaceAll("http://", "")
                .replaceAll("https://", "")
                .replaceAll("/", "");

            await firestore
                .collection("hosts")
                .doc(hostId_)
                .set({
                    id: hostId_,
                    hostId: hostId_,
                    ...data,
                    isValidate: false,
                    updateAt: new Date(),
                    isDeleted: false,
                    createAt: hostId === "new" ? new Date() : host.createAt.toDate()
                });

            props.showNotification("SAVED", "It was saved successfully", "success");

            history.goBack();
        } catch (error) {
            console.error(error);
            await sendError(error, "saveSEO");
        }
        setIsLoadingSave(false);
    };

    if (isLoading) return spinLoader();

    return <HostContainerCss>
        <div className="title">AGREGA TU DOMINIO</div>
        <form onSubmit={handleSubmit(savehost)}>
            <Input type="text"
                   name="hostId"
                   label="Ingresa el nombre de tu dominio.com"
                   variant="primary"
                   placeholder="Ingresa el nombre de tu dominio.com"
                   ref={register}
                   error={errors.hostId}
                   defaultValue={host.hostId}/>
            <div className="footer">
                <ButtonAnt variant="default"
                           margin="15px auto"
                           disabled={isLoadingSave || isLoading}
                           loading={isLoadingSave || isLoading}
                           onClick={() => history.goBack()}>
                    CANCEL
                </ButtonAnt>
                <ButtonAnt variant="primary"
                           margin="15px auto"
                           disabled={isLoadingSave || isLoading || host?.isValidate}
                           loading={isLoadingSave || isLoading}
                           htmlType="submit">
                    SAVE
                </ButtonAnt>
            </div>
        </form>
    </HostContainerCss>
};

const HostContainerCss = styled.div`
  color: ${props => props.theme.basic.white};
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: 400px;

  .title {
    margin: 10px auto;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
  }

  .footer {
    display: flex;
  }
`;
