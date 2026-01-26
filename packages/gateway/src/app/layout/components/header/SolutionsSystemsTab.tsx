import { FC } from "react";
import { Link } from "react-router-dom";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

type Props = {
  selectedSysTab?: any;
  childSys?: any;
  setShowDropDown: any;
  intlMsg?: string;
  staticIcon?: string;
};

const SolutionsSystemsTab: FC<Props> = ({
  selectedSysTab,
  childSys,
  setShowDropDown,
  intlMsg,
  staticIcon,
}) => {
  const intl = useIntl();
  const showWariningAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "SorryNoPermission" }),
      icon: "success",
      // iconColor: "#005257",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  const getColorClass = (color: any) => {
    switch (color) {
      case "احمر":
      case "red":
      case 0:
      case "0":
        return "danger";
      case "ازرق":
      case "blue":
        return "primary";
      case "اخضر":
      case "green":
      case 1:
      case "1":
        return "success";
      case "اصفر":
      case "yellow":
      case 2:
      case "2":
        return "warning";
      default:
        return "primary";
    }
  };

  return (
    <>
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
              <Link
                ref={ref}
                to={"electronic-services-classifications"}
                target={"_self"}
                state={{
                  selectedSolution: {
                    value: childSys?.id,
                    labelAr: childSys?.nameAr,
                    labelEn: childSys?.nameEn,
                  },
                }}
                onClick={() => {
                  localStorage.setItem(
                    "selectedSolution",
                    JSON.stringify({
                      value: childSys?.id,
                      labelAr: childSys?.nameAr,
                      labelEn: childSys?.nameEn,
                    }),
                  );
                  window.dispatchEvent(new Event("selectedSolution"));
                  localStorage.setItem(
                    "cardName",
                    JSON.stringify({
                      nameAr: childSys?.nameAr,
                      nameEn: childSys?.nameEn,
                    }),
                  );
                }}
                className={`menu-link px-2 d-flex align-items-start gap-2 
              bg-hover-${getColorClass(childSys?.color)} text-hover-white py-3`}
              >
                <span>
                  <span
                    className={`svg-icon svg-icon-5x svg-icon-${getColorClass(
                      childSys?.color,
                    )} text-hover-white iconSize`}
                    dangerouslySetInnerHTML={{
                      __html: childSys?.icon,
                    }}
                  ></span>
                </span>
                <div className="text-hover-white d-flex flex-column gap-2 w-100">
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
                    <div
                      className={`flex-grow-1 text-${getColorClass(
                        childSys?.color,
                      )}`}
                      style={{ fontSize: "10px", textAlign: "center" }}
                    >
                      {intl.locale == "ar"
                        ? childSys?.subsytemMainLookupNameAr == "تم الاطلاق"
                          ? ""
                          : childSys?.subsytemMainLookupNameAr
                        : childSys?.subsytemMainLookupNameEn == "Launched"
                        ? ""
                        : childSys?.subsytemMainLookupNameEn}
                    </div>
                  </div>
                  <span className="fs-8 d-flex">
                    {intl.locale === "ar"
                      ? childSys?.description
                      : childSys?.descriptionEn}
                  </span>
                </div>
              </Link>
            </div>
          )}
        </OverlayTrigger>
      </div>
    </>
  );
};

export default SolutionsSystemsTab;
