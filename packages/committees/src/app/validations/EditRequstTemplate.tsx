import { object, string, InferType, number } from "yup";
export const editRequstTemplateSchema = object({
  name: string(),
  categoryName: string(),
  requestCategoryTypeName: string(),
  parentName: string(),
  pathCount: number().typeError("InputFieldIsRequried"),
  slaId: string().typeError("InputFieldIsRequried"),
  roleId: string().typeError("InputFieldIsRequried"),
  implementationDays: number().typeError("InputFieldIsRequried"),
  implementationHours: number().typeError("InputFieldIsRequried"),
  implementationMinutes: number().typeError("InputFieldIsRequried"),
  actionTakerId: string().typeError("InputFieldIsRequried"),
  actionTackerType: number().typeError("InputFieldIsRequried"),
  actionTackerName: string().typeError("InputFieldIsRequried"),
  roleName: string().typeError("InputFieldIsRequried"),
});

export type editRequstTemplateSchemaProps = InferType<typeof editRequstTemplateSchema>;


