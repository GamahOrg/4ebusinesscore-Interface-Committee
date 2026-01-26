import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import OutputMeetingsDropDown from "../components/OutputMeetingsDropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getMeetings } from "../../../features/meeting/meetingSlice";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

type AddPopupProps = {
  show: boolean;
  handleClose: any;
  setMeetingIds?: any;
  id?: string;
  register?: any;
  meetingIds?: any;
};
const CommitteesReviewMeetingAddMeetingToOutput: React.FC<AddPopupProps> = ({ show, handleClose, setMeetingIds, id, register, meetingIds }) => {
  const intl = useIntl();

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

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const getSearchQuery = (value) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    if (id) {
      dispatch(getMeetings(id) as any);
    }
  }, [dispatch, id]);

  const Meetings = useSelector((state: RootState) => {
    return state?.meetings?.meetings;
  });
  let [searchedMeetings, setSearchedMeetings] = useState<any[]>([]);
  useEffect(() => {
    if (searchQuery) {
      setSearchedMeetings(
        Meetings?.filter((item) => {
          return item?.name?.includes(searchQuery);
        })
      );
    } else {
      setSearchedMeetings(Meetings);
    }
  }, [searchQuery]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
      >
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header mt-10 d-flex justify-content-center align-items-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 ">
                    {intl.formatMessage({
                      id: "AddASpecialistToTheMeeting",
                    })}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">{intl.formatMessage({ id: "PleaseEnterTheData" })}</span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>

          <form>
            <Modal.Body className="pb-0">
              <div className="d-flex align-items-center justify-content-between w-100 pt-5">
                <div className="card-body py-3">
                  <div className="position-relative w-md-400px ms-md-0">
                    <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                      <KTSVG path="/media/icons/duotune/general/gen065.svg" />
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-solid ps-10"
                      name="search"
                      onChange={(e) => {
                        getSearchQuery(e.target.value);
                      }}
                      placeholder={intl.formatMessage({
                        id: "SearchWithMeetingName",
                      })}
                      value={searchQuery}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-5 pb-5">
                  <label className="fs-6 fw-bold mb-2 form-label my-2" htmlFor="ChooseTheSession">
                    {intl.formatMessage({ id: "ChooseTheSession" })}
                  </label>
                  <OutputMeetingsDropDown selectedOptions={meetingIds} setSelectedOptions={setMeetingIds} options={searchedMeetings} register={register} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center pb-3 pt-1 border-top-0">
              <div className="col-12 col-lg-7 mx-auto mb-10">
                <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      className="btn btn-secondary mx-1 text-center w-100"
                      onClick={handleClose}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <div
                      className="btn btn-success mx-1 text-center w-100"
                      onClick={() => {
                        handleClose();
                        showSuccessAlert();
                      }}
                    >
                      {intl.formatMessage({ id: "Save" })}
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CommitteesReviewMeetingAddMeetingToOutput;
