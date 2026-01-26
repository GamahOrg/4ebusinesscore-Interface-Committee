import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postHiddenWorkspaces } from "../../features/postHiddenWorkspacesSlice";
import { setWorkspaceKey } from "@4eplatform/shared/index";
import {
  addToFavourites,
  deleteFromFavourites,
  getFavouriteList,
} from "../../features/favouritesListSlice";
import Swal from "sweetalert2";
import { RootState } from "../../store/store";
import { ResponseStatus } from "../../models/response-status";
import { getAllMyComponents } from "../../features/getAllMyComponentsSlice";
import { getAllHiddenWorkspaces } from "../../features/getAllHiddenWorkspacesSlice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface Iprop {
  id: any;
  name: string;
  dept: string;
  title: string;
  subTitle: string;
  count: string;
  lastUpdate: string;
  lastLogin: string;
  link: string;
  icon: any;
  subIcon: any;
  color: string;
  background: string;
  isShow: boolean;
  handleHideCard: any;
  handleFavouriteCard: any;
  setFavouritesList: any;
  getFavouritesList: any;
  favorite: any;
  setFavourite: any;
  index: number;
  workspaceKey: number;
  subSystemId?: string;
  card?: any;
  titleAr?: any;
  titleEn?: any;
}

const WorkspaceCard: FC<Iprop> = ({
  index,
  id,
  handleHideCard,
  name,
  dept,
  title,
  subTitle,
  count,
  lastUpdate,
  lastLogin,
  link,
  icon,
  subIcon,
  color,
  background,
  isShow,
  handleFavouriteCard,
  setFavouritesList,
  getFavouritesList,
  favorite,
  setFavourite,
  workspaceKey,
  subSystemId,
  card,
  titleAr,
  titleEn,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  let language = intl.locale;
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();



  let favourieList = useSelector((state: RootState) => {
    return state?.getFavouriteList?.items;
  }) as any[];

  useEffect(() => {
    setIsFavouriteCard(
      favourieList?.filter((x) => x.workspaceId == id).length > 0 ? true : false
    );
  }, [favourieList]);

  let [isFavouriteCard, setIsFavouriteCard] = useState<boolean>(false);

  let [isHiddenCard, setIsHiddenCard] = useState<boolean>(false);

  const submitHandler = async () => {
    var foundFavourite = favourieList?.findIndex((x) => x.workspaceId == id);
    if (foundFavourite > -1 && isFavouriteCard == false) {
      let response = await dispatch(deleteFromFavourites(id) as any);
      if (response?.payload?.statusEnum === ResponseStatus.Success) {
        showSuccessAlert("RemoveFromFavouritesSuccessfully");
      } else {
        Swal.fire("Error!", "Failed to delete item.", "error");
      }
    } else if (foundFavourite == -1 && isFavouriteCard) {
      let response = await dispatch(
        addToFavourites({ workspaceId: id }) as any
      );
      if (response?.payload?.statusEnum === ResponseStatus.Success) {
        showSuccessAlert("AddedToFavouriteSuccessfully");
      } else {
        if (language === "ar") {
          Swal.fire("مساحه العمل ليس لها ادوار");
        } else {
          Swal.fire("This workspace card has no roles");
        }
      }
    }
    dispatch(getFavouriteList() as any);
    submitHiddenHandler();
  };

  const [pageNumber, setPageNumber] = useState(1);
  const submitHiddenHandler = async () => {
    if (isHiddenCard) {
      let body = {
        workspaceId: id,
      };
      let response = await dispatch(postHiddenWorkspaces(body) as any);
      if (response?.payload?.statusEnum === ResponseStatus.Success) {
        showSuccessAlert("HiddenFromWrokSpace");
        dispatch(
          getAllMyComponents(
            subSystemId
              ? { pageNumber, pageSize: 100, subSystemId }
              : { pageNumber, pageSize: 100 }
          ) as any
        );
        dispatch(getAllHiddenWorkspaces() as any);
      } else {
        if (language === "ar") {
          Swal.fire("مساحه العمل ليس لها ادوار");
        } else {
          Swal.fire("This workspace card has no roles");
        }
      }
    }
    setShowMenu(false);
  };

  const showSuccessAlert = (action: string) => {
    Swal.fire({
      text: intl.formatMessage({ id: action }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const minHeight = language === "en" ? "115px" : "110px";

  const handleNavigate = () => {
    navigate(
      link?.startsWith("/committee")
        ? link.replace("/committee", "")
        : link,
      {
        state: {
          cardId: id,
          cardTitle: title,
        },
      }
    );
  };

  return (
    <>
      {isShow && (
        <div id={id} className="flex-fill workspace-card-custom">
          <div
            className="card-header border-0 pt-5  mt-5"
            style={{ minHeight: minHeight }}
          >
            <h3 className="card-title align-items-start flex-column justify-content-end">
              <span className="card-label fw-bolder text-dark fs-6">
                {localStorage.getItem("isSubSystem") === "false"
                  ? localStorage.getItem("ClassificationName")
                  : name}
              </span>
              <span className="text-muted mt-2 fw-bold fs-9">{dept}</span>
            </h3>

            <div className="card-toolbar">
              <Dropdown show={showMenu}>
                {/* Hide Card Features */}
                {/* <Dropdown.Toggle
                  variant="custom-transparent"
                  size="sm"
                  className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  <span className="svg-icon svg-icon-2 primary">
                    <KTSVG path="/media/icons/duotune/general/gen074.svg" />
                  </span>
                </Dropdown.Toggle> */}
                <Dropdown.Menu
                  align="end"
                  className={`w-200px w-md-200px ${showMenu ? "show" : ""}`}
                >
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bolder d-flex justify-content-start">
                      {" "}
                      {intl.formatMessage({ id: "Properties" })}
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="p-4">
                    <div className="mb-5">
                      <div className="">
                        <Form className="mb-5">
                          {/* <div className="d-flex align-items-center">
                            <Form.Check
                              className="form-check form-check-sm form-check-custom form-check-solid"
                              type="checkbox"
                              id="addToFavorites"
                              label={intl.formatMessage({
                                id: "AddToFavorites",
                              })}
                              onClick={() => {
                                setIsFavouriteCard(!isFavouriteCard);
                              }}
                              checked={isFavouriteCard}
                            />
                          </div> */}
                          <div className="d-flex align-items-center">
                            <Form.Check
                              className="form-check form-check-sm form-check-custom form-check-solid py-2"
                              type="checkbox"
                              id="indicatorsCardHideInput"
                              label={intl.formatMessage({
                                id: "HideFromWorkspace",
                              })}
                              //   onClick={()=>{setIsHiddenCard((prev:any)=>{return {...prev,[id]:!prev[id]}})
                              // }}
                              onClick={() => {
                                setIsHiddenCard((prev: any) => {
                                  return { ...prev, [id]: !prev[id] };
                                });
                              }}
                            />
                          </div>
                        </Form>
                      </div>
                    </div>
                    {/* <div className="mb-5">
                        <label className="form-label fw-bold d-flex justify-content-start">
                          {intl.formatMessage({ id: "Notifications" })}
                        </label>
                        <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid py-2">
                          <Form.Check
                            type="switch"
                            id="notificationsSwitch"
                            label={intl.formatMessage({ id: "Enable" })}
                          />
                        </div>
                      </div> */}
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="light"
                        size="sm"
                        className="btn-active-light-primary me-2"
                        onClick={() => {
                          setShowMenu(false);
                        }}
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          submitHandler();
                        }}
                      >
                        {intl.formatMessage({ id: "Agree" })}
                      </Button>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="card-body d-flex flex-column justify-content-between align-items-center p-5 h-100 workspace-card-body-custom">
            <div className="w-100 text-center flex-grow-1 d-flex flex-column align-items-center justify-content-center">
              <div className="symbol symbol-75px mb-2">
                <span
                  className={
                    "symbol-label " +
                    (background === "1"
                      ? "bg-light-primary"
                      : background === "2"
                        ? "bg-light-warning"
                        : background === "3"
                          ? "bg-light-info"
                          : background === "4"
                            ? "bg-light-gblue"
                            : background === "5"
                              ? "bg-light-success"
                              : background === "6"
                                ? "bg-light-danger"
                                : "")
                  }
                >
                  <span
                    className={
                      "svg-icon svg-icon-4x " +
                      (color === "0"
                        ? "svg-icon-danger"
                        : color === "1"
                          ? "svg-icon-success"
                          : color === "2"
                            ? "svg-icon-warning"
                            : color === "3"
                              ? "svg-icon-gblue"
                              : color === "4"
                                ? "svg-icon-info"
                                : color === "5"
                                  ? "svg-icon-primary"
                                  : "")
                    }
                    dangerouslySetInnerHTML={{ __html: icon }}
                  >
                    {/* {icon} */}
                  </span>
                </span>
              </div>

              <span
                onClick={() => {
                  setWorkspaceKey(workspaceKey);
                  localStorage.setItem(
                    "cardName",
                    JSON.stringify({ nameAr: titleAr, nameEn: titleEn })
                  );
                  handleNavigate();
                }}
                className="fs-4 text-gray-800 text-hover-gblue fw-bolder mb-0"
              >
                {title}
              </span>

              {subTitle?.length <= 55 && (
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip">
                      {intl.locale === "ar" ? titleAr : titleEn}
                    </Tooltip>
                  }
                >
                  <div className="fw-bold text-gray-500 mb-6 two-line-ellipsis">
                    {subTitle} {count}
                  </div>
                </OverlayTrigger>
              )}
            </div>
            <div className="w-100 d-flex justify-content-center mt-auto">
              {card?.isExternal ? (
                <Link
                  to={link}
                  onClick={() => {
                    localStorage.setItem(
                      "cardName",
                      JSON.stringify({ nameAr: titleAr, nameEn: titleEn })
                    );
                  }}
                  target="_blank"
                  className="btn btn-primary py-3 w-100"
                  style={{ maxWidth: 200 }}
                >
                  {intl.formatMessage({ id: "ViewDetails" })}{" "}
                </Link>
              ) : (
                <span
                  onClick={() => {
                    setWorkspaceKey(workspaceKey);
                    localStorage.setItem(
                      "cardName",
                      JSON.stringify({ nameAr: titleAr, nameEn: titleEn })
                    );
                    handleNavigate();
                  }}
                  className="btn btn-primary py-3 w-100"
                  style={{ maxWidth: 200, cursor: "pointer" }}
                >
                  {intl.formatMessage({ id: "ViewDetails" })}{" "}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { WorkspaceCard };
