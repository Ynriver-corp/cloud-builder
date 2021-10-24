import includes from "lodash/includes";
import orderBy from "lodash/orderBy";
import get from "lodash/get";

export const aclMenus = props => {
    const currentMenus = props.menus
        .filter(menu =>
            includes(props.userAcls, get(menu, "url"))
        );

    return orderBy(currentMenus, ["index"], ["asc"]);
};
