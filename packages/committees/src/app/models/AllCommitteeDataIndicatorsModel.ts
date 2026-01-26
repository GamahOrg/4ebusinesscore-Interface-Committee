
interface allComittee{
    committeeNumber: number;
  committeeName: string;
  requestStatus: number;
  committeeType: number;
  meetingCount: number;
  proceedingCount: number;
  outputCount: number;
  membersCount: number;
  committeeChairmanName: string;
  committeeSecretaryName: string;
  lastMeetingDate: string;
  missions: string; 
}
export  interface MembersJobIndicatorModel {
allCommittee:allComittee[]
    
}



export const  INITIAL_MembersJobIndicatorModel:  MembersJobIndicatorModel =  {
allCommittee:[]

}