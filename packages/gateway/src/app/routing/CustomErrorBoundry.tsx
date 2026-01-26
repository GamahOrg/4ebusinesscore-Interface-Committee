import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Swal from "sweetalert2";
// import { useIntl } from "react-intl";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  //   let intl = useIntl();
  Swal.fire({
    icon: "error",
    title: "حدث خطا",
    text: "يرجي الرجوع لفريق الدعم",
    confirmButtonText: "حاول مجددا في وقت لاحق",
    allowOutsideClick: false,
  }).then((result) => {
    if (result?.isConfirmed) {
      window.location.href = `${
        (window as any)._env_?.PUBLIC_URL
      }/legal-workspace`;
    } else {
    }
    // window.location.href="/home-workspace"
  });

  return null;
};

const CustomErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
    {children}
  </ReactErrorBoundary>
);

export default CustomErrorBoundary;
