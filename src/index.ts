import { internal } from "./internal";
export class IkeaApi {
    public async get(countryCode: string, itemCode: string) {
        return await internal.getById(countryCode, itemCode)
    }
}