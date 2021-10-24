import React, {useEffect, useGlobal, useState} from "reactn";
import styled from "styled-components";
import {firestore} from "../../../../../../../firebase";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import {ButtonAnt, Input} from "../../../../../../../components/form";
import {spinLoader} from "../../../../../../../components/common/loader";
import {useSendError} from "../../../../../../../hooks";
import {snapshotToArray} from "../../../../../../../utils";
import {useHistory, useParams} from "react-router";

export default props => {
    const history = useHistory();
    const {hostId, routeId} = useParams();
    const {sendError} = useSendError();

    const schema = object().shape({
        path: string().required(),
        title: string().required(),
        description: string().required(),
        keywords: string().required()
    });

    const [authUser] = useGlobal("user");
    const [currentRoute,] = useGlobal("currentRoute");
    const [seo, setSeo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSave, setIsLoadingSave] = useState(false);

    const {handleSubmit, register, errors} = useForm({
        validationSchema: schema,
        reValidateMode: "onSubmit"
    });

    useEffect(() => {
        const fetchSeo = async () => {
            const seoQuery = await firestore
                .collection("seo")
                .where("hostId", "==", hostId)
                .where("routeId", "==", routeId)
                .where("user.id", "==", authUser.id)
                .get()

            const currentSeo = snapshotToArray(seoQuery)[0];

            if (!currentSeo) return setIsLoading(false);

            setSeo(currentSeo);
            setIsLoading(false);
        };

        fetchSeo();
    }, []);

    const saveSEO = async data => {
        try {
            setIsLoadingSave(true);

            const seoRef = firestore.collection("seo");

            const seoId = seo.id || seoRef.doc().id;

            await seoRef
                .doc(seoId)
                .set({
                    id: seoId,
                    ...data,
                    hostId,
                    routeId,
                    user: {id: authUser.id},
                    createAt: new Date(),
                    updateAt: new Date()
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

    return <SeoContainerCss>
        <div>SEO {seo.path || currentRoute.path}</div>
        <form onSubmit={handleSubmit(saveSEO)}
              autoComplete="off"
              noValidate>
            <fieldset>
                <Input type="text"
                       name="path"
                       label="Route"
                       ref={register}
                       variant="primary"
                       disabled={currentRoute?.path}
                       defaultValue={currentRoute?.path}
                       placeholder="Route"
                       error={errors.path}/>
                <Input type="text"
                       name="title"
                       label="Title"
                       ref={register}
                       variant="primary"
                       defaultValue={seo.title}
                       placeholder="Title"
                       error={errors.title}/>
                <Input type="text"
                       name="description"
                       label="Description"
                       ref={register}
                       variant="primary"
                       defaultValue={seo.description}
                       placeholder="Description"
                       error={errors.description}/>
                <Input type="text"
                       name="keywords"
                       label="Keywords"
                       ref={register}
                       variant="primary"
                       defaultValue={seo.keywords}
                       placeholder="Keywords"
                       error={errors.keywords}/>
            </fieldset>
            <ButtonAnt variant="primary"
                       margin="15px auto"
                       disabled={isLoadingSave}
                       loading={isLoadingSave}
                       htmlType="submit">
                SAVE
            </ButtonAnt>
        </form>
    </SeoContainerCss>
};

const SeoContainerCss = styled.div`
  color: ${props => props.theme.basic.white};
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: 400px;
`;
