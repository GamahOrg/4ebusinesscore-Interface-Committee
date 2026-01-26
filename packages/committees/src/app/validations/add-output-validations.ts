import { string, object, mixed, array } from "yup";

export const addOutputContentValidations = object().shape({
  Name: string().required("ThisFelidIsRequired"),
  // OutputTypeId: string().required("ThisFelidIsRequired"),
  Details: string().required("ThisFelidIsRequired"),
  // MeetingIds: array()
  //   .of(string().required("ThisFelidIsRequired"))
  //   .min(1, "ThisFelidIsRequired")
  //   .typeError("ThisFelidIsRequired"),
  // OutputAttachments: mixed().required("ThisFelidIsRequired"),
});
