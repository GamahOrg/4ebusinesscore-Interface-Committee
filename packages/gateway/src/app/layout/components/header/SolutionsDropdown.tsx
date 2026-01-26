import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Col, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { KTSVG } from "../../../helpers";
import { SystemPaginationDropdown } from "@4eplatform/shared/components/SystemPaginationDropdown";
import SolutionsSystemsTab from "./SolutionsSystemsTab";
import { GetAllSubSystemSettingsMainClassificationByRowCount } from "../../../features/header/subsytemSettingsMainClassification";

const SolutionsDropdown: FC<any> = ({ setShowDropDown, showDropDown }) => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const [filteredChildSystems, setFilteredChildSystems] = useState<any[]>([]);
  const [selectedSysTab, setSelectedSysTab] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageSize, setPageSize] = useState<any>(24);
  const [pageIndex, setPageIndex] = useState<any>(1);

  useEffect(() => {
    const params = {
      pageSize: searchTerm ? 10000 : pageSize,
      pageNumber: searchTerm ? 1 : pageIndex,
      isVisable: true,
    };
    if (searchTerm) {
      setPageIndex(1);
    }
    dispatch(GetAllSubSystemSettingsMainClassificationByRowCount(params));
  }, [dispatch, pageSize, pageIndex, searchTerm]);

  useEffect(() => {
    if (showDropDown) {
      const params = {
        pageSize: pageSize,
        pageNumber: pageIndex,
        isVisable: true,
      };
      dispatch(GetAllSubSystemSettingsMainClassificationByRowCount(params));
    }
  }, [showDropDown]);

  let solutions = useSelector((state: RootState) => {
    return state?.SubSystemClassificationByRowCount?.items;
  });

  let totalPages = useSelector((state: RootState) => {
    return state?.SubSystemClassificationByRowCount?.pagination?.totalPages;
  });
  let totalItems = useSelector((state: RootState) => {
    return state?.SubSystemClassificationByRowCount?.pagination?.totalItems;
  });

  useEffect(() => {
    const allChildSystems = solutions ?? [];

    const filtered = allChildSystems?.filter((childSys: any) => {
      const childNameEn = childSys?.nameEn?.toLowerCase() || "";
      const childNameAr = childSys?.nameAr?.toLowerCase() || "";

      return (
        childNameEn?.includes(searchTerm) || childNameAr?.includes(searchTerm)
      );
    });
    setFilteredChildSystems(filtered);
  }, [searchTerm, solutions]);

  const renderChildSystems = (sys: any) => {
    const renderSystems = (
      systems: any[],
      noDataMessage: string,
      icon: string,
    ) => (
      <Tab.Content>
        <div className="row mx-0">
          {systems?.length > 0 ? (
            systems?.map(
              (childSys: any) =>
                !childSys?.isHide && (
                  <Tab.Pane
                    className={`col-lg-3 p-0`}
                    style={{ opacity: "1" }}
                    key={childSys?.id}
                    eventKey={selectedSysTab?.id}
                  >
                    <SolutionsSystemsTab
                      selectedSysTab={selectedSysTab}
                      childSys={childSys}
                      setShowDropDown={setShowDropDown}
                    />
                  </Tab.Pane>
                ),
            )
          ) : systems?.length === 0 ? (
            <Tab.Pane
              className={`col-lg-3 p-0`}
              style={{ opacity: "1" }}
              key={selectedSysTab?.id}
              eventKey={selectedSysTab?.id}
            >
              <SolutionsSystemsTab
                selectedSysTab={selectedSysTab}
                intlMsg={intl.formatMessage({ id: noDataMessage })}
                staticIcon={icon}
                setShowDropDown={setShowDropDown}
              />
            </Tab.Pane>
          ) : null}
        </div>
      </Tab.Content>
    );

    if (!searchTerm) {
      return (
        <>{renderSystems(sys || [], "ComingSoon", "fa-solid fa-rocket")}</>
      );
    }

    return (
      <>
        {renderSystems(
          filteredChildSystems || [],
          "NoData",
          "fa-solid fa-database",
        )}
      </>
    );
  };

  useEffect(() => {
    if (solutions?.length > 0) {
      setSelectedSysTab(solutions);
    }
  }, [solutions]);

  return (
    <>
      <Tab.Container
        id="tabs-example"
        defaultActiveKey={solutions?.length > 0 ? solutions[0]?.id : ""}
      >
        <Row className="p-1 mx-0 h-100" style={{ cursor: "default" }}>
          <Col sm={12} style={{ height: "585px", overflowY: "auto" }}>
            <div style={{ minHeight: "525px" }}>
              <div className="d-flex flex-wrap align-items-center pt-2 pb-3 ms-md-0 mx-1 justify-content-center">
                <div className="col-sm-7 col-12 d-flex align-items-center  position-relative">
                  <KTSVG
                    path="/media/icons/duotune/general/gen021.svg"
                    className="svg-icon-1 position-absolute text-muted mx-3"
                  />
                </div>
              </div>
              {renderChildSystems(selectedSysTab)}
            </div>

            {Array.isArray(solutions) && solutions?.length > 0 ? (
              <SystemPaginationDropdown
                totalItems={totalItems}
                totalPages={totalPages}
                pageIndex={pageIndex}
                pageSize={pageSize}
                exceptionPageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
              />
            ) : null}
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export { SolutionsDropdown };
