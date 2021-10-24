import {templatesLegend} from "../../../../../../components/common/DataList";
import React, {useEffect, useGlobal, useRef, useState} from "reactn";
import {ButtonAnt, Input} from "../../../../../../components/form";
import {snapshotToArray} from "../../../../../../utils";
import {useHistory, useParams} from "react-router-dom";
import {firestore} from "../../../../../../firebase";
import EmailEditor from "react-email-editor";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import {object, string} from "yup";
import get from "lodash/get";

export const TemplateContainer = props => {
    const history = useHistory();
    const {hostId, templateId} = useParams();
    const [template, setTemplate] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTemplate,] = useGlobal("currentTemplate");

    const EmailEditorRef = useRef(null);

    const schema = object().shape({
        subject: string().required()
    });

    const {errors, handleSubmit, register} = useForm({
        validationSchema: schema,
        reValidateMode: "onSubmit",
    });

    useEffect(() => {
        const fetchTemplate = async () => {
            const templatesRef = await firestore
                .collection("templates")
                .where("hostId", "==", hostId)
                .where("isDeleted", "==", false)
                .where("templateId", "==", templateId)
                .get();

            const currentTemplate = snapshotToArray(templatesRef)[0];

            if (!currentTemplate) return setIsLoading(false);

            setTemplate(currentTemplate);
            setIsLoading(false);
        };

        fetchTemplate();
    }, []);

    useEffect(() => {
        if (!get(EmailEditorRef, "current.editor") || !get(template, "design")) return;

        EmailEditorRef.current.editor.loadDesign(get(template, "design", {}));
    }, [EmailEditorRef, template]);

    const saveTemplate = async data => {
        try {
            setIsSaving(true);

            const exportHtml = await new Promise(resolve =>
                EmailEditorRef.current.editor
                    .exportHtml(data => resolve({html: data.html, design: data.design}))
            );

            const templateRef = firestore.collection("templates");
            const templateId_ = template.id || templateRef.doc().id;

            await templateRef
                .doc(templateId_)
                .set({
                    hostId,
                    templateId,
                    id: templateId_,
                    design: exportHtml.design,
                    content: exportHtml.html,
                    subject: data.subject,
                    updateAt: new Date(),
                    isDeleted: false,
                    createAt: template.createAt ? template.createAt.toDate() : new Date(),
                });

            props.showNotification("SUCCESS", "Se guardo corectamente", "success");

            setTemplate({...data, id: templateId_});
        } catch (error) {
            console.log(error);
            props.showNotification("ERROR", "Algo salio mal");
        }

        setIsSaving(false);
    };

    return <TemplateContainerCss>
        <form onSubmit={handleSubmit(saveTemplate)}>

            <Input type="text"
                   name="subject"
                   label="Asunto"
                   variant="primary"
                   placeholder="Asunto"
                   ref={register}
                   error={errors.subject}
                   defaultValue={get(template, "subject", "")}/>

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
                <ButtonAnt margin="10px auto"
                           disabled={isSaving || isLoading}
                           onClick={() => history.goBack()}>
                    CANCELAR
                </ButtonAnt>
                <ButtonAnt margin="10px auto"
                           variant="primary"
                           htmlType="submit"
                           loading={isSaving}
                           disabled={isSaving || isLoading}>
                    GUARDAR
                </ButtonAnt>
            </div>
        </form>

        <div className="legend">
            <div className="subtitle">TIPO: {currentTemplate.name}</div>
            <div className="subtitle">DESTINATARIO: {currentTemplate.to}</div>

            <div className="subtitle">LEYENDA:</div>
            <div className="subtitle">
                Utiliza las siguientes variables y seran reemplazadas por la
                informacion correspondiente
            </div>
            <ol>
                {
                    templatesLegend
                        .map((legend) =>
                            <li className="lengend-content"
                                key={legend.value}>
                                <div className="legend-value">{legend.value}:</div>
                                <div className="legend-name">{`{{${legend.name}}}`}</div>
                            </li>
                        )
                }
            </ol>
        </div>
    </TemplateContainerCss>;
};

const TemplateContainerCss = styled.div`
  .footer {
    display: flex;
  }

  .legend {
    margin: 1rem 0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    .subtitle {
      color: ${(props) => props.theme.basic.primary};
      font-size: 12px;
      line-height: 13px;
      margin: 5px 0;
    }

    ol {
      -webkit-columns: 2;
      -moz-columns: 2;
      columns: 2;

      li {
        list-style-position: inside;
        display: flex;
        align-items: center;
        font-size: 14px;
        -webkit-column-break-inside: avoid;
        page-break-inside: avoid;
        break-inside: avoid;

        .legend-value {
          margin-right: 5px;
          color: ${(props) => props.theme.basic.whiteDarken};
        }

        .legend-name {
          color: ${(props) => props.theme.basic.white};
        }
      }
    }
  }
`;
