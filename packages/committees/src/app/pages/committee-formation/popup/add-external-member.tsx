import React, { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { PermissionsModel } from "../../../models/permissions-model";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddExternalMemberProps,
  AddExternalMemberSchema,
} from "../../../validations/add-external-member-validation";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { v4 as uuid } from "uuid";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
type AddPopupProps = {
  show: boolean;
  handleClose: any;
  allMembers?: any;
  setAllMembers?: any;
  setExternalMembers?: any;
  externalMembers?: any;
};
const AddExternalMember: React.FC<AddPopupProps> = ({
  show,
  handleClose,
  setAllMembers,
  setExternalMembers,
}) => {
  const intl = useIntl();
  const unique_id = uuid();
  let language: string = intl.locale;

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
  let handleAddExternalMember = (formValues: AddExternalMemberProps) => {
    setExternalMembers((prev) => {
      return [
        ...prev,
        {
          id: unique_id,
          name: formValues?.name,
          phoneNumber: formValues?.phoneNumber,
          destinationName: formValues?.commissionName,
          email: formValues?.email,
          permissionId: formValues?.permissionId,
          job:formValues?.jobName
        },
      ];
    });
    setAllMembers((prev) => {
      return [
        ...prev,
        {
          id: unique_id,
          name: formValues?.name,
          email: formValues?.email,
          permissionId: formValues?.permissionId,
          job:formValues?.jobName,
          phoneNumber: formValues?.phoneNumber,
          destinationName: formValues?.commissionName,
          permissionNameAr:permissions?.find((permission)=>{return permission?.id==formValues?.permissionId})?.nameAr,
          permissionNameEn:permissions?.find((permission)=>{return permission?.id==formValues?.permissionId})?.nameEn
        }
      ];
    });
    showSuccessAlert(
      true,
      "AddedSuccessfully",
      intl
    );
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
                      id: "AddExternalMemberForCommittee",
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
                    {DisplayErrorMessage(errors?.name?.message, intl,language)}
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
                    {DisplayErrorMessage(errors?.email?.message, intl,language)}
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
                    {DisplayErrorMessage(errors?.commissionName?.message, intl,language)}
                  </div>
                </div>
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label
                    className="fs-6 fw-bold mb-2 form-label required"
                    htmlFor="outputName"
                  >
                    {intl.formatMessage({ id: "Phone" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">966+</span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="outputName"
                      placeholder="5xxxxxxxx"
                      {...register("phoneNumber")}
                    />
                    {DisplayErrorMessage(errors?.phoneNumber?.message, intl,language)}
                  </div>
                </div>
                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label
                    className="fs-6 fw-bold mb-2 form-label"
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
                    {DisplayErrorMessage(errors?.jobName?.message, intl,language)}
                  </div>
                </div>
                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="stageName"
                    className="form-label px-2  fontSz-6 required"
                  >
                    {intl.formatMessage({ id: "Permission" })}
                  </label>
                  <select
                    className="form-select form-select-solid"
                    {...register("permissionId")}
                  >
                    <option value={-1} selected disabled>
                      {intl.formatMessage({ id: "Choose" })}
                    </option>
                    {permissions?.filter((ele)=>{return ele?.id=="32820481-5dfb-4aa8-b43b-ce3e486928b7"})?.map((Permission: PermissionsModel) => (
                      <option value={Permission?.id} key={Permission?.id}>
                        {language == "ar"
                          ? Permission?.nameAr
                          : Permission?.nameEn}
                      </option>
                    ))}
                  </select>
                  {DisplayErrorMessage(errors?.permissionId?.message, intl,language)}
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
                      type="submit"
                      className="btn btn-success mx-1 text-center w-100"
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

export default AddExternalMember;
