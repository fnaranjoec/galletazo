import got from "got";
import accessEnv from "#root/helpers/accessEnv";

const COMPETITOR_SERVICE_URI = accessEnv("COMPETITOR_SERVICE_URI");

export default class PrizeService {
    

    // ----------------------------------------------------- PRIZE ----------------------------------------------------
    
    // *** RESETING PRIZE
    static async resetPrizes() {

        const body = await got.get(`${COMPETITOR_SERVICE_URI}/prizes/reset`).json();

        return body || false;

    };

    
    // // *** FETCH ALL
    // static async fetchAllPromoCodes({args}) {
    //     const body = await got.post(`${COMPETITOR_SERVICE_URI}/promocodes/all`, {json: {args: args}}).json();
    //
    //     return body || [];
    //
    // };
    //
    //
    // // *** COUNT
    // static async countPromoCodes() {
    //
    //     const body = await got.get(`${COMPETITOR_SERVICE_URI}/promocodes/count`).json();
    //
    //     return body || [];
    //
    // };
    //
    // // *** FETCH BY ID
    // static async fetchPromoCodeById({promocode_id}) {
    //
    //     const body = await got.get(`${COMPETITOR_SERVICE_URI}/promocodes/${promocode_id}`).json();
    //
    //     return body || {};
    //
    // };
    //
    // // *** FETCH BY CODE
    // static async fetchPromoCodeByCode({promocode_code}) {
    //
    //     const body = await got.get(`${COMPETITOR_SERVICE_URI}/promocodes/code/${promocode_code}`).json();
    //
    //     return body || {};
    //
    // };
    //
    // // // *** CREATE
    // // static async createPromoCode({args}) {
    // //
    // //     const body= await got.post(`${COMPETITOR_SERVICE_URI}/promocodes`, {
    // //         json: {args: args.input}
    // //     }).json();
    // //
    // //     return body || {};
    // // };
    // //
    // // // *** UPDATE
    // // static async updatePromoCode({args}) {
    // //
    // //     const body= await got.put(`${COMPETITOR_SERVICE_URI}/promocodes/${args.input.promocode_id}`, {
    // //         json: {args: args.input}
    // //     }).json();
    // //
    // //     return body || [];
    // // };
    // //
    // // // *** DELETE
    // // static async deletePromoCode({args}) {
    // //
    // //     const body= await got.delete(`${COMPETITOR_SERVICE_URI}/promocodes/${args.input.promocode_id}`).json();
    // //
    // //     return body || false;
    // // };

}

