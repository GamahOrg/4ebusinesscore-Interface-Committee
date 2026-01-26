import { object, string, InferType, number } from "yup";
export const requestTemplateSchema = object({
  name: string().required("InputFieldIsRequried"),
  actionOptions: number(),
  requestCategoryId: string().typeError("InputFieldIsRequried"),
  parentRequestTemplateId: string().typeError("InputFieldIsRequried"),
  numOfSteps:number().moreThan(0).typeError("InputFieldIsRequried"),
});

export type requestTemplateSchemaProps = InferType<typeof requestTemplateSchema>;
