import { s } from "@sapphire/shapeshift"

class shapeshiftConstants {
    public string(string: string) {
        return s.string.parse(string)
    }
    public number(number: number) {
        return s.number.parse(number)
    }
}
export default new shapeshiftConstants