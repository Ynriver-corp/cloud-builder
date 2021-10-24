import React, {useGlobal} from "reactn";
import styled from "styled-components";
import {mediaQuery} from "../constants";
import {useHistory} from "react-router-dom";
import {PoweroffOutlined} from "@ant-design/icons";
import {useI18n} from "../utils";
import {useAcl} from "../hooks";
import {useAuth} from "../hooks/useAuth";
import {menuFooter} from "./common/DataList";

export const FooterBar = props => {
    const history = useHistory();
    const {signOut} = useAuth();
    const {aclMenus} = useAcl();
    const i18n = useI18n();
    const [authUser,] = useGlobal("user");
    const [, setIsVisibleLoginModal] = useGlobal("isVisibleLoginModal");

    const getCurrentMenu = () =>
        authUser
            ? aclMenus({menus: menuFooter})
            : menuFooter.filter(menu => !menu.isAdmin)

    const isSelected = path => path === window.location.pathname ? "item item-selected" : "item";

    return <ContainerFooter authUser={authUser}
                            itemLenght={getCurrentMenu()?.length + 1}>
        <div className="footer-items">
            {
                getCurrentMenu()
                    .map(userLink =>
                        <div className={isSelected(userLink.url)}
                             key={`key-menu-user-link-${userLink.url}`}
                             onClick={() =>
                                 authUser
                                     ? history.push(userLink.url)
                                     : setIsVisibleLoginModal(true)
                             }>
                            {userLink.type}
                            <span className="label">{userLink.name}</span>
                        </div>
                    )
            }
            {
                authUser
                && <div className="item"
                        onClick={async () => await signOut()}>
                    <PoweroffOutlined/>
                    <span className="label">{i18n(["general", "exit"])}</span>
                </div>
            }
        </div>
    </ContainerFooter>;
};

const ContainerFooter = styled.section`
  position: fixed;
  background: ${props => props.theme.basic.blackDarken};
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  //z-index: 999;

  .footer-items {
    height: 60px;
    display: grid;
    width: 100%;
    background: ${props => props.theme.basic.blackDarken};
    direction: rtl;
    grid-template-columns: repeat(${props => props.authUser ? props.itemLenght : props.itemLenght - 1}, 1fr);

    .item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: ${props => props.theme.basic.white};
      cursor: pointer;

      .anticon {
        font-size: 20px;
      }

      .label {
        font-size: 0.6rem;
        text-align: center;
        margin-top: 5px;
      }
    }

    .item-selected {
      position: relative;
      background: ${props => props.theme.basic.primary};
      color: ${props => props.theme.basic.white};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .notification {
      .img-content {
        position: relative;
      }

      .img-content:after {
        content: "";
        background: ${props => props.theme.basic.danger};
        width: 15px;
        height: 15px;
        position: absolute;
        top: -5px;
        left: -5px;
        border-radius: 10px;
      }
    }
  }

  ${mediaQuery.afterTablet} {
    background-color: ${props => props.theme.basic.blackDarken};
    width: 61px;
    height: 100vh;
    padding-top: 50px;
    //z-index: 998;
    align-items: flex-start;

    .footer-items {
      display: flex;
      flex-direction: column;
      background: none;
      height: auto;

      .item,
      .item-selected {
        height: 65px;

        :hover {
          background-color: ${props => props.theme.basic.blackLighten};
        }
      }
    }
  }
`;