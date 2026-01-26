import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { toAbsoluteUrl } from "../../../helpers";
import { useLang, setLanguage } from "../../../i18n/Metronici18n";
import clsx from "clsx";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function AuthFooter() {
  let intl = useIntl();
  let [showDropdownContent, setShowDropdownContent] = useState(false);

  let handleShowDropdownContent = () => {
    setShowDropdownContent((prevState) => {
      return !prevState;
    });
  };
  const languages = [
    {
      lang: "en",
      name: "English",
      flag: toAbsoluteUrl("/media/flags/united-states.svg"),
    },
    {
      lang: "ar",
      name: "العربية",
      flag: toAbsoluteUrl("/media/flags/saudi-arabia.svg"),
    },
  ];
  const lang = useLang();
  const currentLanguage = languages.find((x) => x.lang === lang);
  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap w-100">
        <div
          className="d-flex fw-semibold text-primary "
          style={{ gap: "1.5rem" }}
        >
          <span
            className="menu-link theme-text"
            style={{ fontSize: "12px" }}
          >
            {intl.formatMessage({ id: "TermsAndConditions" })}
          </span>
          <span
            className="menu-link theme-text"
            style={{ fontSize: "12px" }}
          >
            {intl.formatMessage({ id: "UsagePolicy" })}
          </span>

          <span
            className="menu-link theme-text"
            style={{ fontSize: "12px" }}
          >
            {intl.formatMessage({ id: "UsersGuide" })}
          </span>
        </div>

        <DropdownButton
          style={{
            width: `${
              getCurrentSystemLanguage() === "ar" ? "200px" : "fit-content"
            }`,
          }}
          onClick={() => {
            handleShowDropdownContent();
          }}
          id="dropdown-menu-align-end"
          variant={""}
          drop="down"
          title={
            getCurrentSystemLanguage() === "ar" ? (
              <>
                <span
                  className="mx-2 text-hover-primary"
                >
                  {intl.formatMessage({ id: "Arabic" })}
                </span>
                <img
                  className="w-20px h-20px rounded me-3"
                  src="/media/flags/saudi-arabia.svg"
                  alt=""
                />
                {!showDropdownContent ? (
                  <i className="fa-solid fa-chevron-down"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </>
            ) : (
              <>
                {!showDropdownContent ? (
                  <i className="fa-solid fa-chevron-down"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
                <span
                  // data-kt-element="current-lang-name"
                  className="mx-2 text-hover-primary"
                >
                  {intl.formatMessage({ id: "English" })}
                </span>
                <img
                  // data-kt-element="current-lang-flag"
                  className="w-20px h-20px rounded me-3"
                  src="/media/flags/united-states.svg"
                  alt=""
                />
              </>
            )
          }
        >
          <div
          >
            {languages.map((l) => (
              <Dropdown.Item key={l.name}>
                <div
                  className="menu-item px-3"
                  key={l.lang}
                  onClick={() => {
                    setLanguage(l.lang);
                  }}
                >
                  <span
                    className={clsx("menu-link d-flex px-5", {
                      active: l.lang === currentLanguage?.lang,
                    })}
                  >
                    <span className="symbol symbol-20px mx-4">
                      <img className="rounded-1" src={l.flag} alt="" />
                    </span>
                    {l.name}
                  </span>
                </div>
              </Dropdown.Item>
            ))}
          </div>
        </DropdownButton>
      </div>
    </Fragment>
  );
}

export default AuthFooter;
