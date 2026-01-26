import { FC, useEffect } from "react";
import { MenuInner } from "./MenuInner";
import { SwapperComponent } from "../../../assets/ts/components";

type MenuProps = {
  show?: any;
  isSideBar?: boolean;
};
const Header: FC<MenuProps> = ({ show, isSideBar }) => {
  useEffect(() => {
    SwapperComponent.reinitialization();
  }, []);

  return (
    <div className="header-menu align-items-stretch">
      <div
        className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
        id="#kt_header_menu"
        data-kt-menu="true"
      >
        <MenuInner show={show} isSideBar={isSideBar} />
      </div>
    </div>
  );
};

export { Header };
