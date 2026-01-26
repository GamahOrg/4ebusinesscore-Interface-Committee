import { object, string, InferType, number } from "yup";

export const EditCommitteeSchema = object({
  Description: string().notRequired(),
  LegalDocument: string().notRequired(),
  Missions: string()
    .required("InputFieldIsRequried")
    .test("not-only-whitespace", "InputFieldIsRequried", (value) => {
      return value?.trim()?.length > 0;
    }),
});

export type EditCommitteeProps = InferType<typeof EditCommitteeSchema>;
