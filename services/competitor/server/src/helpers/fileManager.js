import { Storage } from '@google-cloud/storage';
import accessEnv from "#root/helpers/accessEnv";
import fs from 'fs';
import path from 'path';
var debug = require('debug')('static-service:server');

export default class Filer {

    constructor(name){

        this.name = name;
        const key = (process.env.NODE_ENV == 'development') ? 
            path.join(__dirname, accessEnv("GCLOUD_KEY", '')) : 
            accessEnv("GCLOUD_KEY", '');

        const pid = accessEnv("GCLOUD_PID", "");
        this.bucket = accessEnv("GCLOUD_BUCKET", "");

        this.storage = new Storage({
            projectId: pid,
            keyFilename: key
        });
    }

    gc_CopyFile(origin,destination) {
        debug(origin);
        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt"
            destination: destination,
        };
        return this.storage.bucket(this.bucket).file(`${origin}`).download(options)
            .then(
                () => {
                    return true;
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                    return false;
                }
            );
    }

    setupFolder(uri) {
        return new Promise((resolve, reject) =>{
            fs.exists(uri, (exists) => {
                if(exists == false) {
                    resolve();
                }
                else {
                    reject('Folder already exists');
                }
            });
        })
        .then(
            () => {
                fs.mkdirSync(uri, { recursive: true });
                return true;
            }
        )
        .catch(
            (error) => {
                console.log(error);
                return false;
            }
        );
    }

};