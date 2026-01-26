export class CommitteeTimeTableModel {
  id: string;
  rules: string;
  date: Date;
  constructor(id: string = "", rules: string = "", date: Date = new Date()) {
    this.id = id;
    this.rules = rules;
    this.date = date;
  }
}
