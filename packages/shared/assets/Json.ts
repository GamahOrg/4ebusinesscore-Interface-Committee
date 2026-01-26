export function isValidToParse(jsonString:string) {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (e) {
        return false;
    }
}
