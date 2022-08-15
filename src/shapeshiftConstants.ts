import { s } from "@sapphire/shapeshift"

class shapeshiftConstants {
    public string(string: string) {
        /**
         * Validates Strings
         * @param string - the string to 
         * @private
         */
        return s.string.parse(string)
    }
    public number(number: number) {
        /**
         * Validates Numbers
         * @param number - the number to validate
         * @private
        */
        return s.number.parse(number)
    }
}
export default new shapeshiftConstants