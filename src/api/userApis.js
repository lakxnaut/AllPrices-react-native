import { BASEAPIS } from "./BaseApis";

export const USERAPIS = {

    GetStates : async () => {
        return await BASEAPIS.GETAPI('getstates');
    },
}