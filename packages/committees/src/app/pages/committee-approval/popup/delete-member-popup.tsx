import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useAppSelector } from "../../../store/store";
import React from "react";

type DeletePopupProps = {
  id?: string;
  additionalData?: {};
  showDelete?: any;
  handleCloseDelete?: any;
  externalMemberId?: any;
  internalMemberId?: any;
  allMembers?: any;
  setInternalMembers?: any;
  setAllMembers?: any;
  setExternalMembers?: any;
};

export const DeleteMemberPopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
  id = "",
  allMembers,
  setAllMembers,
  setExternalMembers,
  setInternalMembers,
}) => {
  const intl = useIntl();
  let userIds = useAppSelector((state) => {
    return state?.usersAgg?.users?.map((user) => {
      return user?.userId;
    });
  });
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
                    onClick={() => {
                      setAllMembers((prev) => {
                        return prev?.filter((member) => {
                            return member?.id != id;
                          });
                      });
                      setExternalMembers((prev) => {
                        return allMembers
                          ?.filter((member) => {
                            return !userIds?.includes(member?.id);
                          })
                          ?.filter((member) => {
                            return member?.id != id;
                          })
                          ?.map((ele) => {
                            return {
                              name: ele?.name,
                              phoneNumber: ele?.phoneNumber,
                              job: ele?.job,
                              destinationName: ele?.destinationName,
                              email: ele?.email,
                              permissionId: ele?.permissionId,
                            };
                          });
                      });
                      setInternalMembers((prev) => {
                        return prev?.filter((member) => {
                          return member?.memberId !=id;
                        });
                      });
                      showSuccessAlert(true, "DeletedSuccessfully", intl);
                      handleCloseDelete();
                    }}
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
