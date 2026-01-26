import { object, string, InferType } from "yup";

export const EditExternalMemberSchema = object({
  name: string().required("InputFieldIsRequried"),
  permissionId: string().required("InputFieldIsRequried"),
});

export type EditExternalMemberProps = InferType<
  typeof EditExternalMemberSchema
>;
