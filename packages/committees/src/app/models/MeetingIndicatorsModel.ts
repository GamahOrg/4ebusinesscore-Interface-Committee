interface CommitteeMeeting {
  committeeId: string;
  committeeName: string;
  countOfMeetings: number;
}

export interface MeetingsPerCommitteeModel {

    meetingsPerCommittee: CommitteeMeeting[];
    countOfOutputs: number;
    averageDaysBetweenMeetings: number;
}
