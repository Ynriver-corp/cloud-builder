import React, {useGlobal} from "reactn";
import styled from "styled-components";
import {Tree} from "antd";
import {CheckOutlined} from "@ant-design/icons";

const {DirectoryTree} = Tree;

export const Project = () => {
    //open and save in local storage
    const [editorTabs, setEditorTabs] = useGlobal("editorTabs");

    const treeData = [
        {
            title: 'parent 0',
            key: '0',
            children: [
                {title: 'index.js', key: '/src/index.js', isLeaf: true},
                {title: 'App.js', key: '/src/App.js', isLeaf: true},
                {
                    title: 'parent 1',
                    key: '0-2',
                    children: [
                        {title: 'leaf 0-2-0', key: '0-2-0', isLeaf: true},
                        {title: 'leaf 0-2-1', key: '0-2-1', isLeaf: true},
                        {
                            title: 'parent 1',
                            key: '0-2-1',
                            children: [
                                {title: 'leaf 0-2-0-0', key: '0-2-1-0', isLeaf: true, icon: <CheckOutlined/>},
                                {title: 'leaf 0-2-0-1', key: '0-2-1-1', isLeaf: true},
                                {
                                    title: 'parent 1',
                                    key: '0-2-0-0-0',
                                    children: [
                                        {
                                            title: 'leaf 0-2-0-0-0---------------------------',
                                            key: '0-2-0-0-0',
                                            isLeaf: true
                                        },
                                        {
                                            title: 'leaf 0-2-0-0-1---------------------------',
                                            key: '0-2-0-0-1',
                                            isLeaf: true
                                        },
                                    ],
                                }
                            ],
                        }
                    ],
                }
            ],
        }
    ];

    const onSelect = async (value) => {
        const path = value?.[0];
        if (!path.includes(".js")) return;

        const pathArray = path.split("/");
        const fileName = pathArray[pathArray.length - 1]
        const fileToOpenTab = {fileName, key: path, code: `console.log('${fileName}')`}
        await setEditorTabs([...editorTabs, fileToOpenTab]);
    }

    return <ProjectCss>
        <DirectoryTreeCss
            multiple
            onSelect={onSelect}
            treeData={treeData}
        />
    </ProjectCss>
}

const ProjectCss = styled.div`
  overflow: auto;
  background: ${props => props.theme.basic.default};
`;

const DirectoryTreeCss = styled(DirectoryTree)`
  font-size: 12px;
  min-width: 100%;
  color: ${props => props.theme.basic.white};
  background: ${props => props.theme.basic.blackDarken};

  .ant-tree-treenode {
    &:hover::before {
      background: ${props => props.theme.basic.blackLighten} !important;
    }
  }
`;
