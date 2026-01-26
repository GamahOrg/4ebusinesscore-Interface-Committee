/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../helpers";
import {
  getNotificationsNav,
  markNotificationAsRead,
} from "@4eplatform/connect/src/app/features/notifiactionsSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@4eplatform/connect/src/app/store/store";
import { SystemLang } from "@4eplatform/shared/assets/Lang";
import moment from "moment-timezone";
import { setWorkspaceKey } from "@4eplatform/shared/index";
import { getIncomingRequestsById } from "@4eplatform/connect/src/app/features/requests-slice";

const HeaderNotificationsMenu: FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  let notifications = useAppSelector((state) => {
    return state?.notifications?.notificationsInNav;
  });

  let notificationsNotReaded = useAppSelector((state) => {
    return state?.notifications?.countNotReaded;
  });

  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [pendingNav, setPendingNav] = useState<{
    url: string;
    id: string;
    isReaded: boolean;
    workspaceKeyTo: number;
    cardTitle?: string;
    subsystemId?: string;
    mainClassificationId?: string;
    cardName?: string;
  } | null>(null);

  // Fetch notifications initially
  useEffect(() => {
    dispatch(getNotificationsNav({ pageIndex: 1, pageSize: 10 }) as any);
  }, []);

  useEffect(() => {
    if (!pendingNav) return;

    const {
      url,
      id,
      isReaded,
      workspaceKeyTo,
      cardTitle,
      subsystemId,
      mainClassificationId,
      cardName,
    } = pendingNav;

    let updatedUrl = "";

    // mark as read if not readed
    if (!isReaded) {
      dispatch(markNotificationAsRead(id) as any);
    }

    // set workspace + local storage
    setWorkspaceKey(workspaceKeyTo);
    localStorage.setItem("ClassificationName", "null");
    localStorage.setItem("isSubSystem", "true");
    localStorage.setItem("subSystemId", subsystemId?.toLowerCase() || "");
    localStorage.setItem("mainClassificationId", mainClassificationId || "");
    localStorage.setItem(
      "isSubSystem",
      mainClassificationId !== "00000000-0000-0000-0000-000000000000"
        ? "false"
        : "true",
    );
    localStorage.setItem("cardName", cardName || "");

    // Build incoming requests list
    // const incomingRequestIds = incomingRequests?.map((req) => req?.id);

    if (url?.includes("details-for-incoming")) {
      const regex = /([0-9a-fA-F\-]{36})/;
      const requestId = url?.match(regex)?.[1] ?? null;
      updatedUrl = url?.replace("incoming", "archive");

      dispatch(getIncomingRequestsById(requestId) as any).then((res: any) => {
        const requestStatus = res?.payload?.result?.requestStatus;
        {
          requestStatus === 0
            ? (window.location.href = process.env.REACT_APP_Base_Url + url)
            : (window.location.href =
                process.env.REACT_APP_Base_Url + updatedUrl);
        }
      });
    } else {
      window.location.href = process.env.REACT_APP_Base_Url + url;
      // navigate(url, { state: { cardTitle } });
    }

    setPendingNav(null); // reset
  }, [pendingNav, incomingRequests]);

  // Handler just sets pendingNav
  const navigationHandler = (
    url: string,
    id: string,
    isReaded: boolean,
    workspaceKeyTo: number,
    cardTitle?: string,
  ) => {
    if (!isReaded) {
      dispatch(markNotificationAsRead(id) as any);
    }
    setWorkspaceKey(workspaceKeyTo);
    localStorage.setItem("ClassificationName", "null");
    localStorage.setItem("isSubSystem", "true");
  };

  return (
    <div
      className="menu menu-sub-dropdown menu-column w-350px w-lg-375px"
      data-kt-menu="true"
      id="mainNotificationDev"
    >
      <div
        className="d-flex flex-column bgi-no-repeat rounded-top"
        style={{
          backgroundImage: `url('${toAbsoluteUrl(
            "/media/theme-img/header-bg1.jpg",
          )}')`,
        }}
      >
        <h3 className="text-white fw-bold px-9 mt-10 mb-6">
          {intl.formatMessage({ id: "Notifications" })}
          <span className="fs-8 opacity-75 ps-3">
            {notificationsNotReaded ? notificationsNotReaded : ""}{" "}
            {notificationsNotReaded
              ? intl.formatMessage({ id: "Unread" })
              : null}{" "}
          </span>
        </h3>
      </div>

      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_topbar_notifications_1"
          role="tabpanel"
        >
          <div className="scroll-y mh-325px my-5 px-8">
            {notifications?.length ? (
              notifications?.map((notification: any, index: any) => (
                <div
                  key={`alert${index}`}
                  onClick={() =>
                    navigationHandler(
                      notification?.actionUrl,
                      notification?.id,
                      notification?.readed,
                      notification?.workspaceKeyTo,
                      notification?.cardname,
                    )
                  }
                  className={`d-flex flex-stack py-4 rounded mb-1 bg-hover-light-primary cursor-pointer ${
                    notification?.readed ? "" : "bg-light-dark "
                  }`}
                >
                  <div className="d-flex align-items-center">
                    <div className="mb-0 me-2">
                      <span
                        className={`fs-6 cursor-pointer fw-bolder text-gray-${
                          notification?.readed ? "500" : "800"
                        }`}
                      >
                        {SystemLang() === "ar"
                          ? notification?.title
                          : notification?.titleEn}
                      </span>
                    </div>
                  </div>

                  <span className="badge badge-light fs-8 mx-2">
                    <div>
                      {notification?.createdOn && (
                        <>
                          <p>
                            {moment
                              .tz(notification?.createdOn, "UTC")
                              .tz(
                                Intl.DateTimeFormat().resolvedOptions()
                                  .timeZone,
                              )
                              .format("LT")}
                          </p>
                        </>
                      )}
                    </div>
                  </span>
                </div>
              ))
            ) : (
              <span className="d-flex justify-content-center py-10 text-muted">
                {intl.formatMessage({ id: "NotExist" })}{" "}
                <i className="fa-solid fa-ban px-3 fs-4"></i>
              </span>
            )}
          </div>

          <div className="py-3 text-center border-top">
            <div
              onClick={() => {
                window.location.href = `${
                  (window as any)._env_?.REACT_APP_Base_Url
                }/notifications-details`;
              }}
              className="btn btn-color-gray-600 btn-active-color-primary"
            >
              {intl.formatMessage({ id: "ViewAll" })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeaderNotificationsMenu };
