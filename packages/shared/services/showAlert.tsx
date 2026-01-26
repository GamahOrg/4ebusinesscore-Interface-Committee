import Swal from "sweetalert2";

export const showAlert = (
  status: boolean = true,
  text: string | string[] = "",
  intl: any,
  callBack = () => {}
) => {
  let theme = localStorage.getItem("Theme");
  const formattedText = text
    ? Array.isArray(text)
      ? text.map((msg: string) => intl.formatMessage({ id: msg }))
      : intl.formatMessage({ id: text })
    : null;

  Swal.fire({
    text: status
      ? formattedText
        ? Array.isArray(formattedText)
          ? formattedText.join(", ")
          : formattedText
        : intl.formatMessage({
            id: "ProcessCompleted",
          })
      : formattedText
      ? Array.isArray(formattedText)
        ? formattedText.join(", ")
        : formattedText
      : intl.formatMessage({
          id: "AnErrorOccured",
        }),
    icon: status ? "success" : "error",
    heightAuto: false,
    buttonsStyling: false,
    confirmButtonText: intl.formatMessage({ id: "Agree" }),
    customClass: {
      confirmButton: "btn btn-primary",
      popup:
        theme == "dark"
          ? [
              "swal2-html-container-dark",
              "swal2-success-circular-line-left-dark",
              "swal2-success-circular-line-right-dark",
            ]
          : "",
    },
  }).then((res) => {
    callBack();
  });
};
