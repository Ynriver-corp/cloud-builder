import React, {useGlobal} from "reactn";
import styled from "styled-components";
import {Anchor} from "../../../../../components/form";
import {emailTemplates} from "../../../../../components/common/DataList";
import {useHistory, useParams} from "react-router-dom";

export const TemplatesContainer = props => {
    const history = useHistory();
    const {hostId} = useParams();
    const [, setCurrentTemplate] = useGlobal("currentTemplate");

    return <TemplatesContainerCss>
        <div className="title">LISTA DE TEMPLATES</div>
        <div className="list-templates">
            {
                emailTemplates
                    .map(template =>
                        <div key={template.id}>
                            {template.name}
                            <Anchor variant="primary"
                                    margin="auto 5px"
                                    onClick={async () => {
                                        await setCurrentTemplate(template)
                                        history.push(`/admin/hosts/${hostId}/templates/${template.id}`)
                                    }}>
                                [EDITAR]
                            </Anchor>
                        </div>
                    )
            }
        </div>
    </TemplatesContainerCss>;
};

const TemplatesContainerCss = styled.div`
  color: ${props => props.theme.basic.white};
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: 400px;

  .title {
    font-size: 15px;
    font-weight: bold;
  }

  .list-templates {
    color: ${props => props.theme.basic.white};
  }
`;
