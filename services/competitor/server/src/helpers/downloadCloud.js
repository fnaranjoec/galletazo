import Filer from "./fileManager";
import path from 'path';

const downloadCloud = async ({filePath, destinationFolder, filename}, isProfile=false) => {
    const filer = new Filer();
    await filer.setupFolder(destinationFolder);
    return await filer.gc_CopyFile(filePath,path.join(destinationFolder,filename));
    // return filer.gc_DownloadFile(`https://storage.cloud.google.com/mm_main/${file}`, file);   // Para bajar un stream
};

export default downloadCloud;
