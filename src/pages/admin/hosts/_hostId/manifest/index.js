import {FileUpload} from "../../../../../components/common/FileUpload";
import {spinLoader} from "../../../../../components/common/loader";
import {ButtonAnt, Input} from "../../../../../components/form";
import React, {useEffect, useState} from "reactn";
import {snapshotToArray} from "../../../../../utils";
import {firestore} from "../../../../../firebase";
import {useHistory, useParams} from "react-router";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import {object, string} from "yup";
import get from "lodash/get";

export default props => {
    const history = useHistory();
    const {hostId} = useParams();

    const schema = object().shape({
        hostId: string().required(),
        name: string().required(),
        short_name: string().required(),
        start_url: string().required(),
        display: string().required(),
        theme_color: string().required(),
        background_color: string().required(),
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [manifest, setManifest] = useState({});

    const {register, handleSubmit, errors} = useForm({
        validationSchema: schema,
        reValidateMode: "onSubmit",
    });

    useEffect(() => {
        const fetchManifest = async () => {
            const manifestRef = await firestore
                .collection("manifests")
                .where("hostId", "==", hostId)
                .where("isDeleted", "==", false)
                .get()

            setManifest(snapshotToArray(manifestRef)[0]);
            setIsLoading(false);
        };

        fetchManifest();
    }, []);

    const saveManifest = async data => {
        try {
            setIsLoadingSave(true);

            await firestore
                .collection("manifests")
                .doc(hostId)
                .set({
                    id: hostId,
                    ...data,
                    hostId,
                    icons: manifest?.icons || [],
                    updateAt: new Date(),
                    isDeleted: false,
                    createAt: manifest?.createAt ? manifest.createAt.toDate() : new Date(),
                });

            props.showNotification("REGISTRADO", "Registro actualizado.", "success");
            history.goBack();
        } catch (error) {
            console.error(error);
            props.showNotification("ERROR", "Algo salio mal, intente nuevamente.");
        }
        setIsLoadingSave(false);
    };

    const updateIcons = async (hostId, icons) => {
        const newManifest = {
            icons: icons
                .map(icon => ({
                    src: icon.url,
                    sizes: icon.size,
                    type: icon.type
                })),
            updateAt: new Date()
        };

        await firestore
            .doc(`manifests/${hostId}`)
            .update(newManifest);

        setIsLoading(true);
        history.goBack();
    };

    if (isLoading) return spinLoader();

    return <ManifestCss>
        <form onSubmit={handleSubmit(saveManifest)}
              autoComplete="off"
              noValidate>
            <FieldsetContainer>
                <legend>https://{hostId}/manifest.json</legend>
                {
                    manifest?.createAt
                    && <FileUpload file={get(manifest, "icons[0].src", null)}
                                   fileName="src"
                                   filePath={`manifests/${hostId}/`}
                                   sizes="48x48,72x72,96x96,144x144,168x168,192x192"
                                   buttonLabel="Subir iconos"
                                   accept="image/png,image/jpg"
                                   afterUpload={icons => updateIcons(hostId, icons)}/>
                }
                <Input variant="primary"
                       label="Dominio"
                       type="text"
                       defaultValue={hostId}
                       disabled={!!hostId}
                       placeholder="Dominio"
                       ref={register}
                       error={errors.hostId}
                       name="hostId"/>
                <Input variant="primary"
                       label="Name"
                       type="text"
                       defaultValue={get(manifest, "name")}
                       placeholder="Nombre de la aplicación"
                       ref={register}
                       error={errors.name}
                       name="name"/>
                <Input variant="primary"
                       label="Short Name"
                       defaultValue={get(manifest, "short_name")}
                       placeholder="Nombre corto usado en apps"
                       type="text"
                       ref={register}
                       error={errors.short_name}
                       name="short_name"/>
                <Input variant="primary"
                       label="Description"
                       defaultValue={get(manifest, "description")}
                       placeholder="Descripcion de la app"
                       type="text"
                       ref={register}
                       error={errors.description}
                       name="description"/>
                <Input variant="primary"
                       label="Start URL"
                       defaultValue={get(manifest, "start_url", `https://${hostId}`)}
                       placeholder="Url donde inicia la app"
                       type="text"
                       ref={register}
                       error={errors.start_url}
                       name="start_url"/>
                <Input variant="primary"
                       label="Display fullscreen, standalone, minimal-ui, browser"
                       defaultValue={get(manifest, "display")}
                       placeholder="Orientación"
                       type="text"
                       ref={register}
                       error={errors.display}
                       name="display"/>
                <Input variant="primary"
                       label="Theme color"
                       defaultValue={get(manifest, "theme_color")}
                       placeholder="Color de tema de la aplicación"
                       type="color"
                       ref={register}
                       error={errors.theme_color}
                       name="theme_color"/>
                <Input variant="primary"
                       label="Background Color"
                       defaultValue={get(manifest, "background_color")}
                       placeholder="Color de fondo"
                       type="color"
                       ref={register}
                       error={errors.background_color}
                       name="background_color"/>
            </FieldsetContainer>
            <ButtonAnt htmlType="submit"
                       disabled={isLoadingSave}
                       loading={isLoadingSave}
                       variant="primary">
                GUARDAR
            </ButtonAnt>
        </form>
    </ManifestCss>;
};

const ManifestCss = styled.div`
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: 500px;
`;

const FieldsetContainer = styled.fieldset`
  width: auto;
  border-radius: 7px;
  padding: 15px 20px;
  height: 100%;
  margin-top: 1rem;

  .manifest {
    margin: 1rem 0;
  }
`;
