import fetchMngr from "./fetch";
import { NormaliseCountryCodes } from "./utils";
import data from "../data/stores.json";

class Internal {
  /**
   * Another internal class
   */
  public InkaBaseUrl = "https://api.ingka.ikea.com/cia/"
  public async fetch(url: string) {
    /**
     * Fetch util for fetching from the IKEA API
     * @param url - the url to fetch from
     */
       return await fetchMngr(`${this.InkaBaseUrl}/${url}`)
  }
  public NormaliseCountryCode(code: String) {
    /**
     * Normalises the country code to the IKEA API format
     * @param code - the country code to normalise
     */
     return NormaliseCountryCodes(code);
  }
  public NormalizeBuCode(buCode: String) {
    /**
     * Normalises the bu code to the IKEA API format
     * @param buCode - the bu code to normalise
     */
      return String(buCode || '').replace(/[^0-9]/g, '');
  }
  public async getById(countryCode: string, itemCode: number) {
    /**
     * Gets the item by country code and by id
     * @param countryCode - the country code to get the item from
     * @param itemCode - the item code to get the item from
     */
    const url = `availabilities/ru/${this.NormaliseCountryCode(countryCode)}?itemNos=${itemCode}&expand=StoresList,Restocks`
    const res = await this.fetch(url);
    const resData = await res.json();
    var dataArr: any[] = [];
    resData.data.map((val: any, i: number) => {
      if (val.availableStocks == undefined) {
        return
      }
      if (val.store.name == undefined) {
        return
      }
      const data = {
        buCode: val.classUnitKey.classUnitCode,
        availableStocks: val.availableStocks[0],
        store: this.getStore(val.classUnitKey.classUnitCode)[0],
        mapEntry: i + 1
      }
      dataArr.push(data)
    })
    return dataArr
  }
  public getStore(buCodes: string) {
    /**
     * Gets the store data by bu code
     * @param buCodes - The Bu Code to get the store data from
     */
    const strCodes = [buCodes]
    return data.filter(store => strCodes.indexOf(store.buCode) > -1);
  }
}
export const internal = new Internal()