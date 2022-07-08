import { internal } from "./internal";
import shapeshiftConstants from "./shapeshiftConstants";
export class IkeaApi {
    public async get(countryCode: string, itemCode: string) {
        const parsedItemCode = Number(itemCode.replaceAll(".", ""))
        return await internal.getById(shapeshiftConstants.string(countryCode), shapeshiftConstants.number(parsedItemCode))
    }
}