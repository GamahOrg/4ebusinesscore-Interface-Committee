import { ResponseStatus } from "../enums/enums";

export interface ResponseModel {
  result: object;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  message: string;
  statusEnum: ResponseStatus;
}
