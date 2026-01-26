import { FC } from "react";
import { Link } from "react-router-dom";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { getColorClass } from "@4eplatform/shared/functions/getColor";

type Props = {
  selectedSysTab?: any;
  childSys?: any;
  setShowDropDown: any;
  intlMsg?: string;
  staticIcon?: string;
};

const SystemsTab: FC<Props> = ({
  selectedSysTab,
  childSys,
  setShowDropDown,
  intlMsg,
  staticIcon,
}) => {
  const intl = useIntl();

  const handleNavigatetoSeparated = (link: string) => {
    const baseUrl = process.env.REACT_APP_Base_Url;
    const fullLink = `${baseUrl}${link}`;
    window.location.href = fullLink;
  };

  const showWariningAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "SorryNoPermission" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  const getSystemDetails = () => {
    return (
      <>
        <div className="text-hover-white d-flex flex-column gap-1 w-100">
          <div className="d-flex justify-content-between align-items-center">
            <span
              style={{
                textAlign: intl.locale === "ar" ? "right" : "left",
              }}
              className={`fw-bolder ${
                childSys?.subsytemMainLookupNameAr == "تم الاطلاق" ||
                childSys?.subsytemMainLookupNameEn == "Launched"
                  ? "oneLineShow"
                  : childSys?.subsytemMainLookupNameAr ||
                    childSys?.subsytemMainLookupNameEn
                  ? "oneLineShow-sm"
                  : "oneLineShow"
              }`}
            >
              {getCurrentSystemLanguage() === "ar"
                ? childSys?.nameAr?.length > 22
                  ? childSys?.nameAr?.slice(0, 22) + "..."
                  : childSys?.nameAr
                : childSys?.nameEn?.length > 22
                ? childSys?.nameEn?.slice(0, 22) + "..."
                : childSys?.nameEn}
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      key={childSys?.id || staticIcon}
      onClick={
        childSys
          ? () => setShowDropDown((prevState: any) => !prevState)
          : undefined
      }
      className="mx-1"
    >
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip
            id="button-tooltip-2"
            className="text-dark w-300px fs-6 tooltipWorkspace"
          >
            {intl.locale === "ar" ? childSys?.nameAr : childSys?.nameEn}
          </Tooltip>
        }
      >
        {({ ref, ...triggerHandler }) => (
          <div
            {...triggerHandler}
            className="menu-item px-0 mt-2 overflow-hidden DefaultIconSize"
          >
            {childSys?.subsytemMainLookupNameAr != "قريبا .. الإطلاق" &&
            childSys?.subsytemMainLookupNameEn != "Coming Soon" ? (
              <>
                {childSys?.subsytemMainLookupNameEn === "Under development" ? (
                  childSys?.isExternalComponent ? (
                    <>
                      <div ref={ref}>
                        <Link
                          to={`/systems-services-settings/dynamic-workspace`}
                          className={`menu-link px-2 d-flex align-items-start gap-1 
                  bg-hover-${getColorClass(childSys?.color)} text-hover-white`}
                        >
                          {getSystemDetails()}
                        </Link>
                      </div>
                    </>
                  ) : childSys?.isExternalComponent && childSys?.isExternal ? (
                    <>
                      <div ref={ref}>
                        <Link
                          to={childSys?.url}
                          state={{
                            subSystemId: childSys?.subSystemId,
                            cardTitle:
                              intl.locale === "ar"
                                ? childSys?.nameAr
                                : childSys?.nameEn,
                          }}
                          className={`menu-link px-2 d-flex align-items-start gap-1 
              bg-hover-${getColorClass(childSys?.color)} text-hover-white`}
                          onClick={() => {
                            localStorage.setItem(
                              "mainClassificationId",
                              childSys?.mainClassificationId !=
                                "00000000-0000-0000-0000-000000000000"
                                ? childSys?.mainClassificationId
                                : "00000000-0000-0000-0000-000000000000",
                            );
                          }}
                        >
                          {getSystemDetails()}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div ref={ref}>
                        <a
                          href={childSys?.url}
                          target={"_blank"}
                          className={`menu-link px-2 d-flex align-items-start gap-1 
              bg-hover-${getColorClass(childSys?.color)} text-hover-white`}
                        >
                          {getSystemDetails()}
                        </a>
                      </div>
                    </>
                  )
                ) : (
                  <>
                    {(childSys?.subsytemMainLookupNameEn ===
                      "Under development" &&
                      childSys?.havePermession) ||
                    (childSys?.subsytemMainLookupNameEn !==
                      "Under development" &&
                      childSys?.havePermession) ? (
                      <Link
                        ref={ref}
                        to={
                          childSys?.isComponent
                            ? ""
                            : childSys?.isExternal
                            ? childSys?.url
                            : "/systems-services-settings/dynamic-workspace"
                        }
                        target={childSys?.isExternal ? "_blank" : "_self"}
                        state={{
                          subSystemId: childSys?.isComponent
                            ? childSys?.parentId
                            : childSys?.subSystemId ||
                              childSys?.mainClassificationId,
                          cardTitle:
                            intl.locale === "ar"
                              ? childSys?.nameAr
                              : childSys?.nameEn,
                        }}
                        className={`menu-link px-2 d-flex align-items-start gap-1 
              bg-hover-${getColorClass(childSys?.color)} text-hover-white`}
                        onClick={() => {
                          localStorage.setItem(
                            "cardName",
                            JSON.stringify({
                              nameAr: childSys?.nameAr,
                              nameEn: childSys?.nameEn,
                            }),
                          );

                          if (childSys?.isComponent)
                            localStorage.setItem(
                              "workspaceKey",
                              childSys?.workspaceKey,
                            );
                          if (childSys?.isComponent)
                            handleNavigatetoSeparated(childSys?.url);
                        }}
                      >
                        {getSystemDetails()}
                      </Link>
                    ) : childSys ? (
                      <div
                        ref={ref}
                        onClick={showWariningAlert}
                        className={`menu-link px-2 d-flex align-items-start gap-1 
              bg-hover-${getColorClass(childSys?.color)} text-hover-white`}
                      >
                        <span
                          className={`svg-icon svg-icon-4x svg-icon-${getColorClass(
                            childSys?.color,
                          )} text-hover-white`}
                          dangerouslySetInnerHTML={{
                            __html: childSys?.icon,
                          }}
                        ></span>
                        {getSystemDetails()}
                      </div>
                    ) : (
                      <div
                        ref={ref}
                        className={`p-3 d-flex align-items-center gap-1 cursor-default text-primary`}
                      >
                        <span className="fs-3">{intlMsg}</span>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <div
                  ref={ref}
                  onClick={showWariningAlert}
                  className={`menu-link px-2 d-flex align-items-start gap-1 
        bg-hover-${getColorClass(childSys?.color)} text-hover-white`}
                >
                  {getSystemDetails()}
                </div>
              </>
            )}
          </div>
        )}
      </OverlayTrigger>
    </div>
  );
};

export default SystemsTab;
