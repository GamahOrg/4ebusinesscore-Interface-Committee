import React, { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { PermissionsModel } from "../../../models/permissions-model";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EditExternalMemberProps,
  EditExternalMemberSchema,
} from "../../../validations/edit-external-member-validation";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type PopupProps = {
  id: string;
  show: boolean;
  handleClose: any;
  externalMembers?: any;
  setExternalMembers?: any;
};
const EditMemberDataForMeetingsPopup: React.FC<PopupProps> = ({
  id,
  show,
  handleClose,
  externalMembers,
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
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditExternalMemberProps>({
    resolver: yupResolver(EditExternalMemberSchema),
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
  let selectedMember = externalMembers?.find((member) => {
    return member?.id == id;
  });
  useEffect(() => {
    setValue("name", selectedMember?.name);
    setValue("permissionId", selectedMember?.permissionId);
  }, [selectedMember]);

  let handleEditMember = (id) => {
    setExternalMembers((prev) => {
      return prev?.map((member) => {
        if (member?.id == id) {
          return {
            ...member,
            name: formValues?.name,
            permissionId: formValues?.permissionId,
          };
        } else {
          return member;
        }
      });
    });
    handleClose();
    reset();
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
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 ">
                    {intl.formatMessage({ id: "Edit" })}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })} :
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form>
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
                        <i className="special fas fa-user-circle"></i>
                      </span>
                    </div>
                    <input
                      id="outputName"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({ id: "Name" })}
                      {...register("name")}
                      disabled={selectedMember?.userName ? true : false}
                    />
                    {DisplayErrorMessage(errors?.name?.message, intl)}
                  </div>
                </div>
                <div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="outputName"
                    className="form-label px-2 fontSz-6 required"
                  >
                    {intl.formatMessage({ id: "Permission" })}
                  </label>
                  <select
                    className="form-select form-select-solid"
                    disabled
                    {...register("permissionId")}
                  >
                    {permissions?.filter((ele)=>{return ele?.id=="3567bde2-03f2-4586-4717-08dd04a1c7f7"})?.map((Permission: PermissionsModel) => (
                      <option value={Permission?.id} key={Permission?.id}>
                        {language === "ar"
                          ? Permission?.nameAr
                          : Permission?.nameEn}
                      </option>
                    ))}
                  </select>
                  {DisplayErrorMessage(errors?.permissionId?.message, intl)}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0">
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
                      className="btn btn-primary mx-1 text-center w-100"
                      onClick={() => {
                        handleEditMember(id);
                        handleClose();
                        showSuccessAlert(
                          true,
                          intl.formatMessage({ id: "ModifiedSuccessfully" }),
                          intl
                        );
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
    </Fragment>
  );
};

export default EditMemberDataForMeetingsPopup;
