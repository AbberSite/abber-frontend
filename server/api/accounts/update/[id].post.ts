import axios from 'axios';
import { Readable } from 'stream';

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
    const body = await readMultipartFormData(event);
    const config = useRuntimeConfig();
    const headers = getRequestHeaders(event);
    const Authorization = headers.authorization;
    const id = event.context.params?.id;

    const data = new FormData();
    body?.map((_data): any => {
        if (_data.filename && _data.name) {


            const stream = new Readable({
                read() {
                  this.push(_data.data)
                  this.push(null)
                }
              })
              
              data.append("image", new BlobFromStream(stream, _data.data.length) as any, _data.filename)
              
        } else if (!_data.filename && _data.name) {
            data.append(_data.name, _data.data.toString() as any);
        }
    });

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
