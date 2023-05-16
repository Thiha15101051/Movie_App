import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  type:'movie',
  genre:18,
  category:'popularity.desc',
  Mv_page:1,
  Tv_page:1,
  status:'idle',
  error:null
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addGenre:(state,{payload})=>{
      state.genre=payload;
    },
    changeCategory:(state,{payload})=>{
      state.category=payload;
    },
    increase_Mv_Page:(state,{payload})=>{
      state.Mv_page=payload;
    },
    increase_Tv_Page:(state,{payload})=>{
      state.Tv_page=payload;
    },
    reset_Mv_Page:(state)=>{
      state.Mv_page=1
    },
    reset_Tv_Page:(state)=>{
      state.Tv_page=1
    },
    reset_Category:(state)=>{
      state.category = "popularity.desc";
    },
    change_Type:(state,{payload})=>{
      state.type=payload
    },
    reset_Type:(state)=>{
      state.type='movie'
    }
  },
  
});

// Action creators are generated for each case reducer function
export const {addGenre,reset_Type,reset_Category,increase_Tv_Page,reset_Tv_Page,increase_Mv_Page,reset_Mv_Page,changeCategory,change_Type} = counterSlice.actions;

export default counterSlice.reducer;
