import React, {useEffect, useGlobal, useRef, useState} from "reactn";
import styled from "styled-components";
import {firestore} from "../../../../../../firebase";
import {ButtonAnt, Checkbox, Input} from "../../../../../../components/form";
import {useSendError} from "../../../../../../hooks";
import EmailEditor from "react-email-editor";
import {object, string} from "yup";
import {Controller, useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router";

export default props => {
    const history = useHistory();
    const {hostId, routeId} = useParams();
    const {sendError} = useSendError();

    const [authUser] = useGlobal("user");
    const EmailEditorRef = useRef(null);
    const [route, setRoute] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSave, setIsLoadingSave] = useState(false);

    const schema = object().shape({
        path: string().matches("/").required()
    });

    const {errors, handleSubmit, register, control} = useForm({
        validationSchema: schema,
        reValidateMode: "onSubmit",
    });

    useEffect(() => {
        if (routeId === "new") return setIsLoading(false);

        const fetchRoute = async () => {
            const routeQuery = await firestore
                .doc(`routes/${routeId}`)
                .get()

            setRoute(routeQuery.data());
            setIsLoading(false);
        };

        fetchRoute();
    }, []);

    useEffect(() => {
        if (!EmailEditorRef.current?.editor || !route.design) return;

        EmailEditorRef.current.editor.loadDesign(route.design || {});
    }, [EmailEditorRef.current, route, isLoading]);

    const saveRoute = async data => {
        try {
            setIsLoadingSave(true);

            const exportHtml = await new Promise(resolve =>
                EmailEditorRef.current.editor.exportHtml(data => resolve({html: data.html, design: data.design}))
            );

            const routeRef = firestore.collection("routes");

            const routeId_ = routeId === "new"
                ? routeRef.doc().id
                : routeId

            console.log("data", data)

            await routeRef
                .doc(routeId_)
                .set({
                    id: routeId_,
                    hostId,
                    user: {id: authUser.id},
                    content: exportHtml.html,
                    design: exportHtml.design,
                    path: data.path,
                    isOptimized: data.isOptimized,
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

    return <SeoContainerCss>
        <div className="title">AGREGA TU DISEÑO</div>
        <form onSubmit={handleSubmit(saveRoute)}>
            <Input type="text"
                   name="path"
                   label="/path"
                   variant="primary"
                   placeholder="/path"
                   ref={register}
                   disabled={isLoading}
                   error={errors.path}
                   defaultValue={route.path}/>
            {
                !isLoading
                && <Controller name="isOptimized"
                               control={control}
                               onChange={([value]) => value.target.checked}
                               defaultValue={route?.isOptimized}
                               as={
                                   <Checkbox variant="primary">
                                       Optimizar
                                   </Checkbox>
                               }
                />
            }
            <EmailEditor ref={EmailEditorRef}
                         minHeight="700px"
                         options={{
                             supportedDisplayModes: ['web', 'email'],
                             id: "editor-container",
                             displayMode: "web",
                             features: {
                                 userUploads: false
                             },
                             appearance: {
                                 theme: "dark",
                             }
                         }}/>

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
                           disabled={isLoadingSave || isLoading}
                           loading={isLoadingSave || isLoading}
                           htmlType="submit">
                    SAVE
                </ButtonAnt>
            </div>
        </form>
    </SeoContainerCss>;
};

const SeoContainerCss = styled.div`
  color: ${props => props.theme.basic.white};
  margin: auto;
  padding: 10px;
  width: 100%;

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
