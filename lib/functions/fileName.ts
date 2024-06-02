export const getFileName = (date:Date, title:string):string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const time = date.getTime().toString();
    const timestamp = `${year}-${month}-${day}-${time}`;

    return `/${title}-${timestamp}`;
}