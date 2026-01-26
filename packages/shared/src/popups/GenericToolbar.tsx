import React, { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { encryptUsingAES256 } from "@4eplatform/gateway/src/app/helpers/encrypt";
import { AppDispatch, RootState } from "../../store/store";
import { fetchToolbar } from "../../store/features/toolbarSlice";

export interface Items {
  key: string;
  value: string;
}
export interface GenericToolbarProps {
  list: Items[];
  actions?: React.ReactNode;
  showWorkspace?: boolean;
  translate?: boolean;
}

const GenericToolbar: FC<GenericToolbarProps> = ({
  list,
  actions,
  showWorkspace = false,
  translate = true,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading } = useSelector((state: RootState) => state.toolbar);

  const [cardName, setCardName] = useState<{
    nameAr?: string;
    nameEn?: string;
  } | null>(null);
  const [subSystemId, setSubSystemId] = useState<string | null>(null);
  const [digitalServices, setDigitalServices] = useState<string | null>(null);

  // Load stored values
  useEffect(() => {
    try {
      const storedCardName = localStorage.getItem("cardName");
      setCardName(storedCardName ? JSON.parse(storedCardName) : null);
      setSubSystemId(localStorage.getItem("subSystemId"));
      setDigitalServices(localStorage.getItem("DigitalServices"));
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  // Fetch toolbar data when route changes
  useEffect(() => {
    if (location.pathname) {
      const encryptedRoute = encryptUsingAES256(
        (window as any)._env_?.PUBLIC_URL +
          "/" +
          location.pathname.split("/")[1],
      );
      dispatch(fetchToolbar({ route: encryptedRoute })).then((res: any) => {
        if (res.payload?.message === "LooKUpRetrievedSuccessfully") {
          localStorage.setItem(
            "cardName",
            JSON.stringify({
              nameAr: res.payload?.result?.cardNameAr,
              nameEn: res.payload?.result?.cardNameEn,
            }),
          );
          localStorage.setItem(
            "subSystemId",
            res.payload?.result?.subSystemId || "",
          );
          localStorage.setItem(
            "workspaceKey",
            res.payload?.result?.workspaceKey || "",
          );
        }
      });
    }
  }, [dispatch, location.pathname]);

  const getFormattedMessage = (id?: string) =>
    id ? (translate ? intl.formatMessage({ id }) : id) : "";

  const displayTitle =
    list.length === 1 && items
      ? (items?.cardNameEn || items?.cardNameAr) && intl.locale === "ar"
        ? items.cardNameAr
        : items.cardNameEn
      : intl.formatMessage({ id: list[list.length - 1].key });

  const breadcrumbs = [
    ...(items?.cardNameEn || items?.cardNameAr
      ? [
          {
            name: intl.locale === "ar" ? items.cardNameAr : items.cardNameEn,
            path: "/" + location.pathname.split("/")[1],
          },
        ]
      : []),
    ...list.slice(1).map((x) => ({
      name: getFormattedMessage(x.key),
      path: x.value,
    })),
  ];

  return (
    <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
      <div className="container d-flex flex-stack px-1 flex-wrap">
        <div className="page-title d-flex flex-column">
          <h1 className="d-flex text-white fw-bolder my-1 fs-3 mb-5">
            {displayTitle || ""}
          </h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7">
            <li className="breadcrumb-item text-white opacity-75">
              <Link
                to="/home-workspace"
                className="text-white text-hover-primary"
              >
                {intl.formatMessage({ id: "Home" })}
              </Link>
            </li>

            {/* {showWorkspace && ( */}
            <>
              <li className="breadcrumb-item">
                <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-white opacity-75">
                <Link
                  to="/"
                  // state={
                  //   subSystemId && DigitalServices === "true"
                  //     ? { subSystemId }
                  //     : {}
                  // }
                  className="text-white text-hover-primary cursor-pointer"
                  onClick={() => {
                    localStorage.setItem(
                      "mainClassificationId",
                      "00000000-0000-0000-0000-000000000000",
                    );
                    localStorage.setItem("DigitalServices", "true");
                    localStorage.setItem("ClassificationName", "null");
                    localStorage.setItem("isSubSystem", "true");
                    localStorage.setItem(
                      "subSystemId",
                      "62a32adb-1f46-4cfe-84aa-806b5841432d",
                    );
                    // localStorage.setItem("workspaceKey", "0");

                    // window.open(
                    //   // (window as any)._env_?.REACT_APP_Base_Url +
                    //   //   "/systems-services-settings/dynamic-workspace",
                    //   "/committee",
                    //   "_self"
                    // );
                  }}
                >
                  <bdi>{intl.formatMessage({ id: "Workspace" })}</bdi>
                </Link>
              </li>
            </>
            {/* )} */}

            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <li className="breadcrumb-item">
                  <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
                </li>
                <li className="breadcrumb-item text-white opacity-75 pe-0">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="text-white text-hover-primary"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    item.name
                  )}
                </li>
              </React.Fragment>
            ))}

            {loading && (
              <li className="breadcrumb-item text-white opacity-75">
                <span className="spinner-border spinner-border-sm" />
              </li>
            )}
          </ul>
        </div>
        <div className="d-flex align-items-center gap-3 py-3 py-md-1">
          {actions}
        </div>
      </div>
    </div>
  );
};

export { GenericToolbar };
