import React from "reactn";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useAcl} from "../../hooks";
import {menuFooter} from "../../components/common/DataList";
import {sizes} from "../../constants";

export default () => {
    const {aclMenus} = useAcl();

    return <WelcomeContainer>
        <div className="title">Bienvenido Administrador</div>
        <div className="list-subtitle">Lista de permisos otorgados</div>
        <ul>
            {
                aclMenus({menus: menuFooter.filter(menu => menu.isAdmin)})
                    .map(menu =>
                        <li key={menu.url}>
                            <Link href={menu.url}>
                                <span>{menu.name}</span>
                            </Link>
                        </li>
                    )
            }
        </ul>
    </WelcomeContainer>;
};

const WelcomeContainer = styled.div`
  width: 100%;
  color: ${(props) => props.theme.basic.white};

  .title {
    margin: 1rem 0;
    text-align: center;
    font-size: ${sizes.font.normal};
    font-weight: bold;
  }

  .list-subtitle {
    margin: 1rem 0;
    text-align: left;
    font-size: ${sizes.font.normal};
    font-weight: bold;
  }

  ul {

    li {
      cursor: pointer;
      list-style-position: inside;
      font-size: ${sizes.font.normal};
      color: ${(props) => props.theme.basic.white};

      span {
        color: ${(props) => props.theme.basic.white};
      }
    }
  }
`;
