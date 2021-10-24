import React, {useGlobal} from "reactn";
import {Dropdown, Menu, Tooltip} from "antd";
import {Anchor} from "../form";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    BranchesOutlined,
    CheckOutlined,
    CodeOutlined,
    PlusOutlined
} from "@ant-design/icons";

const {SubMenu} = Menu;

export const BarMenu = () => {
    const [terminals, setTerminals] = useGlobal("terminals");
    const [footerTab, setFooterTab] = useGlobal("footerTab");

    const subMenus =
        <SubMenu title="master">
            <Menu.Item>Checkout</Menu.Item>
            <Menu.Item>New branch from selected</Menu.Item>
            <Menu.Divider/>
            <Menu.Item>Compare with current</Menu.Item>
            <Menu.Divider/>
            <Menu.Item>Merge selected into current</Menu.Item>
            <Menu.Divider/>
            <Menu.Item>Pull</Menu.Item>
            <Menu.Item>Push</Menu.Item>
            <Menu.Divider/>
            <Menu.Item>Rename</Menu.Item>
            <Menu.Item>Delete</Menu.Item>
        </SubMenu>

    const menu =
        <Menu>
            <Menu.Item><PlusOutlined/> New Branch</Menu.Item>
            <Menu.ItemGroup title="Local branches">
                {subMenus}
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Remote branches">
                {subMenus}
            </Menu.ItemGroup>
        </Menu>;

    return <>
        <Tooltip title="Pull"
                 placement="bottom">
            <Anchor variant="success"
                    margin="auto">
                <ArrowLeftOutlined/>
            </Anchor>
        </Tooltip>
        <Tooltip title="Commit"
                 placement="bottom">
            <Anchor variant="success"
                    margin="auto">
                <CheckOutlined/>
            </Anchor>
        </Tooltip>
        <Tooltip title="Push"
                 placement="bottom">
            <Anchor variant="success"
                    margin="auto">
                <ArrowRightOutlined/>
            </Anchor>
        </Tooltip>

        <Tooltip title="Git branch: master"
                 placement="left">
            <Dropdown overlay={menu}>
                <Anchor variant="success"
                        margin="auto">
                    <BranchesOutlined/> master
                </Anchor>
            </Dropdown>
        </Tooltip>

        <Tooltip title="Terminal"
                 placement="bottom">
            <Anchor variant="white"
                    onClick={() => {
                        if (!terminals?.length)
                            setTerminals([{title: "Terminal 1", key: 1}]);

                        setFooterTab(!footerTab)
                    }}
                    margin="auto">
                <CodeOutlined/> Terminal
            </Anchor>
        </Tooltip>
    </>
}
