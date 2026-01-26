interface DepartmentPercentage {
  department: string;
  percentage: number;
}

export  interface MembersIndicatorModel {
    totalMembers: number;
    averageMembersPerCommittee: number;
    averageCommitteePerMember: number;
    percentageMembersInMultipleCommittees: number;
    membersByDepartmentPercentage: DepartmentPercentage[];
}


export const  INITIAL_MembersIndicatorModel:  MembersIndicatorModel =  {
    totalMembers: 0,
    averageMembersPerCommittee: 0,
    averageCommitteePerMember: 0,
    percentageMembersInMultipleCommittees: 0,
    membersByDepartmentPercentage: [],
}