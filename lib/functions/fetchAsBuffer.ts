export const fetchAsBuffer = async (url: string): Promise<ArrayBuffer|undefined> => {
    const response = await fetch(url);
    if (!response.ok) return;

    // Convert the response to an ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    // Convert the ArrayBuffer to a Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert the Uint8Array to a Buffer
    return Buffer.from(uint8Array);
}