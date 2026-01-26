export class OutputModelArray {
  data: OutputModel[];
  totalPages: number;
  totalItems: number;

  constructor(data: OutputModel[], totalPages: number, totalItems: number) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class OutputModel {
  id: string;
  name: string;
  outputTypeId: string;
  outputTypeNameEn: string;
  outputTypeNameAr: string;
  details: string;
  meetingIds?: string[];
  committeeId?: string;
  attachments?: string[];
  meetings?: [];
  constructor(
    id: string = "",
    name: string = "",
    outputTypeId: string = "",
    outputTypeNameEn: string = "",
    outputTypeNameAr: string = "",
    details: string = "",
    meetingIds: string[] = [],
    committeeId: string = "",
    attachments: string[] = [],
    meetings: [] = []
  ) {
    this.id = id;
    this.name = name;
    this.outputTypeId = outputTypeId;
    this.outputTypeNameEn = outputTypeNameEn;
    this.outputTypeNameAr = outputTypeNameAr;
    this.details = details;
    this.meetingIds = meetingIds;
    this.committeeId = committeeId;
    this.attachments = attachments;
    this.meetings = meetings;
  }
}
