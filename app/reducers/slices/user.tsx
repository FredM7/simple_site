import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sign_in } from "../../api/calls/sign_in";
import Cookie from "universal-cookie";

interface IUserSliceState {
  user: {
    user: {
      email: string;
      password: string;
      confirm_password?: string;
      _id?: string;
      name?: string;
      surname?: string;
      cell_number?: string;
      birthday?: Date;
      get_communication?: boolean;
      agrees_terms_and_conditions?: boolean;
      reset_password_otp?: string;
      remember_me?: boolean;
      client_id?: string;
    };
    token: string;
    is_loading: boolean;
    // is_saving: boolean;
  };
}

const _devMode = process.env.NODE_ENV !== "production";

// const userActions = createExtraActions();
// const extraReducers = createExtraReducers();

const initialState: IUserSliceState = {
  user: {
    user: {
      _id: undefined,
      email: _devMode ? "fred@doshex.com" : "",
      password: _devMode ? "1234" : "",
      confirm_password: undefined,
      name: undefined,
      surname: undefined,
      reset_password_otp: undefined,
      client_id: undefined,
      remember_me: true,
    },
    token: "",
    is_loading: false,
    // is_saving: false,
  },
};

const sign_in_thunk = createAsyncThunk("user/sign_in_thunk", async (arg, { dispatch, getState }) => {
  const cookie = new Cookie();
  const state: any = getState();
  // console.log("sign_in_thunk STATE", state);
  const { user } = state.userState;

  const response = await sign_in({
    email: user.user.email,
    password: user.user.password,
  });

  // console.log("user/sign_in_thunk", response);
  if (response.success) {
    const obj = {
      ...user,
      ...response.content,
    };

    if (user.user.remember_me) {
      cookie.set("user_state", obj, {
        sameSite: true,
      });
    }

    dispatch(setUser(obj));
    // dispatch(setDrawerOpen(false));
  } else {
    // dispatch(setMainModal({ title: "Something went wrong!", messages: [response.message] }));
  }

  return response;
});

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sign_in_thunk.fulfilled, (state, action) => {
        // console.log("sign_in_thunk.fulfilled", action);

        state.user.is_loading = false;
      })
      .addCase(sign_in_thunk.rejected, (state, action) => {
        // console.log("sign_in_thunk.rejected", action);
        state.user.is_loading = false;
      })
      .addCase(sign_in_thunk.pending, (state, action) => {
        // console.log("sign_in_thunk.pending", action);
        state.user.is_loading = true;
      });

    // .addCase(update_password_thunk.fulfilled, (state, action) => {
    //   // console.log("update_password_thunk.fulfilled", action);

    //   state.user.is_saving = false;
    // })
    // .addCase(update_password_thunk.rejected, (state, action) => {
    //   // console.log("update_password_thunk.rejected", action);
    //   state.user.is_saving = false;
    // })
    // .addCase(update_password_thunk.pending, (state, action) => {
    //   // console.log("update_password_thunk.pending", action);
    //   state.user.is_saving = true;
    // });
  },
});

export { sign_in_thunk };
export const { setUser } = slice.actions;
export { IUserSliceState };
export default slice.reducer;
