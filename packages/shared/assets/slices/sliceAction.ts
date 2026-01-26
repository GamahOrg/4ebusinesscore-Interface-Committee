import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../models/responseModel";
import { FormData } from "../../index";

export const sliceAction = (name="",consume: any,type="") => {
  return createAsyncThunk<ResponseModel, any>(
    `${name}`,
    async (data, thunkApi) => {
      try {
        if(type=="formData"){
          data =FormData(data);
        }
        const response = await consume(data);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
};
