import React, {useGlobal} from "reactn";
import styled from "styled-components";
import {Layout} from "./index";
import {Tooltip} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {useHistory, useLocation} from "react-router-dom";
import {useI18n} from "../utils";
import {LanguagesMenu} from "./LanguagesMenu";
import {config} from "../firebase";
import {mediaQuery, sizes} from "../constants";
import {ForgotPassword, Login, Verify} from "../pages";
import {FooterBar} from "./FooterBar";
import {ModalContainer} from "./common/ModalContainer";
import {useAcl} from "../hooks";
import {RightDrawer} from "./right-drawer/RightDrawer";
import {WspIcon} from "./common/wspIcon";
import {Anchor} from "./form";
import {PWA} from "./common/pwa";
import {useAuth} from "../hooks/useAuth";

export const UserLayout = props => {
    const {signOut} = useAuth();
    const history = useHistory();
    const location = useLocation();
    const {userAcls} = useAcl();
    const [authUser] = useGlobal("user");
    const [isVisibleLoginModal, setIsVisibleLoginModal] = useGlobal("isVisibleLoginModal");
    const [, setOpenRightDrawer] = useGlobal("openRightDrawer");
    //const [openLeftDrawer, setOpenLeftDrawer] = useGlobal("openLeftDrawer");
    const [isVisibleForgotPassword,] = useGlobal("isVisibleForgotPassword");

    const i18n = useI18n();

    const loginModal = () =>
        (isVisibleLoginModal && !authUser)
            ? <ModalContainer visible={isVisibleLoginModal && !authUser}
                              onCancel={() => setIsVisibleLoginModal(false)}
                              footer={null}>
                {
                    isVisibleForgotPassword
                        ? <ForgotPassword {...props}/>
                        : <Login {...props}/>
                }
            </ModalContainer>
            : null;

    const verifiedModalResendEmail = () =>
        (authUser && !authUser.isVerified)
            ? <ModalContainer footer={null}
                              closable={false}
                              visible={!authUser.isVerified}>
                <Verify logOut={signOut}/>
            </ModalContainer>
            : null;

    const RightDrawerForm = () => <RightDrawer>
        hola comoe stas
    </RightDrawer>;

    const isLanding = () => location.pathname === "/";

    return <>
        {loginModal()}
        {verifiedModalResendEmail()}
        {RightDrawerForm()}
        <Layout>
            <Header>
                <HeaderLogo>
                    <Tooltip title="Go home"
                             placement="bottom">
                        <img src={`${config.storageUrl}/resources/${window.location.hostname}.png`}
                             onClick={() =>
                                 userAcls.some((acl) => acl.includes("admin"))
                                     ? history.push("/admin")
                                     : authUser
                                         ? history.push("/home")
                                         : history.push("/")
                             }
                             className="logo-dashboard"
                             alt="Logo dashboard"/>
                    </Tooltip>
                    <div className="email">{authUser && authUser.email}</div>
                </HeaderLogo>
                <SingIn>
                    {
                        !authUser
                        && <>
                            <Anchor onClick={() => setIsVisibleLoginModal(true)}
                                    variant="primary">
                                {i18n(["general", "login"])}
                            </Anchor>
                            <Anchor onClick={() => history.push("register")}
                                    variant="primary">
                                {i18n(["general", "register"])}
                            </Anchor>
                        </>
                    }
                    <LanguagesMenu/>
                    {
                        authUser &&
                        <div className="menu-icon-nav"
                             onClick={() => setOpenRightDrawer(true)}>
                            <MenuOutlined/>
                        </div>
                    }
                </SingIn>
            </Header>
            <LayoutMenu>
                <Body isLanding={props.isLanding}>
                    {props.children}
                </Body>
                {!props.isLanding && <FooterBar/>}
                <PWA/>
                <WspIcon/>
            </LayoutMenu>
        </Layout>
    </>;
};

const SingIn = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;

  a {
    padding: 0 10px 0 10px;
    font-weight: bold;
  }

  .menu-icon-nav {
    cursor: pointer;
    font-size: ${sizes.font.normal};
    margin: 5px;
  }
`;

const LayoutMenu = styled.section`
  height: 100vh;
  padding: 0;
`;

const Header = styled.header`
  height: 50px;
  position: fixed;
  z-index: 99;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.basic.blackDarken};
  color: ${props => props.theme.basic.white};
  font-size: ${sizes.font.small};
  font-weight: bold;
  padding: 0 0 0 7px;

  ${mediaQuery.afterTablet} {
    font-size: ${sizes.font.small};
    font-weight: normal;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  flex-direction: row;

  .header-logo-desktop {
    i {
      cursor: pointer;
      font-size: 25px;
      margin-left: 4px;
    }
  }

  .logo-dashboard {
    cursor: pointer;
    height: 25px;
    margin-left: 10px;
    opacity: 0.5;
  }

  .email {
    margin: auto auto auto 15px;
  }
`;

const Body = styled.section`
  width: 100vw;
  min-height: 100%;
  overflow: auto;
  padding: 50px 0 60px 0;

  ${mediaQuery.afterTablet} {
    padding: 50px 0 0 ${props => props.isLanding ? "0" : "4rem"};
  }

  flex: 1 1 auto;
  background-color: ${props => props.theme.basic.black};
`;
