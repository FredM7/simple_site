//

import { API } from "../api";

interface ISignInRequest {
  email: string;
  password: string;
}

async function sign_in(request: ISignInRequest) {
  // console.log("sign_in -> request", request);

  return await new API().apiPost({
    baseUrl: process.env.LETS_TRADE_USER_URL ?? "",
    endpoint: `user/sign_in`, //
    content: request,
  });
}

export {
  // ISignInRequest,
  sign_in,
};
