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
      Accepted,
      Rejected,
      RequireEdit,
      Redirected,
      Cancel,
      ExceptionApproved
  }
  export enum RequestOutgoingStatus
  {
      Pinding="Pinding",
      Pending="Pending",
      Rejected="Rejected",
      Accepted="Accepted"
  }
  export enum OutgoingStatus
  {
      Pending,
      Accepted,
      Rejected,
  }