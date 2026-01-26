import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "../../../partials/functions/language";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { useLang, setLanguage } from "../../../i18n/Metronici18n";
import clsx from "clsx";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function AuthFooterNew() {
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
      <div className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap w-100 px-0 px-lg-15 px-md-10">
        {/* <div
          className="d-flex fw-semibold text-primary "
          style={{ gap: "1.5rem" }}
        >
          <a
            href="#"
            className="menu-link theme-text"
            style={{ fontSize: "12px" }}
          >
            {intl.formatMessage({ id: "TermsAndConditions" })}
          </a>
          <a
            href="#"
            className="menu-link theme-text"
            style={{ fontSize: "12px" }}
          >
            {intl.formatMessage({ id: "UsagePolicy" })}
          </a>

          <a
            href="#"
            className="menu-link theme-text"
            style={{ fontSize: "12px" }}
          >
            {intl.formatMessage({ id: "UsersGuide" })}
          </a>
        </div> */}

        {/* <button
            className={`btn btn-icon p-0 w-100 `}
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            onClick={() => {
              handleShowDropdownContent();
            }}
            style={{
              width: `${
                getCurrentSystemLanguage() == "ar" ? "250px" : "fit-content"
              }`,
            }}
          >
            {!showDropdownContent ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i className="fa-solid fa-chevron-up"></i>
            )}
            {getCurrentSystemLanguage() == "ar" ? (
              <>
                <span
                  // data-kt-element="current-lang-name"
                  className="mx-2 text-hover-primary"
                >
                  {intl.formatMessage({ id: "Arabic" })}
                </span>
                <img
                  // data-kt-element="current-lang-flag"
                  className="w-20px h-20px rounded me-3"
                  src="/media/flags/saudi-arabia.svg"
                  alt=""
                />
              </>
            ) : (
              <>
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
            )}
          </button> */}
        <DropdownButton
          style={{
            border: "1px solid #a1a5b7",
            borderRadius: "35px",
            height: "45px",
            display: "flex",
            alignItems: "center"
          }}
          onClick={() => {
            handleShowDropdownContent();
          }}
          id="dropdown-menu-align-end"
          variant={""}
          drop="down"
          title={
            getCurrentSystemLanguage() == "ar" ? (
              <>
                <span
                  className="mx-2 text-hover-primary text-muted"
                >
                  {intl.formatMessage({ id: "Arabic" })}
                </span>
                {/* <img
                  className="w-20px h-20px rounded me-3"
                  src="/media/flags/saudi-arabia.svg"
                  alt=""
                /> */}
                <i className="fas fa-globe special text-muted"></i>
                {/* 
                {!showDropdownContent ? (
                  <i className="fa-solid fa-chevron-down text-muted"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down text-muted"></i>
                )} */}
              </>
            ) : (
              <>
                {/* {!showDropdownContent ? (
                  <i className="fa-solid fa-chevron-down text-muted"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down text-muted"></i>
                )} */}
                <span
                  className="mx-2 text-hover-primary text-muted"
                >
                  {intl.formatMessage({ id: "English" })}
                </span>
                <i className="fas fa-globe special text-muted"></i>

                {/* <img
                  className="w-20px h-20px rounded me-3"
                  src="/media/flags/united-states.svg"
                  alt=""
                /> */}
              </>
            )
          }
        >
          <div
          >
            {languages?.map((l, index) => (
              <Dropdown.Item key={index}>
                <div
                  className="menu-item px-3"
                  key={l.lang}
                  onClick={() => {
                    setLanguage(l.lang);
                  }}
                >
                  <a
                    href="#"
                    className={clsx("menu-link d-flex px-5", {
                      active: l.lang === currentLanguage?.lang,
                    })}
                  >
                    <span className="symbol symbol-20px mx-4">
                      <img className="rounded-1" src={l.flag} alt="" />
                    </span>
                    {l.name}
                  </a>
                </div>
              </Dropdown.Item>
            ))}
          </div>
        </DropdownButton>
      </div>
    </Fragment >
  );
}

export default AuthFooterNew;
