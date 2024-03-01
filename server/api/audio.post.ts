import axios from 'axios';
import { Readable } from 'stream';
import ffmpeg from 'ffmpeg.js';

class BlobFromStream {
    #stream: Readable;
    size: number;

    constructor(stream: Readable, size: number) {
        this.#stream = stream;
        this.size = size;
    }

    stream() {
        return this.#stream;
    }

    get [Symbol.toStringTag]() {
        return 'Blob';
    }
}

export default defineEventHandler(async (event) => {
    // let stdout = '';
    // let stderr = '';
    // // Print FFmpeg's version.

    // ffmpeg({
    //     arguments: ['-version'],
    //     print: function (data) {
    //         stdout += data + '\n';
    //     },
    //     printErr: function (data) {
    //         stderr += data + '\n';
    //     },
    //     onExit: function (code) {
    //         console.log('Process exited with code ' + code);
    //         console.log(stdout);
    //         console.log(stderr);
    //     }
    // });

    const body = await readMultipartFormData(event);
    const config = useRuntimeConfig();
    const headers = getRequestHeaders(event);
    const Authorization = headers.authorization;
    const id = event.context.params?.id;

    const data = new FormData();

    const file = body?.find((_data): any => _data.filename && _data.name);

    if (!file) return false;

    const stream = new Readable({
        read() {
            this.push(file.data);
            this.push(null);
        }
    });

    const blob = new BlobFromStream(stream, file.data.length);


    console.table(['-i', file.filename as string,'-f', 'webm' ,'out.webm']);

    const result =  ffmpeg({
        MEMFS: [{ name: file.filename as string, data: new Uint8Array(file.data.buffer)}],
        arguments: ['-i', file.filename as string,'-f', 'mp3' ,'out.mp3'],
        
    });

    console.log(result);
    
    // Write out.webm to disk.
    const out = result.MEMFS[0];

    console.log("this is output", out);
    
    return out;

    // body?.map((_data): any => {
    //     if (_data.filename && _data.name) {
    //         const stream = new Readable({
    //             read() {
    //                 this.push(_data.data);
    //                 this.push(null);
    //             }
    //         });

    //         const blob = new BlobFromStream(stream, _data.data.length)

    //         // data.append('image', as any, _data.filename);
    //     }
    // });

    try {
        const response = await axios.patch(config.apiBasePath + `/accounts/account/${id}/`, data, {
            headers: {
                'api-key': config.apiSecret,
                Authorization
            }
        });

        return response?.data;
    } catch (error: any) {
        setResponseStatus(event, error.response?.status ?? 500);

        return error.response?.data;
    }
});
