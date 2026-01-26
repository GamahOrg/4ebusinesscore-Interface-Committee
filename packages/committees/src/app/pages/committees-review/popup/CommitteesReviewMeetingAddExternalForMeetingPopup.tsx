import React, { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddExternalMemberProps,
  AddExternalMemberSchema,
} from "../../../validations/add-external-member-validation";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
type AddPopupProps = {
  show: boolean;
  handleClose: any;
  setExternalMembers?: any;
  externalMembers?: any;
};
const CommitteesReviewMeetingAddExternalForMeeting: React.FC<AddPopupProps> = ({
  show,
  handleClose,
  setExternalMembers,
}) => {
  const intl = useIntl();
  let language: string = intl.locale;

  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
          width: "100%",
          textAlign: language == "ar" ? "right" : "left",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: language == "ar" ? "right" : "left",
          }}
        >
          {error
            ? intl.formatMessage({
                id: error,
              })
            : ""}
        </p>
      </div>
    );
  };
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddExternalMemberProps>({
    resolver: yupResolver(AddExternalMemberSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPermissions({}) as any);
  }, []);
  let permissions = useAppSelector((state) => {
    return state?.permissions?.permissions;
  });
  const committeeDetails = useAppSelector((state: RootState) => {
    return state?.committees?.committee;
  });
  let membersEmails=committeeDetails?.allExternalMembersDtos?.map((member)=>{return member?.email})?.concat(committeeDetails?.allInternalMembersDtos?.map((member)=>{return member?.email}))
  let handleAddExternalMember = (formValues: AddExternalMemberProps) => {
  if(membersEmails?.includes(formValues?.email)){
  showSuccessAlert(
    false,
    "MemberIsAlreadyFoundInThisCommittee",
    intl
  );
  }
  else {
    setExternalMembers((prev) => {
      return [
        ...prev,
        {
          id: (Math.random() * 1000).toString(),
          name: formValues?.name,
          destinationName: formValues?.commissionName,
          email: formValues?.email,
          permissionId:"3567bde2-03f2-4586-4717-08dd04a1c7f7",
          job:formValues?.jobName
        },
      ];
    });
    showSuccessAlert(
      true,
      "AddedSuccessfully",
      intl
    );
  }
    handleClose()
    reset()
  };
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} size="lg" centered>
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
                      id: "AddSpecialistForCommittee",
                    })}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })} :
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(handleAddExternalMember)}>
            <Modal.Body className="pb-0 mx-4">
              <div className="row">
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label
                    className="fs-6 fw-bold mb-2 form-label required"
                    htmlFor="outputName"
                  >
                    {intl.formatMessage({ id: "Name" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="special bi bi-person-circle"></i>
                      </span>
                    </div>
                    <input
                      id="outputName"
                      {...register("name")}
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({ id: "Name" })}
                    />
                    {DisplayErrorMessage(errors?.name?.message, intl)}
                  </div>
                </div>
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="outputName"
                    className="form-label px-2 fontSz-6 required"
                  >
                    {intl.formatMessage({ id: "Email" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa-regular fa-envelope special"></i>
                      </span>
                    </div>
                    <input
                      id="outputName"
                      {...register("email")}
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({ id: "Email" })}
                    />
                    {DisplayErrorMessage(errors?.email?.message, intl)}
                  </div>
                </div>
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label
                    className="fs-6 fw-bold mb-2 form-label required"
                    htmlFor="outputName"
                  >
                    {intl.formatMessage({ id: "CommisionName" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-users-cog special"></i>
                      </span>
                    </div>
                    <input
                      id="outputName"
                      {...register("commissionName")}
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({
                        id: "CommisionName",
                      })}
                    />
                    {DisplayErrorMessage(errors?.commissionName?.message, intl)}
                  </div>
                </div>
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label
                    className="fs-6 fw-bold mb-2 form-label required"
                    htmlFor="outputName"
                  >
                    {intl.formatMessage({ id: "Function-Position" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-briefcase special"></i>
                      </span>
                    </div>
                    <input
                      id="outputName"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({
                        id: "Function-Position",
                      })}
                      {...register("jobName")}
                    />
                    {DisplayErrorMessage(errors?.jobName?.message, intl)}
                  </div>
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
                    <button
                      className="btn btn-success mx-1 text-center w-100"
                      type="submit"
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CommitteesReviewMeetingAddExternalForMeeting;
