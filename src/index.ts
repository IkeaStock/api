import { internal } from "./internal";
import shapeshiftConstants from "./shapeshiftConstants";
export class IkeaApi {
    public async get(countryCode: string, itemCode: string) {
        /**
         * Gets the stock numbers of an item from the Ikea API
         * @param countryCode - the country code of the country the item is in
         * @param itemCode - the item code of the item to get the stock numbers of
         */
        const parsedItemCode = Number(itemCode.replaceAll(".", ""))
        return await internal.getById(shapeshiftConstants.string(countryCode), shapeshiftConstants.number(parsedItemCode))
    }
}