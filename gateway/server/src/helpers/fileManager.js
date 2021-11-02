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

    /**
     * GOOGLE CLOUD
     */
    // Makes an authenticated API request.
    async gc_listBuckets() {
        try {
            const [buckets] = await this.storage.getBuckets();

            console.log('Buckets:');
            buckets.forEach((bucket) => {
                console.log(bucket.name);
            });
        } catch (err) {
            console.error('ERROR:', err);
        }
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
                    console.log(`${origin} downloaded!.`);
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

    gc_MoveFile(origin,destination) {
        debug(origin);

        return this.storage.bucket(this.bucket).file(origin).move(destination)
            .then(
                () => {
                    console.log(`${origin} moved to ${destination}.`);
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

    gc_UploadFile(origin,destination) {
        debug(origin);

        const options = {
            destination: destination,
        };

        return this.storage.bucket(this.bucket).upload(origin,options)
            .then(
                () => {
                    console.log(`${origin} uploaded to ${this.bucket}.`);
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

    gc_UploadFileStream(fileStream,destination) {
        debug(origin);

        const destFile = this.storage.bucket(this.bucket).file(destination);
        return new Promise((resolve, reject) => {
            fileStream.pipe(
                destFile.createWriteStream()
            )
                .on('error', (error) => {
                    reject(error);
                })
                .on('finish', () => {
                    resolve();
                })
        })
            .then(
                () => {
                    console.log(`file uploaded to ${destination}.`);
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
        debug(uri);

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