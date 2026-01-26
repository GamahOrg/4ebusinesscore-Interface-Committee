import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { requestPassword } from "../core/_requests";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "../../../partials/functions/language";
import AuthFooter from "./AuthFooter";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import LoginLogoSide from "./LoginLogoSide";

const initialValues = {
  email: "admin@demo.com",
};

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
});

export function ForgotPassword() {
  let [showDropdownContent, setShowDropdownContent] = useState(false);
  let handleShowDropdownContent = () => {
    setShowDropdownContent((prevState) => {
      return !prevState;
    });
  };

  let intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      setTimeout(() => {
        requestPassword(values.email)
          .then(({ data: { result } }) => {
            setHasErrors(false);
            setLoading(false);
          })
          .catch(() => {
            setHasErrors(true);
            setLoading(false);
            setSubmitting(false);
            setStatus("The login detail is incorrect");
          });
      }, 1000);
    },
  });

  return (
    <>
      <div
        className="d-flex flex-column flex-lg-row flex-column-fluid"
      >
        <div
          className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 "
         
        >
          <div
            className="bg-body d-flex  flex-column flex-center rounded-4 w-md-600px p-7 min-h-500px"
          >
            <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
              <div className="d-flex flex-center flex-column flex-column-fluid ">
                <form
                  className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                  noValidate={true}
                  id="kt_password_reset_form"
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="text-center mb-10">
                    <h1 className="text-dark fw-bolder mb-3">
                      {intl.formatMessage({ id: "ForgotPassword" })}
                    </h1>

                    <div className="text-gray-500 fw-semibold fs-7">
                      {intl.formatMessage({
                        id: "EnterYourEmailToResetYourPassword",
                      })}
                    </div>
                  </div>

                  <div className="fv-row mb-8 fv-plugins-icon-container">
                    <input
                      type="text"
                      placeholder={intl.formatMessage({ id: "Email" })}
                      name="email"
                      autoComplete="off"
                      className="form-control bg-light"
                     
                    />

                    <div className="fv-plugins-message-container invalid-feedback"></div>
                  </div>

                  <div
                    className="d-flex flex-wrap justify-content-center pb-lg-0"
                   
                  >
                    <a className="btn btn-light mx-4" href="/auth/login">
                      {intl.formatMessage({ id: "Cancel" })}
                    </a>
                    <button
                      type="button"
                      id="kt_password_reset_submit"
                      className="btn btn-primary me-4"
                    >
                      <span className="indicator-label">
                        {intl.formatMessage({ id: "Submit" })}
                      </span>

                      <span className="indicator-progress">
                        {intl.formatMessage({ id: "PleaseWait" })}
                        ...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <AuthFooter />
          </div>
        </div>
        <div className="d-flex flex-lg-row-fluid">
          <LoginLogoSide/>
        </div>
      </div>
    </>
  );
}
