export const parseState = (buffer: ArrayBuffer) => {
    let uInt8Array = '';
    const byteArray = new Uint8Array(buffer);
    for (let byte of byteArray) {
        uInt8Array += byte.toString(2).padStart(8, '0');
    }

    // Ensure the input is a binary string
    if (!/^[01]*$/.test(uInt8Array)) {
        throw new Error('Input should be a binary string.');
    }

    // Pad the input with zeros to make it 508 bits
    while (uInt8Array.length < 508) {
        uInt8Array = '0' + uInt8Array;
    }

    // Split the input into two 254-bit strings
    const firstPart = uInt8Array.substring(0, 254);
    const secondPart = uInt8Array.substring(254, 508);

    return {
        firstPart,
        secondPart
    };
}
