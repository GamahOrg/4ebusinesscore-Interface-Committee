import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import React from "react";
const EN_LANG = "en";

export const CommitteesReviewHierarchyPopup: FC = () => {
  const intl = useIntl();
  const [managementData, setManagementData] = useState([
    {
      id: 1,
      name: "التنظيم والتسجيل العيني",
      collapsed: false,
      checked: true,
      children: [
        {
          id: 1,
          name: "مدير ادارة اللجان",
          collapsed: true,
          checked: true,
          children: [
            {
              id: 1,
              name: " مدير التسجيل العيني",
              collapsed: true,
              checked: true,
            },
            {
              id: 2,
              name: "مدير التنظيم والشؤون القانوينه",
              collapsed: true,
              checked: false,
            },
          ],
        },
        {
          id: 2,
          name: "مدير التسجيل العيني",
          collapsed: true,
          checked: false,
        },
        {
          id: 3,
          name: "مدير التنظيم والشؤون القانوينه",
          collapsed: true,
          checked: false,
        },
      ],
    },
    {
      id: 2,
      name: "العمليات العقاريه",
      collapsed: false,
      checked: true,
      children: [
        {
          id: 1,
          name: "مدير العقارات الرقمي",
          collapsed: true,
          checked: true,
        },
        {
          id: 2,
          name: "مدير العمليات",
          collapsed: true,
          checked: false,
          children: [
            {
              id: 1,
              name: "11اسم الادارة",
              collapsed: true,
              checked: false,
            },
            {
              id: 2,
              name: "12اسم الادارة",
              collapsed: true,
              checked: false,
            },
          ],
        },
      ],
    },
  ]);

  const handleChange = () => {
    setManagementData([...managementData]);
  };

  const handleChildrenChecked = (item, isChecked) => {
    item.checked = isChecked;
    item?.children?.forEach((child) => {
      child.checked = isChecked;
      if (child?.children?.length) {
        handleChildrenChecked(child, isChecked);
      }
    });
    handleChange();
  };

  const handleCollapse = (item, id): {} => ({
    "data-bs-toggle": "collapse",
    "data-bs-target": `#flush-main-tree${id}`,
    "aria-expanded": "true",
    "aria-controls": `flush-main-tree${id}`,
    onClick: () => {
      item.collapsed = !item.collapsed;
      handleChange();
    },
  });

  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang).selectedLang;
  } catch (err) {}

  let showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  return (
    <>
      <div className="modal-dialog modal-dialog-centered mw-1000px">
        <div className="modal-content">
          <div className="modal-header justify-content-end border-0 pb-0">
            <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
              <KTSVG path="/media/icons/duotune/arrows/arr061.svg" className="svg-icon-1" />
            </div>
          </div>
          <div className="card">
            <div className="card-body mx-5">
              <div className="card-header px-1 d-flex justify-content-center  pb-2 mb-5">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 ">{intl.formatMessage({ id: "ChoosePosition" })}</span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">{intl.formatMessage({ id: "PleaseEnterTheData" })} :</span>
                </h3>
              </div>
              <div className="row my-4">
                <div className="col-12">
                  <div className="mb-2 pt-2 pb-3 custom_tree">
                    {managementData.map((item) => (
                      <div className="tree_main mb-5" key={item.id}>
                        <ul id="tree1" className="tree list-unstyled">
                          <div className="fs-5 py-4 mb-7 d-flex align-items-center">
                            {item.children.length && (item.collapsed ? <i className={`fas fa-chevron-${selectedLang === EN_LANG ? "right" : "left"} fa-xl text-primary`} {...handleCollapse(item, item.id)}></i> : <i className="fas fa-chevron-down fa-xl text-danger" {...handleCollapse(item, item.id)}></i>)}

                            <div className=" d-inline mx-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                              <input
                                className="form-check-input widget-9-check xCheckBg mt-0"
                                type="checkbox"
                                id="3"
                                checked={item.checked}
                                onChange={() => {
                                  handleChildrenChecked(item, !item.checked);
                                }}
                              />
                            </div>
                            <div className="d-inline-block" {...handleCollapse(item, item.id)}>
                              <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                              <button className="basic-item bg-transparent border-0">{item.name}</button>
                            </div>
                          </div>
                          <div className="px-8 mx-4">
                            <li className="basic-branch branch accordion-collapse show" id={`flush-main-tree${item.id}`} aria-labelledby={`flush-main-tree${item.id}`} data-bs-parent={`#accordionFlushMainTree${item.id}`}>
                              <ul className="list-unstyled">
                                {item.children.map((child) => (
                                  <li className="branch mb-3" key={child.id}>
                                    {child?.children?.length &&
                                      (child.collapsed ? (
                                        <i className={`fas fa-chevron-${selectedLang === EN_LANG ? "right" : "left"} fa-xl text-primary`} {...(child?.children ? handleCollapse(child, `${item.id}${child.id}`) : {})}></i>
                                      ) : (
                                        <i className="fas fa-chevron-down fa-xl text-danger" {...(child?.children ? handleCollapse(child, `${item.id}${child.id}`) : {})}></i>
                                      ))}
                                    <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                      <input
                                        className="form-check-input widget-9-check xCheckBg"
                                        type="checkbox"
                                        id="1"
                                        checked={child.checked}
                                        onChange={() => {
                                          handleChildrenChecked(child, !child.checked);
                                        }}
                                      />
                                    </div>
                                    <label className="collapsed" htmlFor="2" {...(child?.children ? handleCollapse(child, `${item.id}${child.id}`) : {})}>
                                      {child.name}
                                    </label>
                                    <div className="my-8 px-8 mx-4">
                                      <ul className="list-unstyled accordion-collapse collapse" id={`flush-main-tree${item.id}${child.id}`} aria-labelledby={`flush-headingOne${item.id}${child.id}`} data-bs-parent={`#accordionFlushMainTree${item.id}${child.id}`}>
                                        {child.children?.map((nestedChild) => (
                                          <li className="branch mb-3" key={nestedChild.id}>
                                            <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                              <input
                                                className="form-check-input widget-9-check xCheckBg"
                                                type="checkbox"
                                                id="I"
                                                checked={nestedChild.checked}
                                                onChange={() => {
                                                  handleChildrenChecked(nestedChild, !nestedChild.checked);
                                                }}
                                              />
                                            </div>
                                            <label htmlFor="I">{nestedChild.name}</label>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </div>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div data-bs-dismiss="modal" className="btn btn-secondary mx-1 text-center w-100">
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <button
                      data-bs-dismiss="modal"
                      className="btn btn-success mx-1 text-center w-100"
                      style={{ border: "none" }}
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault();
                        showSuccessAlert();
                      }}
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
