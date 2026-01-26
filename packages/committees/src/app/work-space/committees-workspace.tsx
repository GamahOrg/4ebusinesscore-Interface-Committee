import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { WorkspaceCard } from "./components/WorkspaceCard";
import { WorkspaceTable } from "./components/WorkspaceTable";
import { WorkSpaceToolbar1 } from "./toolbar/WorkSpaceToolbar1";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchUserCardsByRoles,
  getAllMyComponents,
  getAllMyComponentsInToolBox,
} from "../features/getAllMyComponentsSlice";
import { getAllHiddenWorkspaces } from "../features/getAllHiddenWorkspacesSlice";
import { getFavouriteList } from "../features/favouritesListSlice";
import { postHiddenWorkspaces } from "../features/postHiddenWorkspacesSlice";
import { deleteHiddenWorkspaces } from "../features/deleteHiddenWorkspacesSlice";
import { MyComponentsModel } from "../models/MyComponentsModel";
import { SystemLang } from "@4eplatform/shared/assets/Lang";
import { useLocation } from "react-router-dom";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

const CommitteesWorkSpace: FC = () => {
  const intl = useIntl();
  const [searchKey, setSearchKey] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<any>([]);
  const [filteredCardsFilter, setFilteredCardsFilter] = useState<any>([]);

  let workspace = useSelector((state: RootState) => {
    return state?.myComponents;
  });

  let myWorkspaceInToolBox = useSelector((state: RootState) => {
    return state?.myComponents.itemsInToolBox;
  });

  let favoutites = useSelector((state: RootState) => {
    return state?.getFavouriteList;
  });
  let hiddenWorkspace = useSelector((state: RootState) => {
    return state?.hiddenWorkspaces;
  });

  let userCardsByRolesWorkspace = useSelector((state: RootState) => {
    return state?.myComponents?.userCardsByRoles;
  });

  const dispatch = useDispatch();
  const location = useLocation();

    let subSystemId= "62a32adb-1f46-4cfe-84aa-806b5841432d";
     let mainClassificationId = "00000000-0000-0000-0000-000000000000";

  const [pageSize, setPageSize] = useState(100);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(
      getAllMyComponents(
        subSystemId
          ? {
              pageNumber,
              pageSize: 100,
              subSystemId,
              mainClassificationId: mainClassificationId
                ? mainClassificationId
                : "",
            }
          : { pageNumber, pageSize: 100 }
      ) as any
    );

    if (subSystemId) localStorage.setItem("subSystemId", subSystemId);

    dispatch(
      getAllMyComponentsInToolBox({ pageNumber: 1, pageSize: 100 }) as any
    );
    dispatch(fetchUserCardsByRoles({ pageNumber: 1, pageSize: 100 }) as any);
  }, [
    pageNumber,
    pageSize,
    subSystemId,
    mainClassificationId,
    // JSON.parse(JSON.stringify(localStorage.getItem("i18nConfig"))).selectedLang,
    localStorage.getItem("i18nextLng"),
    localStorage.getItem("selectedLang"),
  ]);

  useEffect(() => {
    dispatch(getAllHiddenWorkspaces() as any);
    dispatch(getFavouriteList() as any);
  }, []);

  useEffect(() => {
    setFavouritesList(
      enteredUserName == "SystemAdmin"
        ? favoutites?.items
        : favoutites?.items?.filter((item: any) => {
            return item?.noteNameAr != "عرض الأخبار";
          })
    );
  }, [favoutites]);
  let enteredUserName = JSON.parse(
    localStorage.getItem("user") as string
  )?.username;
  const [getCardsList, setCardsList] = useState([
    //Dynamic - My Tools
    {
      id: 0,
      name: intl.formatMessage({ id: "SystemName1" }),
      dept: intl.formatMessage({ id: "ManagementName" }),
      title: intl.formatMessage({ id: "CardName1" }),
      icon: <i className="fad fa-window-restore fs-3x"></i>,
      subIcon: <i className="bi bi-tools"></i>,
      subTitle: intl.formatMessage({ id: "CardDes1" }),
      count: "",
      lastUpdate: "20/04/2022",
      lastLogin: "25/03/2022",
      link: "#",
      color: "svg-icon-success",
      background: "bg-light-success",
      isShow: true,
      workspaceKey: 0,
    },
    //System Tools
  ]);
  const [myWorkspaces, setMyWorkspace] = useState([
    {
      id: "",
      noteNameAr: "",
      noteNameEn: "",
      parentNoteNameAr: "",
      parentNoteNameEn: "",
      url: "",
      description: "",
      icon: "",
      color: 0,
      state: 0,
      isActive: true,
      visitDate: "",
      lastUpdate: "",
      organizationHierarchyId: "",
      noteTypeId: "",
      parentId: "",
      orgNameAr: "",
      orgNameEn: "",
      isChecked: false,
      workspaceKey: 0,
    },
  ]);
  const [getMyToolsList, setMyToolsList] = useState<MyComponentsModel[]>([]);

  useEffect(() => {
    let myWorkspace: any = workspace?.items?.map((it) => {
      let check = hiddenWorkspace?.items?.findIndex(
        (tt) => tt.workspaceId == it.id
      );
      if (check < 0) {
        return { ...it, isChecked: true };
      } else {
        // if want to hide cards return isChecked false
        return { ...it, isChecked: true };
      }
    });

    let myWorkspaceToolBox: any =
      enteredUserName == "SystemAdmin"
        ? myWorkspaceInToolBox?.map((component: MyComponentsModel) => {
            let check = hiddenWorkspace?.items?.findIndex(
              (item) => item.workspaceId == component.id
            );
            if (check < 0) {
              return { ...component, isChecked: true };
            } else {
              // if want to hide cards return isChecked false
              return { ...component, isChecked: true };
            }
          })
        : myWorkspaceInToolBox
            ?.filter((item) => {
              return item?.noteNameAr !== "عرض الأخبار";
            })
            ?.map((component: MyComponentsModel) => {
              let check = hiddenWorkspace?.items?.findIndex(
                (item) => item.workspaceId == component.id
              );
              if (check < 0) {
                return { ...component, isChecked: true };
              } else {
                return { ...component, isChecked: false };
              }
            });

    setMyToolsList(myWorkspaceToolBox);

    setMyWorkspace(myWorkspace);
  }, [workspace?.items, hiddenWorkspace?.items]);

  const [getFavouritesList, setFavouritesList] = useState<any[]>([]);

  const removeFromCardList = (id: any, isShow: any) => {
    if (!isShow) {
      let body = {
        workspaceId: id,
      };
      dispatch(postHiddenWorkspaces(body) as any);
    } else {
      dispatch(deleteHiddenWorkspaces(id) as any);
    }
    const index = myWorkspaces?.findIndex((item) => item.id == id);
    const newCardList = [...myWorkspaces];
    newCardList[index] && (newCardList[index].isChecked = isShow);
    setMyWorkspace(newCardList);
  };

  const handleHideCard = (cardId: any) => {
    removeFromCardList(cardId, true);
    const updatedCardsList = getCardsList?.map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          isShow: false,
        };
      }
      return card;
    });

    setCardsList(updatedCardsList);
    const updatedToolaList: any = getMyToolsList?.map((tool: any) => {
      if (tool.id === cardId) {
        return {
          ...tool,
          isChecked: false,
        };
      }
      return tool;
    });
    setMyToolsList(updatedToolaList);
  };

  let handleFavouriteCard = (cardId: any) => {
    setFavouritesList((prevList) => {
      return prevList?.map((prevItem) =>
        prevItem.workspaceId === cardId
          ? {
              ...prevItem,
              isChecked: !prevItem.isChecked,
            }
          : prevItem
      );
    });
  };

  let [favorite, setFavourite] = useState(
    getFavouritesList?.map((item) => ({
      [`id${item.workspaceId}`]: false,
    }))
  );
  const handleHideTable = (tableId: any) => {
    const updatedTableList = getTableList?.map((table) => {
      if (table.id === tableId) {
        return {
          ...table,
          isShow: false,
        };
      }
      return table;
    });

    setTableList(updatedTableList);
    const updatedToolaList: any = getMyToolsList?.map((tool: any) => {
      if (tool.id === tableId) {
        return {
          ...tool,
          isChecked: false,
        };
      }
      return tool;
    });
    setMyToolsList(updatedToolaList);
  };
  let handleFavouriteTable = (tableId: any) => {
    setFavouritesList((prevList) => {
      return prevList?.map((prevItem) =>
        prevItem.workspaceId === tableId
          ? {
              ...prevItem,
              isChecked: !prevItem.isChecked,
            }
          : prevItem
      );
    });
  };
  const [getTableList, setTableList] = useState([
    //Dynamic - My Tools
    {
      id: 0,
      name: intl.formatMessage({ id: "SystemName1" }),
      dept: intl.formatMessage({ id: "ManagementName" }),
      title: intl.formatMessage({ id: "CardName1" }),
      icon: <i className="fad fa-window-restore fs-2x"></i>,
      subIcon: <i className="bi bi-tools"></i>,
      subTitle: intl.formatMessage({ id: "CardDes1" }),
      count: "",
      lastUpdate: "20/04/2022",
      lastLogin: "25/03/2022",
      link: "#",
      color: "svg-icon-info",
      background: "bg-light-info",
      isShow: true,
    },
    //System Tools
  ]);


  function onDragEnd(result: any) {
    let { source, destination, type } = result;
    // steps for reorder
    // if no destination nothing will be happened
    if (!result.destination) {
      return;
    }

    // if the same dropable and source index equal to destination index nothing will be happened
    if (
      source.index == destination.index &&
      source.draggableId == destination.draggableId
    ) {
      return;
    }
    let reorderState = [...getCardsList];
    let sourceIndex = source.index;
    let destinationIndex = destination.index;
    let [removedItems] = reorderState.splice(sourceIndex, 1);
    reorderState.splice(destinationIndex, 0, removedItems);
    return setCardsList(reorderState);
  }
  useEffect(() => {
    if (myWorkspaces?.length > 0) {
      setFilteredCards(myWorkspaces);
    } else {
      setFilteredCards([]);
    }
  }, [getMyToolsList, myWorkspaces]);

  const Search = (e: any) => {
    var filtered = myWorkspaces?.filter((x: any) =>
      SystemLang() == "ar"
        ? x.noteNameAr.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.parentNoteNameAr
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        : x.noteNameEn.toLowerCase().includes(e.target.value.toLowerCase()) ||
          x.parentNoteNameEn
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
    );
    setFilteredCards([...filtered]);
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    if (userCardsByRolesWorkspace?.length > 0) {
      setFilteredCardsFilter(userCardsByRolesWorkspace);
    } else {
      setFilteredCardsFilter([]);
    }
  }, []);


  const checkedCards = filteredCards.filter(
    (card: { isChecked: boolean }) => card.isChecked === true
  );

  return (
    <>
      <div
        className="container toolbar py-4 py-lg-15 px-6 d-flex  align-items-center justify-content-between"
        id="kt_toolbar"
      >
        <WorkSpaceToolbar1 workspace={workspace} />
        <div
          id="kt_toolbar_container"
          className=" d-flex justify-content-between align-items-center p-0"
        >

          <div className="d-flex align-items-center flex-column w-md-300px w-100">
            <div className="position-relative  w-100">
              <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                <KTSVG
                  path="/media/icons/duotune/general/gen065.svg"
                  className="text-white fs-2"
                />
              </span>
              <input
                type="text"
                className="form-control form-control-solid ps-10 input-placeholder text-white"
                name="search"
                placeholder={intl.formatMessage({
                  id: "SearchWorkspace",
                })}
                value={searchKey}
                onChange={(e) => {
                  Search(e);
                }}
              />
            </div>

            <div
          className={`d-flex align-items-center w-100 text-white mt-1 ${intl.locale == "ar" ? "justify-content-end" : "justify-content-start"}`}>
          {intl.formatMessage({ id: "TotalServices" })}: {checkedCards?.length}
        </div>
            
          </div>
        </div>

        
      </div>

      <div
        className="flex-lg-row-fluid"
        data-select2-id="select2-data-129-tmo1"
      >
        <div className="tab-content">
          <div
            id="kt_project_users_card_pane"
            className="tab-pane fade active show"
          >
            <div className="container">
        
              {filteredCards?.length ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <div
                    className="row card-deck gap-10 "
                    style={{ minHeight: "45vh" }}
                  >
                    {enteredUserName == "SystemAdmin"
                      ? filteredCards?.map((card: any, index: any) =>
                          card.isChecked ? (
                            <Fragment key={card?.id}>
                              <Droppable droppableId={`droppable_${card.id}`}>
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="card mb-4"
                                  >
                                    <Draggable
                                      key={card.id}
                                      draggableId={card.id.toString()}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          className=""
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          {" "}
                                          <WorkspaceCard
                                            index={index}
                                            id={card.id}
                                            workspaceKey={card.workspaceKey}
                                            name={
                                              intl.locale == "ar"
                                                ? card.parentNoteNameAr
                                                : card.parentNoteNameEn
                                            }
                                            dept={
                                              intl.locale == "ar"
                                                ? card.orgNameAr
                                                : card.orgNameEn
                                            }
                                            title={
                                              intl.locale == "ar"
                                                ? card.noteNameAr
                                                : card.noteNameEn
                                            }
                                            titleAr={card.noteNameAr}
                                            titleEn={card.noteNameEn}
                                            icon={card.icon as any}
                                            subIcon={card.icon as any}
                                            subTitle={card.description}
                                            count={""}
                                            lastUpdate={card.lastUpdate}
                                            lastLogin={card.visitDate}
                                            link={card.url}
                                            color={card.color.toString()}
                                            background={card.color.toString()}
                                            isShow={true}
                                            handleHideCard={handleHideCard}
                                            handleFavouriteCard={
                                              handleFavouriteCard
                                            }
                                            getFavouritesList={
                                              getFavouritesList
                                            }
                                            setFavouritesList={
                                              setFavouritesList
                                            }
                                            favorite={favorite}
                                            setFavourite={setFavourite}
                                            subSystemId={subSystemId}
                                            card={card}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </Fragment>
                          ) : null
                        )
                      : filteredCards?.map((card: any, index: any) =>
                          card.isChecked ? (
                            <Fragment key={card?.id}>
                              <Droppable droppableId={`droppable_${card.id}`}>
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="card mb-4"
                                  >
                                    <Draggable
                                      key={card.id}
                                      draggableId={card.id.toString()}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          className=""
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          {" "}
                                          <WorkspaceCard
                                            index={index}
                                            id={card.id}
                                            workspaceKey={card.workspaceKey}
                                            name={
                                              intl.locale == "ar"
                                                ? card.parentNoteNameAr
                                                : card.parentNoteNameEn
                                            }
                                            dept={
                                              intl.locale == "ar"
                                                ? card.orgNameAr
                                                : card.orgNameEn
                                            }
                                            title={
                                              intl.locale == "ar"
                                                ? card.noteNameAr
                                                : card.noteNameEn
                                            }
                                            icon={card.icon as any}
                                            subIcon={card.icon as any}
                                            subTitle={card.description}
                                            count={""}
                                            lastUpdate={card.lastUpdate}
                                            lastLogin={card.visitDate}
                                            link={card.url}
                                            color={card.color.toString()}
                                            background={card.color.toString()}
                                            isShow={true}
                                            handleHideCard={handleHideCard}
                                            handleFavouriteCard={
                                              handleFavouriteCard
                                            }
                                            getFavouritesList={
                                              getFavouritesList
                                            }
                                            setFavouritesList={
                                              setFavouritesList
                                            }
                                            favorite={favorite}
                                            setFavourite={setFavourite}
                                            card={card}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </Fragment>
                          ) : null
                        )}
                  </div>
                </DragDropContext>
              ) : (
                <div className="flex pt-20" style={{ minHeight: "45vh" }}>
                  <h2 className="text-center text-muted mt-20 ">
                    {intl.formatMessage({ id: "NotExist" })}
                  </h2>
                </div>
              )}
            </div>
          </div>

          <div id="kt_project_users_table_pane" className="tab-pane fade ">
            <div className="card card-flush">
              <div className="card-body pt-0">
                <div className="table-responsive">
                  <table
                    id="kt_project_users_table"
                    className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder"
                  >
                    <thead className="fs-7 text-gray-400 text-uppercase">
                      <tr>
                        <th className="min-w-250px">
                          {intl.formatMessage({ id: "Servicename" })}
                        </th>
                        <th className="min-w-90px">
                          {intl.formatMessage({ id: "Management" })}
                        </th>
                        <th className="min-w-90px">
                          {intl.formatMessage({ id: "LastUpdate" })}
                        </th>
                        <th className="min-w-90px">
                          {intl.formatMessage({ id: "LastLogin" })}
                        </th>
                        <th className="min-w-50px text-end">
                          {intl.formatMessage({ id: "Details" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="fs-6">
                      {getTableList?.map((table) => (
                        <WorkspaceTable
                          key={table?.id}
                          id={table.id}
                          name={table.name}
                          dept={table.dept}
                          title={table.title}
                          icon={table.icon as any}
                          count={table.count}
                          lastUpdate={table.lastUpdate}
                          lastLogin={table.lastLogin}
                          link={table.link}
                          color={table.color}
                          background={table.background}
                          isShow={table.isShow}
                          getFavouritesList={getFavouritesList}
                          setFavouritesList={setFavouritesList}
                          favorite={favorite}
                          setFavourite={setFavourite}
                          handleHideTable={handleHideTable}
                          handleFavouriteTable={handleFavouriteTable}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};
export { CommitteesWorkSpace };
