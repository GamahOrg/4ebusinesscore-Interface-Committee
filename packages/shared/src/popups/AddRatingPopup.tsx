import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";

type PopupProps = {
  show: boolean;
  handleClose: any;
  setStars?: any;
};
export const AddRatingPopup: FC<PopupProps> = ({
  show,
  handleClose,
  setStars,
}) => {
  const intl = useIntl();
  const [rating, setRating] = useState(0);
  const showSuccessAlert = () => {
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

  const buildStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass =
        i <= rating ? "bi bi-star-fill text-warning fa-3x" : "bi bi-star fa-3x";
      stars.push(
        <i key={i} className={starClass} onClick={() => setRating(i)}></i>
      );
    }

    return stars;
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className="card">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <Row className="justify-content-center mt-5 mb-10">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="text-center">
                  <h2> {intl.formatMessage({ id: "AddReview" })}</h2>
                  <p className="text-muted">
                    {intl.formatMessage({
                      id: "PleaseAddReview",
                    })}
                  </p>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>

        <Row className="d-inline-block m-auto pb-5">{buildStars()}</Row>

        <Modal.Body className="pb-0 mx-4">
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto mb-20 mt-5">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="submit"
                    onClick={() => {
                      setStars(rating);
                      handleClose();
                      showSuccessAlert();
                    }}
                    data-bs-dismiss="modal"
                    className="  btn btn-success me-5 w-50 "
                  >
                    <span className="indicator-label">
                      {" "}
                      {intl.formatMessage({ id: "ADD" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "ADD" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};
