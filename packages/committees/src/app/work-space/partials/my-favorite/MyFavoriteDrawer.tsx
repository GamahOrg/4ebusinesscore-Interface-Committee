import { useIntl } from "react-intl";
import { Offcanvas } from "react-bootstrap";
import FavouriteItemList from "./FavouriteItemList";
import { useEffect, useState } from "react";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

interface MyFavouriteProps {
  show?: any;
  handleClose?: any;
  getFavouritesList?: any;
  setFavouritesList: any;
  favorite?: any;
  setFavourite?: any;
}
const MyFavoriteDrawer = ({
  show,
  handleClose,
  getFavouritesList,
  setFavouritesList,
  favorite,
  setFavourite,
}: MyFavouriteProps) => {
  const intl = useIntl();

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchParams, setSearchParams] = useState<any[]>([]);

  useEffect(() => {
    if (getFavouritesList?.length > 0) {
      setSearchParams([...getFavouritesList]);
    } else {
      setSearchParams([]);
    }
  }, [getFavouritesList]);

  const Search = (e: any) => {
    var searchItems = getFavouritesList?.filter((x: any) =>
      x.noteNameAr.includes(e.target.value)
    );
    setSearchParams([...searchItems]);
    setSearchKey(e.target.value);
  };

  return (
    <>
      <Offcanvas
        style={{
          left: intl.locale == "ar" ? "0%" : "auto",
          right: intl.locale == "en" ? "0%" : "auto",
          maxWidth: "440px",
          minWidth: "320px",
          width: "60%",
          // zIndex: 110,
        }}
        show={show}
        onHide={handleClose}
        // className="h-100 bg-body pe-0 drawer drawer-on drawer-overlay"
        autoFocus={true}
        className="bg-light pe-0 drawer drawer-on overflow-hidden fade"
      >
        <div className="drawer-overlay" onClick={handleClose}></div>

        {/* begin::Card */}
        <div
          style={{
            zIndex: 120,
          }}
          className="card shadow-none w-100 h-100 bg-body rounded-0"
        >
          {/* begin::Header */}
          <Offcanvas.Header
            closeButton
            className="d-flex justify-content-between mx-4 my-3"
          >
            <div className="card-header" id="kt_help_header">
              <Offcanvas.Title className="py-3">
                {" "}
                <h5 className="card-title fw-bold text-gray-600">
                  {intl.formatMessage({
                    id: "AddToolsAndServicesToMyFavourites",
                  })}
                </h5>
              </Offcanvas.Title>
            </div>
          </Offcanvas.Header>

          {/* end::Header */}

          {/* begin::Body */}
          <Offcanvas.Body className="h-100 pt-5 px-0" id="Workspace_List_body">
            {/* begin::Content */}
            <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9">
              <li className="nav-item">
                <a
                  className="nav-link text-dark opacity-75 opacity-state-100 pb-4 active"
                  data-bs-toggle="tab"
                  href="#MyFavorite"
                >
                  {intl.formatMessage({ id: "MyFavourite" })}
                </a>
              </li>
            </ul>
            <div className="tab-content rounded h-100 bg-light p-10">
              <div className="tab-pane fade active show" id="MyFavorite">
                <div
                  id="Workspace_List_scroll"
                  className="hover-scroll-overlay-y"
                  data-kt-scroll="true"
                  data-kt-scroll-height="auto"
                  data-kt-scroll-wrappers="#Workspace_List_body"
                  data-kt-scroll-dependencies="#Workspace_List_header"
                  data-kt-scroll-offset="5px"
                >
                  <div className="rounded border border-dashed border-gray-300 p-0 mb-7">
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
                        <div className="d-flex align-items-center">
                          {/* <button type="submit" className="btn btn-primary">
                            {intl.formatMessage({ id: "Search" })}
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-body">
                    {searchParams
                      ?.filter((item: any) => {
                        return item?.isChecked == true;
                      })
                      .map((favourite: any, index: any) => (
                        <FavouriteItemList
                          key={index}
                          favourite={favourite}
                          setFavouritesList={setFavouritesList}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
          {/* end::Body */}
        </div>
        {/* end::Card */}
      </Offcanvas>
    </>
  );
};

export { MyFavoriteDrawer };
