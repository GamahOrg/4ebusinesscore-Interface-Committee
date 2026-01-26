import React from 'react'
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
export default function showSuccessOrFailureAlert(text: any, icon: any) {
  const intl =useIntl();
  return (
    Swal.fire({
      text: intl.formatMessage({ id: text }),
      icon: icon,
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: `btn btn-${icon !== "error" ? "primary" : "danger"}`,
      },
    })
  )
}




