export function NormaliseCountryCodes(code: String) {
    /**
     * Normalises the country code to the IKEA API format
     * @param code - the country code to normalise
     */
    return String(code).trim().toLowerCase()
}