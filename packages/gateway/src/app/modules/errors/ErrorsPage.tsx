/* eslint-disable jsx-a11y/anchor-is-valid */
import { Route, Routes, Outlet } from "react-router-dom";
import { Error500 } from "./components/Error500";
import { Error404 } from "./components/Error404";
import { Footer } from "../../layout/components/Footer";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../helpers";

const ErrorsLayout = () => {
  const intl = useIntl();

  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
        style={{
          backgroundImage: `url('${toAbsoluteUrl(
            "/media/illustrations/progress-hd.png"
          )}')`,
        }}
      >
        <div className="d-flex flex-column flex-column-fluid text-center p-10 py-lg-20">
          <div
            onClick={async () => {
              await localStorage.removeItem("user");
              window.location.href = "/auth/login";
              // navigate("/auth/login");
            }}
            className="mb-10 pt-lg-5 cursor-pointer"
          >
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/theme-img/logo-header-wt-ar.webp")}
              className="logo-default h-70px"
            />
          </div>
          <div className="pt-lg-5 mb-10">
            <Outlet />
            <div className="text-center">
              <div
                onClick={async () => {
                  await localStorage.removeItem("user");
                  window.location.href = "/auth/login";
                  // navigate("/auth/login");
                }}
                className="btn btn-lg btn-primary fw-bolder mt-20"
              >
                {intl.formatMessage({ id: "BackToLogin" })}
              </div>
            </div>
          </div>
          <div
            className="
          d-flex
          flex-row-auto
          bgi-no-repeat
          bgi-position-x-center
          bgi-size-contain
          bgi-position-y-bottom
          min-h-100px min-h-lg-350px
        "
            style={{
              backgroundImage: `url('${toAbsoluteUrl(
                "/media/illustrations/sketchy-1/17.png"
              )}')`,
            }}
          ></div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path="404" element={<Error404 />} />
      <Route path="500" element={<Error500 />} />
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
);

export default ErrorsPage;
