export interface FunctionalData {
  userId: string;
  jobCode: string;
  hiringDate: Date;
  vacation: string;
  lengthOfService: string;
  jobNameNameAr: string;
  jobNameNameEn: string;
  jobDegreeId: string;
  promotion: string;
  org: any;
}

export interface BasicInformationDTO {
  id: string;
  userName: string;
  imageUrl: string;
  email: string;
  nationalId: string;
  fullName: string;
  address: string;
  userGender: number;
  phoneNumber: string;
  birthDate: Date ;
  nationality: string;
  maritalStatus: number;
}

export interface ScientificDataAndExperiences {
  id: string;
  qualificationType: string;
  university: string;
  specialization: string;
  date: Date ;
  scientificExpertise: string;
  attachments: string;
}

export class UserDataModel {
  functionalData: FunctionalData;
  basicInformationDTO: BasicInformationDTO;
  jobHistory: any;
  scientificDataAndExperiences: ScientificDataAndExperiences[];

  constructor(
    functionalData: FunctionalData,
    basicInformationDTO: BasicInformationDTO,
    jobHistory: any,
    scientificDataAndExperiences: ScientificDataAndExperiences[]
  ) {
    this.functionalData = functionalData;
    this.basicInformationDTO = basicInformationDTO;
    this.jobHistory = jobHistory;
    this.scientificDataAndExperiences = scientificDataAndExperiences;
  }
}