import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ViewCases {
  show: boolean;
  handleClose: () => void;
  id?: string;
  name?: string;
  type?: string;
}

const ViewCasesInTable = ({ show, handleClose, id, name, type }: ViewCases) => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100">
          <h3 className="mt-5"> {intl.formatMessage({ id: "ViewCases" })}</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row px-4 gy-3 mb-4">
          <div className="d-flex align-items-center mb-2 mb-sm-0 bg-light-primary p-4 rounded-2 fw-bolder">
            <i className="fa-solid fa-circle-user fs-3x text-primary me-3"></i>
            <div>
              {name && <span>{name}</span>}
              {type && (
                <span className="text-gray-500 me-2">
                  ( {intl.formatMessage({ id: type })} )
                </span>
              )}
              <p className="text-muted mt-1 mb-0 cursor-pointer">#3473458</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2 mb-sm-0 mt-6 fw-bolder">
            <div className="d-flex flex-column">
              <span>{intl.formatMessage({ id: "RiyadhLandDispute" })}</span>
              <Link
                to={`/list-of-cases/1`}
                className="text-primary mt-2 mb-0 cursor-pointer"
              >
                #4546546
              </Link>
            </div>
            <div className="bg-light-warning rounded-2 px-5 py-3">
              <span className="text-orange fs-7">
                {intl.formatMessage({ id: "InTheSessions" })}
              </span>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-2 mb-sm-0 mt-0 fw-bolder">
            <div className="d-flex flex-column">
              <span>
                {intl.formatMessage({
                  id: "CondemningToCommitHeinousCrimes",
                })}
              </span>
              <Link
                to={`/list-of-cases/1`}
                className="text-primary mt-2 mb-0 cursor-pointer"
              >
                #4546546
              </Link>
            </div>
            <div className="bg-light-warning rounded-2 px-5 py-3">
              <span className="text-orange fs-7">
                {intl.formatMessage({ id: "InTheSessions" })}
              </span>
            </div>
          </div>
        </div>
      </Modal.Body>

      <div className="modal fade">
        <AddPopup
          show={modalShow}
          handleClose={() => {
            setModalShow(false);
          }}
          handleCloseMainPopup={() => handleClose()}
        />
      </div>
    </Modal>
  );
};

export default ViewCasesInTable;
