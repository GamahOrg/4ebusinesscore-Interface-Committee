export class SlaModelArray {
  data: SlaModel[];
  totalPages: number = 1;
  totalItems: number = 10;

  constructor(data: SlaModel[], totalPages: number, totalItems: number) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class SlaModel {
  id: string;
  itemId: string | null;
  slaName: string;
  implementPeriod: string;
  respondPeriod: string;
  implementDays: number;
  implementHours: number;
  implementMinutes: number;
  respondDays: number;
  respondHours: number;
  respondMinutes: number;
  status: number;
  description: string;
  constructor(
    id: string,
    itemId: string | null,
    slaName: string,
    implementPeriod: string,
    respondPeriod: string,
    implementDays: number,
    implementHours: number,
    implementMinutes: number,
    respondDays: number,
    respondHours: number,
    respondMinutes: number,
    status: number,
    description: string
  ) {
    this.id = id;
    this.itemId = itemId;
    this.slaName = slaName;
    this.implementPeriod = implementPeriod;
    this.respondPeriod = respondPeriod;
    this.implementDays = implementDays;
    this.implementHours = implementHours;
    this.implementMinutes = implementMinutes;
    this.respondDays = respondDays;
    this.respondHours = respondHours;
    this.respondMinutes = respondMinutes;
    this.status = status;
    this.description = description;
  }
}
