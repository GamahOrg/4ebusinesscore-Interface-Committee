import React, { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { deleteRequestTemplate, fetchAllRequestTemplateBycategoryId } from '../../../features/requestTemplate/requestTemplateSlice';
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

type DeletePopupProps = {
  id?: any;
  handleCloseDelete?: any;
  showDelete: any;
};

export const DeleteRequestTemplatePopup: FC<DeletePopupProps> = ({
  id,
  showDelete,
  handleCloseDelete,
}) => {
  const intl = useIntl();
  // const [message, setMessage] = useState<string>("");
  const showSuccessAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "DeletedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  
  const handleDelete = () => {
    dispatch(deleteRequestTemplate(id) as any).then((res:any)=>{
      if(res?.payload?.statusEnum===1){
         handleCloseDelete()
        showSuccessAlert()
       let myparams: any = {
             pageSize: searchParams.get("pageSize"),
             pageNumber: searchParams.get("pageNumber"),
           };
             dispatch(
               fetchAllRequestTemplateBycategoryId({
                 id: id as string,
                 myparams,
               }) as any
             );
           
      }
    })
  };

  // useEffect(()=>{
  // if(message=="The Request Template Has Been Deleted"){
  //   handleCloseDelete()
  //   showSuccessAlert()
  //   let params: any = {
  //     pageSize: searchParams.get("pageSize"),
  //     pageNumber: searchParams.get("pageNumber"),
  //   };
  //   dispatch(getRequestTemplate(params) as any);
  // }
  // return ()=>{setMessage("")}
  // },[message])
  return (
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <Modal centered show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center my-5 pb-4">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmDeletion" })}</h3>
            </div>
          </Row>

          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>
                {intl.formatMessage({ id: "AreYouSureToDeleteThisItem" })}
              </h5>
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-center py-2">
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto my-2 pb-2">
              <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-3 w-100"
                    onClick={handleCloseDelete}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <div
                  onClick={() => handleDelete()}
                    className="  btn btn-danger me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Delete" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Deleting" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
