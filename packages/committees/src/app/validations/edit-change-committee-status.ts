import { object, string, InferType, number, mixed } from "yup";

export const EditChangeCommitteeStatusSchema = object({
    notes: string().notRequired(),
});

export type EditChangeCommitteeStatusProps = InferType<typeof EditChangeCommitteeStatusSchema>;