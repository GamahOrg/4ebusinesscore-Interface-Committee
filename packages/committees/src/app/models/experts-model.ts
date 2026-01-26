export class ExpertModel {
  id: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  fourthName: string;
  imgUrl: string;
  email: string;
  experiences: ExperienceModel[];
  phoneNumber: number;
  birthDate: string;
  nationality: string;
  specializationId: string;
  address: string;
  informationAboutExpert: string;
  specialization: string;
  orgName: string;
  isExternalExpert?: boolean;
  isChecked?: boolean;
  userId?: string;

  constructor(
    id: number = 0,
    firstName: string = "",
    secondName: string = "",
    thirdName: string = "",
    fourthName: string = "",
    imgUrl: string = "",
    email: string = "",
    experiences: ExperienceModel[] = [],
    phoneNumber: number = 0,
    birthDate: string = "",
    nationality: string = "",
    specializationId: string = "",
    address: string = "",
    informationAboutExpert: string = "",
    specialization: string = "",
    orgName: string = "",
    isExternalExpert: false,
    isChecked: false,
    userId = ""
  ) {
    this.id = id;
    this.firstName = firstName;
    this.secondName = secondName;
    this.thirdName = thirdName;
    this.fourthName = fourthName;
    this.imgUrl = imgUrl;
    this.email = email;
    this.experiences = experiences;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.nationality = nationality;
    this.specializationId = specializationId;
    this.address = address;
    this.informationAboutExpert = informationAboutExpert;
    this.specialization = specialization;
    this.orgName = orgName;
    this.isExternalExpert = isExternalExpert;
    this.isChecked = isChecked;
    this.userId = userId;
  }
}

export class ExperienceModel {
  id: string;
  experienceName: string;
  specializationNameAr: string;
  specializationNameEn: string;
  experienceYears: number;
  specializationId: string;
  jobLocation: string;
  expertId: string;
  constructor(
    id: string = "",
    experienceName: string = "",
    specializationNameAr: string = "",
    specializationNameEn: string = "",
    experienceYears: number = 0,
    specializationId: string = "",
    jobLocation: string = "",
    expertId: string = ""
  ) {
    this.id = id;
    this.experienceName = experienceName;
    this.specializationNameAr = specializationNameAr;
    this.specializationNameEn = specializationNameEn;
    this.experienceYears = experienceYears;
    this.specializationId = specializationId;
    this.jobLocation = jobLocation;
    this.expertId = expertId;
  }
}
