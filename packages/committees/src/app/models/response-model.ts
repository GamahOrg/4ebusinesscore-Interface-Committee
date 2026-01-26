import { ResponseStatus } from "../enums/response-status";

export interface ResponseModel {
  result: {result?:object};
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  message: string;
  statusEnum: ResponseStatus;
}

export interface ResponseReportModel {
  result: result;

}
interface result{
  reports: {reports?:object};
  statisticsReport: {statisticsReport?:object};
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  message: string;
  statusEnum: ResponseStatus;
}