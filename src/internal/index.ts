import fetchMngr from "./fetch";
import { NormaliseCountryCodes } from "./utils";
import data from "../data/stores.json";

class Internal {
  public InkaBaseUrl = "https://api.ingka.ikea.com/cia/"
  public async fetch(url: string) {
       return await fetchMngr(`${this.InkaBaseUrl}/${url}`)
  }
  public NormaliseCountryCode(code: String) {
     return NormaliseCountryCodes(code);
  }
  public NormalizeBuCode(buCode: String) {
      return String(buCode || '').replace(/[^0-9]/g, '');
  }
   public NormalizeItemCode(itemCode: String) {
      return String(itemCode || '').replaceAll(".", "");
  }
  public async getById(countryCode: string, itemCode: string) {
    const url = `availabilities/ru/${this.NormaliseCountryCode(countryCode)}?itemNos=${this.NormalizeItemCode(itemCode)}&expand=StoresList,Restocks`
    const res = await this.fetch(url);
    const resData = await res.json();
    var dataArr: any[] = [];
    resData.data.map((val: any, i: number) => {
      if (val.availableStocks == undefined) {
        val.availableStocks = []
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
    const strCodes = [buCodes]
    return data.filter(store => strCodes.indexOf(store.buCode) > -1);
  }
}
export const internal = new Internal()