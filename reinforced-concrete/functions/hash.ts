
// export const hashFile = async (filePath:string):Promise<string|undefined> => {
export const hashFile = async (filePath:string):Promise<string> => {
    
    //write bytes to a file named filePath
    const writeFile = await fetch(
        "http://localhost:3000/api/writeFile",
        {
            method:"POST",
            headers:{
                "Context-Type":"application/json"
            },
            body:JSON.stringify({
                url:filePath
            })
        }
    );

    //read bytes and hash
    const hashReq = await fetch(
        "http://localhost:3000/api/hash",
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }
    );

    const { hash } = await hashReq.json();
    // console.log(res)
    return hash;
}