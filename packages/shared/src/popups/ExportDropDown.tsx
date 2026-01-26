import { FC } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";

const ExportDropDown: FC = () => {
  const intl = useIntl();

  return (
    <Dropdown as={ButtonGroup} dir="rtl">
      <Dropdown.Toggle
        split
        variant="none"
        className="btn btn-primary w-bolder mx-1 text-center mw-100 d-flex align-items-center"
        id="dropdown-custom-2"
      >
        <span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
          <i className="bi bi-download fs-3 ms-2"></i>
        </span>
        {intl.formatMessage({ id: "Export" })}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as="button">
          <div className="d-flex gap-2 align-items-center px-2">
            <input type="checkbox" name="myQ" id="myQ" />
            <label htmlFor="myQ" className="text-gray-500 fw-normal">
              {intl.formatMessage({ id: "ExportAsPDF" })}
            </label>
          </div>
        </Dropdown.Item>
        <Dropdown.Item as="button">
          <div className="d-flex gap-2 align-items-center px-2">
            <input type="checkbox" name="allQ" id="allQ" />
            <label htmlFor="allQ" className="text-gray-500 fw-normal">
              {intl.formatMessage({ id: "ExportAsExcel" })}
            </label>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { ExportDropDown };
