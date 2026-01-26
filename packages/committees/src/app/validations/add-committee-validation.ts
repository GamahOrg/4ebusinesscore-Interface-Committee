import { object, string, InferType, number,boolean } from "yup";

export const AddCommitteeSchema = object({
  Name: string().required("InputFieldIsRequried"),
  CommitteeTime: number()
    .required("InputFieldIsRequried")
    .min(0, "InputFieldIsRequried"),
  CommitteeDate: string().nullable().required("InputFieldIsRequried"),
  // .typeError("InputFieldIsRequried"),
  // .test({
  //   name: "CommitteeDate",
  //   message: "TheDateMustBeTodayOrTheDayAfterToday",
  //   test: function (value: any) {
  //     const today = new Date();
  //     const startDate = new Date(value);
  //     const differenceInMillis = startDate.getTime() - today.getTime();
  //     const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
  //     return differenceInDays >= -1;
  //   },
  // })
  // .test({
  //   name: "CommitteeDate",
  //   message: "TheDateMustBeTodayOrTheDayAfterToday",
  //   test: function (value: any) {
  //     const today = new Date();
  //     const startDate = new Date(value);
  //     const oneYearFromNow = new Date(today);
  //     oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  //     const isBeforeOrEqualOneYearFromNow = startDate <= oneYearFromNow;
  //     return isBeforeOrEqualOneYearFromNow;
  //   },
  // }).test({
  //   name: "CommitteeDate",
  //   message: "TimeMustBeGreaterThanNow",
  //   test: function (value: any) {
  //     const now = new Date();
  //     const inputTime = new Date(value);
  //     return inputTime.getTime() > now.getTime();
  //   },
  // }),
  ProjectName:string().when("CommitteeTime", {
    is: 2,
    then: string().required("InputFieldIsRequried"),
  }),
  CommitteeFinishDate:string().nullable().when("CommitteeTime", {
    is: 1,
    then: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried")
    .test({
      name: "CommitteeFinishDate",
      message: "CommitteeFinishDateIsAfterOrEqualOneYearFromNow",
      test: function (value: any) {
        const today = new Date();
        const startDate = new Date(value);
        const differenceInMillis = startDate.getTime() - today.getTime();
        const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
        return differenceInDays >= -1;
      },
    }).test({
      name: "CommitteeFinishDate",
      message: "CommitteeFinishDateMustBeAfterCommitteeEstablishmentDate",
      test: function (value: any) {
        const CommitteeDate = new Date(this.parent.CommitteeDate);
        const CommitteeFinishDate= new Date(value);
        const differenceInMillis = CommitteeFinishDate.getTime() - CommitteeDate.getTime();
        const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
        return differenceInDays >= 2;
      },
    }),
  }),
  // Description: string().required("InputFieldIsRequried"),
  WorkRule: string().notRequired(),
  HasLegalDocument:boolean(),
  LegalDocument: string().when("HasLegalDocument", {
    is: true,
    then: string().required("InputFieldIsRequried"),
  }),
  Missions: string()
  .required("InputFieldIsRequried")
  .test("not-only-whitespace", "InputFieldIsRequried", (value) => {
    return value?.trim()?.length > 0  ;
  })
});

export type AddCommitteeProps = InferType<typeof AddCommitteeSchema>;
