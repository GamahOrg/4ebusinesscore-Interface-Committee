import { object, string, InferType, number, mixed } from "yup";

export const AddProceedingSchema = object({
  Name: string().required("InputFieldIsRequried"),
  Notes: string().required("InputFieldIsRequried"),
  Date: string().required("RequiredInputField"),
  attachments: mixed()
    .notRequired()
    .test("fileSize", "theFileIsTooLarge", function (value) {
      if (value && value.length && value.length > 0) {
        return value[0].size <= 20000000;
      } else return true;
  }),
});

export type AddProceedingProps = InferType<typeof AddProceedingSchema>;
