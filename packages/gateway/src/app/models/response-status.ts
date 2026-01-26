export enum ResponseStatus {
    FailedToSave,
    SavedSuccessfully,
    Exception,
    Success,
    Failed,
    FailedToFindTheObject,
    AlreadyExisting,
  }
  export enum State
  {
      NotDeleted,
      Deleted
  }
  
  export enum RequestStatus
  {
    Pinding,
    Pending,
    Rejected,
    Accepted,
    Canceled,
    ExceptionApproved
  }
  export enum RequestOutgoingStatus
{
    Pinding="Pinding",
    Pending="Pending",
    Rejected="Rejected",
    Accepted="Accepted"
}
export enum DevelopmentRequestStatus
{
    Pinding,
    Accepted,
    Rejected,
    RequireEdit,
    Redirected,
    Canceled,
    ExceptionApproved
}