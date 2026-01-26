import Swal from "sweetalert2";

export const showSuccessAlert = (
  status: boolean = true,
  text: string | string[] = "",
  intl: any,
  callBack = () => {}
) => {
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
    },
  }).then((res) => {
    callBack();
  });
};
