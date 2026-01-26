import { RequestStatus } from "../../enums/enums";

export const casesHandler = (slice) => {

  return (state, action) => {
    const handlers = {
      [`${slice}/pending`]: handlePending,
      [`${slice}/rejected`]: handleRejected,
      [`${slice}/fulfilled`]: handleFulfilled,
    };

    const handler = handlers[action.type];
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
};

const handlePending = (state: any) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: any) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: any, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};
