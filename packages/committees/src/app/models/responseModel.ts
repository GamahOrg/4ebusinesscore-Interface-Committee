import { ResponseStatus } from "../enums/responseStatus";

export interface ResponseModel {
  result: object;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  message: string;
  statusEnum: ResponseStatus;
}
