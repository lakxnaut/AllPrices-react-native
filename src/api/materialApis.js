import { BASEAPIS } from "./BaseApis";

export const materialApi = {

    GetAllMaterialCategory : async () => {
        const json = {}
        return await BASEAPIS.POSTAPI(json, 'getAllMaterialCategory');
    },

    GetAllMaterialSubCategory : async (materialId) => {
        return await BASEAPIS.GETAPI('getAllMaterialSubCategory?materialId='+materialId);
    },

    GetMaterialDataByMaterialId : async (json) => {
        return await BASEAPIS.POSTAPI(json,'getMaterialDataByMaterialId');
    },
};
