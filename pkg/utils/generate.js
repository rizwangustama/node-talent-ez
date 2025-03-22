export const generateAlertNumber = async (count) => {
    var str = "" + (count + 1)
    var pad = "00000"
    var ans = pad.substring(0, pad.length - str.length) + str
    return `${ans}`
}
