import BigNumber from "bignumber.js";

export const decimalToHex = (decimalString: string): string => {
    const bigNumber = new BigNumber(decimalString);
    return bigNumber.toString(16);
}