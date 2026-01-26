import { object, string, InferType } from "yup";

export const AddExternalMemberSchema = object({
  name: string().required("InputFieldIsRequried"),
  email: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "InputFieldIsRequried"
    ),
  commissionName: string().required("InputFieldIsRequried"),
  // phoneNumber: string().notRequired()
  //   .matches(
  //     /^(5)([0-9]{8})$/,
  //     "InvalidPhone"
  //   ),
  phoneNumber: string().notRequired(),
  jobName: string().required("InputFieldIsRequried"),
  permissionId: string().notRequired(),
});

export type AddExternalMemberProps = InferType<typeof AddExternalMemberSchema>;
