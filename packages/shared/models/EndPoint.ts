import { RequestMethod } from "./RequestMethod";

export interface Endpoint {
    url: string;
    method: keyof RequestMethod; 
  }