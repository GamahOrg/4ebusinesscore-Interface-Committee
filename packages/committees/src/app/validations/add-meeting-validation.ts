import { object, string, InferType, number ,mixed} from "yup";

export const AddMeetingSchema = object({
  Name:string().required("InputFieldIsRequried"),
    Rules: string().required("InputFieldIsRequried"),
    Location:string().required("InputFieldIsRequried"),
    MeetingDate:string().required("InputFieldIsRequried"),
  // MeetingAttachments:mixed().required("ThisFelidIsRequired"),
    MeetingStatus:number().notRequired(),
    HasExpertAssist:string().notRequired(),
    CommitteeId:string().notRequired(),
    MeetingAttachments:mixed().notRequired(),
});

export type AddMeetingProps = InferType<typeof AddMeetingSchema>;
