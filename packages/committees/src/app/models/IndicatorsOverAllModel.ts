
 export interface  IndicatorsOverAllModel {
    activeCommittees: number;
    endedCommittees: number;
    disActiveCommittees: number;
    temporaryCommittees: number;
    monthlyCommittees: number;
    averageMembersPerCommittee: number;
    permenantCommittees: number;
};


export const  INITIAL_IndicatorsOverAllModel:  IndicatorsOverAllModel =  {
    activeCommittees: 0,
    endedCommittees: 0,
    disActiveCommittees: 0,
    temporaryCommittees: 0,
    monthlyCommittees: 0,
    averageMembersPerCommittee: 0,
    permenantCommittees: 0,
}