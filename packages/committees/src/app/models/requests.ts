import { RequestOutgoingStatus } from "./response-status";


export interface Requests{
    id:string;
    requestName :string;
    destinationName:string;
    organizationName:string;
    requestDate:string;
    requestStatus:RequestOutgoingStatus;
    roleName:string;
    requestCategoryName:string;
    requestNumber:string
    
}