import { ResponseStatus } from "./response-status"

export interface ResponseModel {
  result: object;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  message: string;
  statusEnum: ResponseStatus;
}
