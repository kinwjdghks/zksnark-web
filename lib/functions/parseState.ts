export const BITRATE = 128;

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

    const nonpadBitSize = uInt8Array.length;
    console.log("nonpadBitSize: %d",nonpadBitSize);
    // Pad the input with zeros to make it 2*BITRATE bits
    while (uInt8Array.length < 2 * BITRATE) {
        uInt8Array = '0' + uInt8Array;
    }

    // Split the input into two 254-bit strings
    const firstPart = uInt8Array.substring(0, BITRATE);
    const secondPart = uInt8Array.substring(BITRATE, 2*BITRATE);

    return {
        firstPart,
        secondPart,
        nonpadBitSize,
    };
}
