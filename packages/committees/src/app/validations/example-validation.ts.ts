import { object, string, InferType, number, boolean, mixed } from "yup";

export const AddExpertBasicInfoSchema = object({
  imgUrl: mixed()
    .required("InputFieldIsRequried"),
    // .test(
    //   "is-image",
    //   "FileMustBeImage",
    //   (value) => value && value.type.startsWith("image/")
    // ),
  firstName: string().required("InputFieldIsRequried"),
  secondName: string().required("InputFieldIsRequried"),
  thirdName: string().required("InputFieldIsRequried"),
  forthName: string().required("InputFieldIsRequried"),
  email: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "InvalidEmail"
    ),
  phoneNumber: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(5|0|3|6|4|9|1|8|7)([0-9]{8})$/,
      "InvalidPhone"
    ),
  nationality: string().notRequired(),
  address: string().notRequired(),
  informationAboutExpert: string().notRequired(),
  birthDate: string()
    .required("InputFieldIsRequried")
    .test("is-over-16", "ExpertMustBeOver16", (value) => {
      const birthDate = new Date(value);
      const sixteenYearsAgo = new Date();
      sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
      return birthDate < sixteenYearsAgo;
    }),
});

export type AddExpertBasicInfoProps = InferType<
  typeof AddExpertBasicInfoSchema
>;
