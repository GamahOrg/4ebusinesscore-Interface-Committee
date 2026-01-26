import { FC, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const WorkspaceDropdown: FC<any> = ({ setShowDropDown, showDropDown }) => {
  const [selectedSysTab, setSelectedSysTab] = useState<any>({});
  const [isChecked, setIsChecked] = useState(false);

  const systemTree: any = useSelector(
    (state: RootState) =>
      state?.subsytemSettingsMainClassificationAggSlice?.items ?? [],
  );

  return (
    <Tab.Container
      id="tabs-example"
      defaultActiveKey={systemTree?.[0]?.id || ""}
    >
      <Row className="p-1 mx-0 h-100" style={{ cursor: "default" }}>
        {!isChecked && (
          <Col sm={3} style={{ height: "585px", overflowY: "auto" }}>
            <Nav
              variant="pills"
              className="flex-column flex-nowrap basic system-dropdown overflow-hidden"
            >
              {systemTree?.map((sysTree: any) => (
                <Nav.Link
                  onClick={() => setSelectedSysTab(sysTree)}
                  key={sysTree?.id}
                  className="fw-bolder pt-4 pb-4 px-2 fs-7 d-flex justify-content-between align-items-center"
                  eventKey={sysTree?.id}
                  active={selectedSysTab?.id === sysTree?.id}
                ></Nav.Link>
              ))}
            </Nav>
          </Col>
        )}
      </Row>
    </Tab.Container>
  );
};

export { WorkspaceDropdown };
