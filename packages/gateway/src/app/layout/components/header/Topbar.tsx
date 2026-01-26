import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { KTSVG } from "../../../helpers";
import {
  HeaderNotificationsMenu,
  HeaderUserMenu,
  ModeDropdown,
} from "../../../partials";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { resetNewNotificationCount } from "@4eplatform/connect/src/app/features/notifiactionsSlice";
import AlertPermissionPopup from "../../popups/AlertPermissionPopup";

const toolbarButtonMarginClass = "ms-1 ms-lg-3",
  toolbarButtonHeightClass = "w-30px h-30px w-md-40px h-md-40px",
  toolbarButtonIconSizeClass = "svg-icon-1";

type MenuProps = {
  show?: any;
  handleShow?: any;
};
const Topbar: FC<MenuProps> = ({ show, handleShow }) => {
  const [notificationOpend, setNotificationOpend] = useState(false);
  const [newNotification, setNewNotification] = useState(0);

  const dispatch = useDispatch();

  let notificationCount = useSelector((state: RootState) => {
    return state?.notifications?.notificationCount;
  });

  const [modalShow, setModalShow] = useState<boolean>(false);
  useEffect(() => {
    setNewNotification(notificationCount);
  }, [notificationCount]);

  const openMenuHandler = () => {
    if (newNotification) {
      dispatch(resetNewNotificationCount(null) as any);
    }
    setNewNotification(0);
    setNotificationOpend(true);
  };

  return (
    <div className="d-flex align-items-stretch flex-shrink-0">
      <div className="topbar d-flex align-items-center flex-shrink-0">
        {/* NOTIFICATIONS */}
        <div
          onClick={openMenuHandler}
          className={clsx(
            `d-flex align-items-center ${
              notificationOpend || newNotification == 0 || !newNotification
                ? ""
                : "notifications-icon"
            }`,
            toolbarButtonMarginClass,
          )}
        >
          <div
            className={`${
              newNotification && newNotification != 0 && !notificationOpend
                ? "notifications-icon-count"
                : ""
            }`}
          >
            {newNotification != 0 && !notificationOpend ? newNotification : ""}
          </div>
          <div
            className={clsx("btn btn-icon btn-active-light-primary btn-custom")}
            data-kt-menu-trigger="click"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="bottom"
          >
            <KTSVG
              path="/media/icons/duotune/general/gen060.svg"
              className={toolbarButtonIconSizeClass}
            />
          </div>
          <HeaderNotificationsMenu />
        </div>

        <div
          className={clsx(
            "d-flex align-items-center",
            toolbarButtonMarginClass,
          )}
        >
          <div
            className={clsx(
              "btn btn-icon btn-active-light-primary btn-custom",
              toolbarButtonHeightClass,
            )}
            data-kt-menu-trigger="click"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="bottom"
          >
            <KTSVG path="/media/icons/duotune/general/gen063.svg" />
            <KTSVG path="/media/icons/duotune/general/gen062.svg" />
          </div>
          <ModeDropdown />
        </div>

        <div
          className={clsx(
            "d-flex align-items-center",
            toolbarButtonMarginClass,
          )}
          id="kt_header_user_menu_toggle"
        >
          <HeaderUserMenu show={show} handleShow={handleShow} />
        </div>
      </div>
      <AlertPermissionPopup
        show={modalShow}
        handleClose={() => setModalShow(false)}
      />
    </div>
  );
};

export { Topbar };
