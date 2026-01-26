import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { CommitteeConsume } from '@4eplatform/shared/apis/committee';
import { sliceAction } from '@4eplatform/shared/assets/slices/sliceAction';
import { Pagination } from '@4eplatform/shared/models/Pagination';
import { RequestStatus } from '@4eplatform/shared/enums/enums';
import { casesHandler } from '@4eplatform/shared/assets/slices/casesHandler';
import { CommitteeModel } from '../../models/committee-model';
import { ResponseModel } from '@4eplatform/shared/models/responseModel';

interface CommitteeState {
  committee: CommitteeModel;
  committees: CommitteeModel[];
  pagination: Pagination ;
  status: RequestStatus;
  error: string | null;
}
  
const initialState: CommitteeState = {
    status: RequestStatus.idle,
    error: "",
    committee:new CommitteeModel(),
    committees: [],
    pagination: new Pagination(),
  };


export const addCommittee = sliceAction("committees/add-committee",(data:object)=>CommitteeConsume.addCommittee(data),"formData")
export const editCommittee = sliceAction("committees/edit-committee",({id,body})=>CommitteeConsume.editCommittee({id,body}),"formData")
export const getCommittee = sliceAction("committees/get-committee",(id:string)=>CommitteeConsume.getCommitteeById(id))
export const getCommitteeTimeTable = sliceAction("committees/get-committeeTimeTable ",(id:string)=>CommitteeConsume.getCommitteeTimeTable(id))

const committeeSlice = createSlice({
  name: 'committees',
  initialState,
  reducers: {
      },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('addCommittee'),
        casesHandler('addCommittee')
      )
      .addMatcher(
        (action) => action.type.startsWith('editCommittee'),
        casesHandler('editCommittee')
      )
      .addMatcher(
        (action) => action.type.startsWith('getCommittee'),
        (state, action) => {
          switch (action.type) {
            case `${getCommittee.fulfilled}`:
              state.committee = (action as PayloadAction<ResponseModel>).payload.result as CommitteeModel;
              state.pagination = (action as PayloadAction<ResponseModel>).payload;
              return state;
            default:
              return casesHandler('getCommittee')(state, action);
          }
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('getCommitteeTimeTable'),
        casesHandler('getCommitteeTimeTable')
      )
  },
});

export default committeeSlice.reducer;
