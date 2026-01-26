/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { CeoSystemTools } from "./components/CeoSystemTools";
import { SystemLang } from "@4eplatform/shared/assets/Lang";
import {
  Tab,
  InputGroup,
  FormControl,
  Button,
  Form,
  Offcanvas,
} from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

interface ToolBoxProps {
  show?: any;
  handleClose?: any;
  removeFromCardList: (arg: any) => void;
  removeFromTableList: (arg: any) => void;
  getMyToolsList?: any;
  setMyToolsList?: any;
}
export function ToolsBoxDrawer<ToolBoxProps>({
  removeFromCardList,
  removeFromTableList,
  show,
  handleClose,
  getMyToolsList = [],
  setMyToolsList,
}: any) {
  const intl = useIntl();

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchParams, setSearchParams] = useState<any>([]);

  useEffect(() => {
    if (getMyToolsList?.length > 0) {
      setSearchParams(getMyToolsList);
    } else {
      setSearchParams([]);
    }
  }, [getMyToolsList]);

  const Search = (e: any) => {
    var searchItems = getMyToolsList?.filter((x: any) =>
      SystemLang() == "ar"
        ? x.noteNameAr.toLowerCase().includes(e.target.value.toLowerCase())
        : x.noteNameEn.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setSearchParams([...searchItems]);
    setSearchKey(e.target.value);
  };

  //Dynamic - My Tools

  //Dyanmic System Tools

  //Ceo Shared Services
  const [getSharedServicesList, setSharedServicesList] = useState([]);
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.name === "getMyToolsList" &&
      window.location.pathname ===
        "/systems-services-settings/dynamic-workspace"
    ) {
      const index = getMyToolsList.findIndex(
        (item: any) => item.id === event.target.id,
      );
      const newMyToolsList: any = [...getMyToolsList];

      newMyToolsList[index].isChecked = event.target.checked;
      // setMyToolsList(newMyToolsList);
      removeFromCardList(event.target.id, event.target.checked);
      // removeFromTableList(event.target.id, event.target.checked);
    } else if (
      event.target.name === "getSharedServicesList" &&
      window.location.pathname === "/dynamic-workspace"
    ) {
      const index = getSharedServicesList.findIndex(
        (item: any) => item.id === +event.target.id,
      );
      const newSharedServicesList: any = [...getSharedServicesList];
      newSharedServicesList[index].isChecked = event.target.checked;
      setSharedServicesList(newSharedServicesList);
      removeFromTableList(event.target.value, event.target.checked);
    }
  };

  return (
    <>
      <div
        // id="kt_engage_demos"
        className="bg-body drawer drawer-activate"
      >
        <Offcanvas
          style={{
            left: intl.locale == "ar" ? "0%" : "auto",
            right: intl.locale == "en" ? "0%" : "auto",
            maxWidth: "440px",
            minWidth: "320px",
            width: "60%",
          }}
          show={show}
          onHide={handleClose}
          autoFocus={true}
          className="bg-light pe-0 drawer drawer-on overflow-hidden fade"
        >
          <div className="drawer-overlay" onClick={handleClose}></div>
          <div
            style={{
              zIndex: 120,
            }}
            className="card shadow-none w-100 h-100 bg-body rounded-0"
          >
            <Offcanvas.Header
              closeButton={false}
              className="d-flex justify-content-end mx-3 mt-2"
            >
              <button
                type="button"
                className="btn p-1"
                aria-label="Close"
                onClick={handleClose}
              >
                <i
                  style={{ fontSize: "28px" }}
                  className="bi bi-x text-muted"
                ></i>
              </button>
            </Offcanvas.Header>
            <div className="rounded p-0 my-7">
              <div className="fs-5 fw-bold mb-0">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="position-relative w-md-400px ms-md-0">
                    <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                      <KTSVG path="/media/icons/duotune/general/gen064.svg" />
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-solid ps-10"
                      value={searchKey}
                      onChange={(e) => {
                        Search(e);
                      }}
                      placeholder={intl.formatMessage({
                        id: "TypeYourSearchHere",
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Offcanvas.Body
              className="h-100 pt-5 px-0"
              id="Workspace_List_body"
            >
              {/* className= "card-body" */}

              <Tab.Container defaultActiveKey="MyToolsTab">
                {/* <Nav
                  variant="tabs"
                  className="nav-line-tabs side-menu-tab nav-line-tabs-2x nav-stretch fw-bold px-9"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="MyToolsTab">
                      {intl.formatMessage({ id: "MyFavourite" })}
                    </Nav.Link>
                  </Nav.Item>
                </Nav> */}
                <Tab.Content className="tab-content rounded h-100 bg-light p-6">
                  <Tab.Pane eventKey="MyToolsTab">
                    <div
                      id="Workspace_List_scroll"
                      // className="hover-scroll-overlay-y"
                      data-kt-scroll="true"
                      data-kt-scroll-height="auto"
                      data-kt-scroll-wrappers="#Workspace_List_body"
                      data-kt-scroll-dependencies="#Workspace_List_header"
                      data-kt-scroll-offset="5px"
                    >
                      <div className="tab-body scroll-overlay-y py-3">
                        {searchParams?.map((mytoolscard: any) => (
                          <div
                            key={mytoolscard.id}
                            className="d-flex align-items-center mb-7"
                          >
                            <div className="d-flex flex-stack flex-grow-1 gap-2 ms-lg-6">
                              {/* CeoSystemTools component */}
                              <CeoSystemTools
                                id={mytoolscard.id}
                                title={
                                  intl.locale === "ar"
                                    ? mytoolscard.noteNameAr ||
                                      mytoolscard.parentNoteNameAr
                                    : mytoolscard.noteNameEn ||
                                      mytoolscard.parentNoteNameEn
                                }
                                icon={mytoolscard.icon as any}
                                link={mytoolscard.url}
                                color={mytoolscard.color.toString()}
                                transition=""
                                handleClose={handleClose}
                              />
                              <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-lg">
                                <Form.Check
                                  id={`${mytoolscard.id}`}
                                  className="form-check-input widget-9-check xCheckBg"
                                  type="checkbox"
                                  value={mytoolscard.title}
                                  name="getMyToolsList"
                                  checked={mytoolscard.isChecked}
                                  onChange={(event: any) => {
                                    handleChangeCheckBox(event);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="SharedServicesTab">
                    <div
                      // className="hover-scroll-overlay-y"
                      data-kt-scroll="true"
                      data-kt-scroll-height="auto"
                      data-kt-scroll-offset="5px"
                    >
                      <div className="rounded border border-dashed border-gray-300 p-0 mb-7">
                        <div className="fs-5 fw-bold mb-0">
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="position-relative w-md-400px ms-md-0">
                              <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                                {/* Use appropriate SVG component */}
                                <KTSVG path="/media/icons/duotune/general/gen065.svg" />
                              </span>
                              <InputGroup>
                                <FormControl
                                  type="text"
                                  placeholder={intl.formatMessage({
                                    id: "TypeYourSearchHere",
                                  })}
                                />
                                <Button variant="primary" type="submit">
                                  {intl.formatMessage({ id: "Search" })}
                                </Button>
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-body">
                        {getSharedServicesList.map(
                          (sharedservicesscard: any) => (
                            <div
                              key={sharedservicesscard.id}
                              className="d-flex align-items-center mb-7"
                            >
                              <div className="d-flex flex-stack flex-grow-1 gap-2 ms-lg-6">
                                <CeoSystemTools
                                  id={sharedservicesscard.id}
                                  title={sharedservicesscard.title}
                                  icon={sharedservicesscard.icon as any}
                                  link={sharedservicesscard.link}
                                  color={sharedservicesscard.color}
                                  transition={sharedservicesscard.transition}
                                  handleClose={handleClose}
                                />
                                <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-lg">
                                  <Form.Check
                                    id={`${sharedservicesscard.id}`}
                                    className="form-check-input widget-9-check xCheckBg"
                                    type="checkbox"
                                    value={sharedservicesscard.title}
                                    name="getSharedServicesList"
                                    checked={sharedservicesscard.isChecked}
                                    onChange={(event: any) => {
                                      handleChangeCheckBox(event);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Offcanvas.Body>
          </div>
        </Offcanvas>
      </div>
    </>
  );
}
