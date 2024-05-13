import { BASEAPIS } from "./BaseApis";

export const authApi = {

    SignUp : async (phone) => {
        const json = {
            phone
        };
        return await BASEAPIS.POSTAPI(json, 'register');
    },

    Login : async (phone) => {
        const json = {
            phone
        };
        return await BASEAPIS.POSTAPI(json, 'login');
    },

    VerifyPhoneOtp : async (json) => {

        return await BASEAPIS.POSTAPI(json, 'verifyPhoneOtp');
    },

};
