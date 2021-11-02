import got from "got";
import accessEnv from "#root/helpers/accessEnv";

const COMPETITOR_SERVICE_URI = accessEnv("COMPETITOR_SERVICE_URI");

export default class CompetitorService {
    // ----------------------------------------------------- COMPETITOR ----------------------------------------------------
    // *** FETCH ALL
    static async fetchAllCompetitors({args}) {
        const body = await got.post(`${COMPETITOR_SERVICE_URI}/competitors/all`, {json: {args: args}}).json();
        return body || [];

    };
    // *** COUNT
    static async countCompetitors() {
        const body = await got.get(`${COMPETITOR_SERVICE_URI}/competitors/count`).json();
        return body || [];
    };
    // *** FETCH BY ID
    static async fetchCompetitorById({competitor_id}) {
        const body = await got.get(`${COMPETITOR_SERVICE_URI}/competitors/${competitor_id}`).json();
        return body || {};
    };
    // *** FETCH BY EXTERNAL ID
    static async fetchCompetitorByExternalId({competitor_external_id}) {
        const body = await got.get(`${COMPETITOR_SERVICE_URI}/competitors/external/${competitor_external_id}`).json();
        return body || {};
    };
    // *** CREATE
    static async createCompetitor({args}) {
        const body= await got.post(`${COMPETITOR_SERVICE_URI}/competitors`, {
            json: {args: args.input}
        }).json();
        return body || {};
    };
    // *** UPDATE
    static async updateCompetitor({args}) {
        const body= await got.put(`${COMPETITOR_SERVICE_URI}/competitors/${args.input.competitor_external_id}`, {
            json: {args: args.input}
        }).json();
        return body || [];
    };
    // *** DELETE
    static async deleteCompetitor({args}) {
        const body= await got.delete(`${COMPETITOR_SERVICE_URI}/competitors/${args.input.competitor_external_id}`).json();
        return body || false;
    };

    // ----------------------------------------------------- COMPETITOR-TRIED ----------------------------------------------------
    // *** FETCH COMPETITOR-TRIED
    static async competitorTried({competitor_external_id, promocode_code}) {
        const body = await got.get(`${COMPETITOR_SERVICE_URI}/competitors/tried/v2/${competitor_external_id}/${promocode_code}`).json();
        return body || {};
        
    };

    // *** FETCH COMPETITOR-TRIED-VIEW
    static async competitorTriedView({args}) {
        const body = await got.post(`${COMPETITOR_SERVICE_URI}/competitors/tried/view`, {json: {args: args}}).json();
        return body || [];
    }
    // *** COUNT COMPETITOR-TRIED-VIEW-COUNT
    static async competitorTriedViewCount() {
        const body = await got.get(`${COMPETITOR_SERVICE_URI}/competitors/tried/view/count`).json();
        return body || [];
    };

    // ----------------------------------------------------- COMPETITOR-REFILL ----------------------------------------------------
    // *** FETCH ALL
    static async fetchAllCompetitorsRefill({args}) {
        const body = await got.post(`${COMPETITOR_SERVICE_URI}/competitors-refill/all`, {json: {args: args}}).json();
        return body || [];
    };


    // *** COUNT
    static async countCompetitorsRefill() {
        const body = await got.get(`${COMPETITOR_SERVICE_URI}/competitors-refill/count`).json();
        return body || [];
    };

    // *** FETCH BY ID
    static async fetchCompetitorRefillById({competitor_id}) {
        const body = await got.get(`${COMPETITOR_SERVICE_URI}/competitors-refill/${competitor_id}`).json();
        return body || {};
    };

    // *** CREATE
    static async createCompetitorRefill({args}) {
        const body= await got.post(`${COMPETITOR_SERVICE_URI}/competitors-refill`, {
            json: {args: args.input}
        }).json();
        return body || {};
    };

}




