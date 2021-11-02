import * as fs from "fs";
import accessEnv from "#root/helpers/accessEnv";
import sanitize from "sanitize-filename";
import generateUUID from "#root/helpers/generateUUID";

import path from 'path';
import Filer from "#root/helpers/fileManager";
const GCLOUD_PID = accessEnv("GCLOUD_PID", "flexinvest");
const GCLOUD_KEY = accessEnv("GCLOUD_KEY", "/opt/app/src/helpers/flexinvest-bcd3b3715fda.json");
const GCLOUD_BUCKET = accessEnv("GCLOUD_BUCKET", "mm_main");
const GCLOUD_FOLDER = accessEnv("GCLOUD_FOLDER", "convert_uploads");
const GCLOUD_FOLDER_PROFILES = accessEnv("GCLOUD_FOLDER_PROFILES", "profile_uploads");
const LOCAL_FOLDER = accessEnv("LOCAL_FOLDER", "opt/app/uploads");



const storeCloud = async ({file}, isProfile=false) => {

    const { createReadStream, filename, mimetype} = await file;
    const filer = new Filer();

    //Reemplazo (espacios, caracteres especiales) del nombre de archivo
    // var pureFilename= await filename.replace(/[^\x20-\x7E]/g, '').replace('(', '-').replace(')', '-').replace(/\s/g, '-');
    var pureFilename= await sanitize(filename);

    const prefixedFileName = [Math.floor(+new Date() / 1000), pureFilename].join('_');

    const DESTINO_EN_GCLOUD = path.join(
                                !isProfile ? GCLOUD_FOLDER : GCLOUD_FOLDER_PROFILES ,
                                prefixedFileName
                                );

    var uploaded=null;

    console.log("Antes de createReadStream")
    const readStream = createReadStream();
    console.log("Despues de createReadStream")

    // Para escribir en disco
    // const ORIGEN_LOCAL = `/${LOCAL_FOLDER}/${prefixedFileName}`;
    // const writeStream = fs.createWriteStream(ORIGEN_LOCAL)
    // readStream.pipe(writeStream);
    // const status = await filer.gc_UploadFile(ORIGEN_LOCAL,DESTINO_EN_GCLOUD);    // Para subir un archivo local

    const status = await filer.gc_UploadFileStream(readStream,DESTINO_EN_GCLOUD);   // Para subir un stream

    if(status == false) {
        console.log('Error, file doesn`t upload to google cloud bucket');
    } else {
        uploaded = { pureFilename, prefixedFileName, mimetype, DESTINO_EN_GCLOUD };
    }

    return uploaded;

};



export default storeCloud;
