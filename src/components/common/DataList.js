import {BarChartOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import React from "reactn";

export const userLinks = [];

export const menuFooter = [
    {
        name: "Inicio",
        url: "/home",
        isAdmin: false,
        type: <HomeOutlined/>
    },
    {
        name: "Dominios",
        url: "/admin/hosts",
        isAdmin: true,
        type: <BarChartOutlined/>
    },
    {
        name: "Usuarios",
        url: "/admin/users",
        isAdmin: true,
        type: <BarChartOutlined/>
    },
    {
        name: "Perfil",
        url: "/users",
        isAdmin: false,
        type: <UserOutlined/>
    },
];

export const emailTemplates = [
    {
        id: "newAccount",
        name: "Nuevo usuario",
        to: "user",
    },
    {
        id: "verifyCode",
        name: "Codigo de Verificación para nuevo usuario",
        to: "user",
    }
];

export const templatesLegend = [
    {name: "userName", value: "Nombre del usuario"},
    {name: "userEmail", value: "Email del usuario"},
    {name: "userNickname", value: "Nickname del usuario"},
    {name: "userImage", value: "Imagen del usuario"},
    {name: "secondUserName", value: "Nombre del segundo usuario"},
    {name: "secondUserEmail", value: "Email del segundo usuario"},
    {name: "secondUserNickname", value: "Nickname del segundo usuario"},
    {name: "secondUserImage", value: "Imagen del segundo usuario"},
    {name: "amount", value: "Monto"},
    {name: "additionalAmount", value: "Monto Adicional"},
    {name: "documentType", value: "Tipo de documento"},
    {name: "documentNumber", value: "Numero de documento"},
    {name: "accountNumber", value: "Numero de cuenta"},
    {name: "expiredDate", value: "Dia de expiración"},
    {name: "message", value: "Mensaje del formulario de contacto"},
    {name: "companyEmail", value: "Email de la compañia del formulariode contacto",},
    {name: "companyPhone", value: "Telefono de la compañia del formulario de contacto",},
    {name: "link", value: "Link"},
    {name: "verifyAccountLink", value: "Link de verificación"},
    {name: "code", value: "Verification code"},
];