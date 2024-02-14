import axios from "axios";
import { redux_store } from "../store";

interface IApiReqeust {
  endpoint: string;
  baseUrl: string;
  content?: any;
  contentType?: string;
  authorization?: string;
}

// interface IApiResponse {
//   success: boolean;
//   message: string;
//   content?: any;
// }

export class API {
  // apiBaseURL = process.env.LETS_TRADE_USER_URL;
  bearerToken = "";

  configurationErrorResponse = {
    success: false,
    message: "Whitelabel is not configured with the correct credentials. Please contact support.",
    content: {},
  };

  public async apiGet({ baseUrl, endpoint, authorization }: IApiReqeust) {
    const valid = this.validateAuthorization(authorization);
    if (!valid) {
      return this.configurationErrorResponse;
    }

    return await axios({
      method: "GET",
      url: `${baseUrl}/${endpoint}`,
      headers: this.getHeader(authorization),
    })
      .then((response) => {
        // console.log(`api -> apiGet -> calls -> ${endpoint} SUCCESS:`, response);
        return response.data;
      })
      .catch((error) => {
        // console.log(`api -> apiGet -> calls -> ${endpoint} ERROR:`, error);
        return this.extractErrorMessage(error);
      });
  }

  public async apiPost({ baseUrl, endpoint, contentType, content, authorization }: IApiReqeust) {
    const valid = this.validateAuthorization(authorization);
    if (!valid) {
      return this.configurationErrorResponse;
    }

    return await axios({
      method: "POST",
      url: `${baseUrl}/${endpoint}`,
      headers: this.getHeader(authorization),
      data: content,
    })
      .then((response) => {
        // console.log(`api -> apiPost -> calls -> ${endpoint} SUCCESS:`, response);
        return response.data;
      })
      .catch((error) => {
        // console.log(`api -> apPost -> calls -> ${endpoint} ERROR:`, error);
        return this.extractErrorMessage(error);
      });
  }

  public async apiPut({ baseUrl, endpoint, contentType, content, authorization }: IApiReqeust) {
    const valid = this.validateAuthorization(authorization);
    if (!valid) {
      return this.configurationErrorResponse;
    }

    return await axios({
      method: "PUT",
      url: `${baseUrl}/${endpoint}`,
      headers: this.getHeader(authorization),
      data: content,
    })
      .then((response) => {
        // console.log(`api -> apiPut -> calls -> ${endpoint} SUCCESS:`, response);
        return response.data;
      })
      .catch((error) => {
        // console.log(`api -> apiPut -> calls -> ${endpoint} ERROR:`, error);
        return this.extractErrorMessage(error);
      });
  }

  private getHeader(authorization?: string) {
    const state = redux_store.getState();
    const userState = state.userState;
    // // console.log("userState", userState);
    // // console.log("this.bearerToken", this.bearerToken);

    return {
      authorization: `Bearer ${authorization ?? this.bearerToken}`,
      "content-type": "application/json",
    };
  }

  private extractErrorMessage(error: any) {
    let message = error;
    if (error.response) {
      // The client was given an error response (5xx, 4xx)
      // console.log("Error", error.response);
      if (error.response.status == 0) {
        message = "Client could not connect to the server";
      } else {
        message = "Client was given an error response";
      }
      // message = "Client was given an error response";
    } else if (error.request) {
      message = "Client request never left the browser and therefore never received a response from the server ";
    } else {
      // Anything else
      // console.log("Error", error.message);
      message = error.message;
    }

    //Simulate a normal response so that it wont break the UI.
    return {
      data: {
        success: false,
        message: message,
        content: error,
      },
    };
  }

  private validateAuthorization(authorization?: string) {
    if (!authorization && !this.bearerToken) {
      return false;
    }

    return true;
  }
}
