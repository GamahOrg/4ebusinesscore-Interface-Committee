import React, { FC, useEffect, useRef, useState } from "react";
import { SearchComponent } from "../../../assets/ts/components";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { useIntl } from "react-intl";

type propSearch = {
  iconClass?: any;
};
const SearchT: FC<propSearch> = ({ iconClass }) => {
  const [menuState, setMenuState] = useState<
    "main" | "advanced" | "preferences"
  >("main");
  const element = useRef<HTMLDivElement | null>(null);
  const wrapperElement = useRef<HTMLDivElement | null>(null);
  const resultsElement = useRef<HTMLDivElement | null>(null);
  const suggestionsElement = useRef<HTMLDivElement | null>(null);
  const emptyElement = useRef<HTMLDivElement | null>(null);
  const intl = useIntl();

  const processs = (search: SearchComponent) => {
    setTimeout(function () {
      const number = Math.floor(Math.random() * 6) + 1;

      // Hide recently viewed
      suggestionsElement.current!.classList.add("d-none");

      if (number === 3) {
        // Hide results
        resultsElement.current!.classList.add("d-none");
        // Show empty message
        emptyElement.current!.classList.remove("d-none");
      } else {
        // Show results
        resultsElement.current!.classList.remove("d-none");
        // Hide empty message
        emptyElement.current!.classList.add("d-none");
      }

      // Complete search
      search.complete();
    }, 1500);
  };

  const clear = (search: SearchComponent) => {
    // Show recently viewed
    suggestionsElement.current!.classList.remove("d-none");
    // Hide results
    resultsElement.current!.classList.add("d-none");
    // Hide empty message
    emptyElement.current!.classList.add("d-none");
  };

  useEffect(() => {
    // Initialize search handler
    const searchObject = SearchComponent.createInsance("#kt_header_search");

    // Search handler
    searchObject!.on("kt.search.process", processs);

    // Clear handler
    searchObject!.on("kt.search.clear", clear);
  }, []);

  return (
    <>
      <div
        id="kt_header_search"
        className="d-flex align-items-stretch"
        data-kt-search-keypress="true"
        data-kt-search-min-length="2"
        data-kt-search-enter="enter"
        data-kt-search-layout="menu"
        data-kt-menu-trigger="auto"
        data-kt-menu-overflow="false"
        data-kt-menu-permanent="true"
        data-kt-menu-placement="bottom-end"
        ref={element}
      >
        <div
          className="d-flex align-items-center"
          data-kt-search-element="toggle"
          id="kt_header_search_toggle"
        >
          <div className="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px">
            {/* <KTSVG
              path="/media/icons/duotune/general/gen021.svg"
              className="svg-icon-1"
            /> */}
            <KTSVG
              path="/media/svg/icons/search.svg"
              className={`svg-icon-1 ${
                iconClass === "true" ? "theme-text" : ""
              }`}
            />
          </div>
        </div>

        <div
          data-kt-search-element="content"
          className="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px"
        >
          <div
            className={`${menuState === "main" ? "" : "d-none"}`}
            ref={wrapperElement}
            data-kt-search-element="wrapper"
          >
            <form
              data-kt-search-element="form"
              className="w-100 position-relative mb-3"
              autoComplete="off"
            >
              <KTSVG
                path="/media/icons/duotune/general/gen021.svg"
                className="svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0"
              />

              <input
                type="text"
                className="form-control form-control-flush ps-10"
                name="search"
                placeholder={intl.formatMessage({ id: "Search" })}
                data-kt-search-element="input"
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1"
                data-kt-search-element="spinner"
              >
                <span className="spinner-border h-15px w-15px align-middle text-gray-400" />
              </span>

              <span
                className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none"
                data-kt-search-element="clear"
              >
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon-2 svg-icon-lg-1 me-0"
                />
              </span>

              <div
                className="position-absolute top-50 end-0 translate-middle-y"
                data-kt-search-element="toolbar"
              >
                <div
                  data-kt-search-element="preferences-show"
                  className="btn btn-icon w-20px btn-sm btn-active-color-primary me-1"
                  data-bs-toggle="tooltip"
                  onClick={() => {
                    setMenuState("preferences");
                  }}
                  title="Show search preferences"
                >
                  <KTSVG
                    path="/media/icons/duotune/coding/cod001.svg"
                    className="svg-icon-1"
                  />
                </div>

                <div
                  data-kt-search-element="advanced-options-form-show"
                  className="btn btn-icon w-20px btn-sm btn-active-color-primary"
                  data-bs-toggle="tooltip"
                  onClick={() => {
                    setMenuState("advanced");
                  }}
                  title="Show more search options"
                >
                  <KTSVG
                    path="/media/icons/duotune/arrows/arr072.svg"
                    className="svg-icon-2"
                  />
                </div>
              </div>
            </form>

            <div
              ref={resultsElement}
              data-kt-search-element="results"
              className="d-none"
            >
              <div className="scroll-y mh-200px mh-lg-350px">
                <h3
                  className="fs-5 text-muted m-0 pb-5"
                  data-kt-search-element="category-title"
                >
                  Users
                </h3>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <img
                      src={toAbsoluteUrl("/media/avatars/300-6.jpg")}
                      alt=""
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Karina Clark</span>
                    <span className="fs-7 fw-bold text-muted">
                      Marketing Manager
                    </span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <img
                      src={toAbsoluteUrl("/media/avatars/300-2.jpg")}
                      alt=""
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Olivia Bold</span>
                    <span className="fs-7 fw-bold text-muted">
                      Software Engineer
                    </span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <img
                      src={toAbsoluteUrl("/media/avatars/300-9.jpg")}
                      alt=""
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Ana Clark</span>
                    <span className="fs-7 fw-bold text-muted">
                      UI/UX Designer
                    </span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <img
                      src={toAbsoluteUrl("/media/avatars/300-14.jpg")}
                      alt=""
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Nick Pitola</span>
                    <span className="fs-7 fw-bold text-muted">
                      Art Director
                    </span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <img
                      src={toAbsoluteUrl("/media/avatars/300-11.jpg")}
                      alt=""
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Edward Kulnic</span>
                    <span className="fs-7 fw-bold text-muted">
                      System Administrator
                    </span>
                  </div>
                </a>

                <h3
                  className="fs-5 text-muted m-0 pt-5 pb-5"
                  data-kt-search-element="category-title"
                >
                  Customers
                </h3>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        className="w-20px h-20px"
                        src={toAbsoluteUrl(
                          "/media/svg/brand-logos/volicity-9.svg"
                        )}
                        alt=""
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Company Rbranding</span>
                    <span className="fs-7 fw-bold text-muted">UI Design</span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        className="w-20px h-20px"
                        src={toAbsoluteUrl("/media/svg/brand-logos/tvit.svg")}
                        alt=""
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Company Re-branding</span>
                    <span className="fs-7 fw-bold text-muted">
                      Web Development
                    </span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        className="w-20px h-20px"
                        src={toAbsoluteUrl("/media/svg/misc/infography.svg")}
                        alt=""
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Business Analytics App</span>
                    <span className="fs-7 fw-bold text-muted">
                      Administration
                    </span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        className="w-20px h-20px"
                        src={toAbsoluteUrl("/media/svg/brand-logos/leaf.svg")}
                        alt=""
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">EcoLeaf App Launch</span>
                    <span className="fs-7 fw-bold text-muted">Marketing</span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        className="w-20px h-20px"
                        src={toAbsoluteUrl("/media/svg/brand-logos/tower.svg")}
                        alt=""
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Tower Group Website</span>
                    <span className="fs-7 fw-bold text-muted">
                      Google Adwords
                    </span>
                  </div>
                </a>

                <h3
                  className="fs-5 text-muted m-0 pt-5 pb-5"
                  data-kt-search-element="category-title"
                >
                  Projects
                </h3>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        path="/media/icons/duotune/general/gen005.svg"
                        className="svg-icon-2 svg-icon-primary"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold">
                      Si-Fi Project by AU Themes
                    </span>
                    <span className="fs-7 fw-bold text-muted">#45670</span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        path="/media/icons/duotune/general/gen032.svg"
                        className="svg-icon-2 svg-icon-primary"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold">
                      Shopix Mobile App Planning
                    </span>
                    <span className="fs-7 fw-bold text-muted">#45690</span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        path="/media/icons/duotune/communication/com012.svg"
                        className="svg-icon-2 svg-icon-primary"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold">
                      Finance Monitoring SAAS Discussion
                    </span>
                    <span className="fs-7 fw-bold text-muted">#21090</span>
                  </div>
                </a>

                <a
                  href="/#"
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        path="/media/icons/duotune/communication/com006.svg"
                        className="svg-icon-2 svg-icon-primary"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold">
                      Dashboard Analitics Launch
                    </span>
                    <span className="fs-7 fw-bold text-muted">#34560</span>
                  </div>
                </a>
              </div>
            </div>

            <div
              ref={suggestionsElement}
              className="mb-4"
              data-kt-search-element="main"
            >
              <div className="d-flex flex-stack fw-bold mb-4">
                <span className="text-muted fs-6 me-2">
                  {intl.formatMessage({ id: "RecentlySearched" })}:
                </span>
              </div>

              <div className="scroll-y mh-200px mh-lg-325px">
                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        path="/media/icons/duotune/electronics/elc004.svg"
                        className="svg-icon-2 svg-icon-primary"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a
                      href="/#"
                      className="fs-6 text-gray-800 text-hover-primary fw-bold"
                    >
                      {intl.formatMessage({ id: "Requests" })}
                    </a>
                    <span className="fs-7 text-muted fw-bold">
                      7 {intl.formatMessage({ id: "Request" })}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        path="/media/icons/duotune/graphs/gra001.svg"
                        className="svg-icon-2 svg-icon-primary"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a
                      href="/#"
                      className="fs-6 text-gray-800 text-hover-primary fw-bold"
                    >
                      {intl.formatMessage({ id: "Tasks" })}
                    </a>
                    <span className="fs-7 text-muted fw-bold">
                      10 {intl.formatMessage({ id: "Task" })}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        path="/media/icons/duotune/graphs/gra006.svg"
                        className="svg-icon-2 svg-icon-primary"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a
                      href="/#"
                      className="fs-6 text-gray-800 text-hover-primary fw-bold"
                    >
                      {intl.formatMessage({ id: "Reports" })}
                    </a>
                    <span className="fs-7 text-muted fw-bold">
                      15 {intl.formatMessage({ id: "Report" })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={emptyElement}
              data-kt-search-element="empty"
              className="text-center d-none"
            >
              <div className="pt-10 pb-10">
                <KTSVG
                  path="/media/icons/duotune/files/fil024.svg"
                  className="svg-icon-4x opacity-50"
                />
              </div>

              <div className="pb-15 fw-bold">
                <h3 className="text-gray-600 fs-5 mb-2">No result found</h3>
                <div className="text-muted fs-7">
                  Please try again with a different query
                </div>
              </div>
            </div>
          </div>

          <form className={`pt-1 ${menuState === "advanced" ? "" : "d-none"}`}>
            <h3 className="fw-bold text-dark mb-7">
              {intl.formatMessage({ id: "AdvancedSearch" })}
            </h3>

            <div className="mb-5">
              <input
                type="text"
                className="form-control form-control-sm form-control-solid"
                placeholder="Contains the word"
                name="query"
              />
            </div>

            <div className="mb-5">
              <div className="nav-group nav-group-fluid">
                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    value="has"
                    defaultChecked
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                    {intl.formatMessage({ id: "All" })}
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    value="users"
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    {intl.formatMessage({ id: "Users" })}
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    value="orders"
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    {intl.formatMessage({ id: "Requests" })}
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    value="projects"
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    {intl.formatMessage({ id: "Reports" })}
                  </span>
                </label>
              </div>
            </div>

            <div className="mb-5">
              <input
                type="text"
                name="assignedto"
                className="form-control form-control-sm form-control-solid"
                placeholder="Assigned to"
              />
            </div>

            <div className="mb-5">
              <input
                type="text"
                name="collaborators"
                className="form-control form-control-sm form-control-solid"
                placeholder="Collaborators"
              />
            </div>

            <div className="mb-5">
              <div className="nav-group nav-group-fluid">
                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="attachment"
                    value="has"
                    defaultChecked
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                    {intl.formatMessage({ id: "HasAttachment" })}
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="attachment"
                    value="any"
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    {intl.formatMessage({ id: "Any" })}
                  </span>
                </label>
              </div>
            </div>
            <div className="row mb-8">
              <div className="col-sm-6 col-12">
                <input
                  type="number"
                  name="date_number"
                  className="form-control form-control-sm form-control-solid"
                  placeholder="Lenght"
                />
              </div>

              <div className="col-sm-6 col-12">
                <select
                  name="date_typer"
                  aria-label="Select a Timezone"
                  data-control="select2"
                  data-placeholder="Period"
                  className="form-select form-select-sm form-select-solid"
                >
                  <option value="days">
                    {" "}
                    {intl.formatMessage({ id: "Days" })}
                  </option>
                  <option value="weeks">
                    {" "}
                    {intl.formatMessage({ id: "Weeks" })}
                  </option>
                  <option value="months">
                    {" "}
                    {intl.formatMessage({ id: "Months" })}
                  </option>
                  <option value="years">
                    {" "}
                    {intl.formatMessage({ id: "Years" })}
                  </option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMenuState("main");
                }}
                className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2"
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>

              <a
                href="/#"
                className="btn btn-sm fw-bolder btn-primary"
                data-kt-search-element="advanced-options-form-search"
              >
                {intl.formatMessage({ id: "Search" })}
              </a>
            </div>
          </form>

          <form
            className={`pt-1 ${menuState === "preferences" ? "" : "d-none"}`}
          >
            <h3 className="fw-bold text-dark mb-7">
              {intl.formatMessage({ id: "SearchPreferences" })}
            </h3>

            <div className="pb-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  {intl.formatMessage({ id: "Requests" })}
                </span>

                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  defaultChecked
                />
              </label>
            </div>

            <div className="py-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  {intl.formatMessage({ id: "Tasks" })}
                </span>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  defaultChecked
                />
              </label>
            </div>

            <div className="py-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  {intl.formatMessage({ id: "Reports" })}
                </span>
                <input className="form-check-input" type="checkbox" value="1" />
              </label>
            </div>

            <div className="py-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  {intl.formatMessage({ id: "Archives" })}
                </span>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  defaultChecked
                />
              </label>
            </div>

            <div className="py-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  {intl.formatMessage({ id: "Users" })}
                </span>
                <input className="form-check-input" type="checkbox" />
              </label>
            </div>

            <div className="d-flex justify-content-end pt-7">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMenuState("main");
                }}
                className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2"
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>
              <button className="btn btn-sm fw-bolder btn-primary">
                {intl.formatMessage({ id: "SaveChanges" })}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { SearchT };
