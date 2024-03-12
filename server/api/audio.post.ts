import axios from 'axios';


export default defineEventHandler(async (event) => {

  const body = await readMultipartFormData(event);
  const config = useRuntimeConfig();
  const headers = getRequestHeaders(event);
  const Authorization = headers.authorization;

  const fileData = body[0]
  const blob = new Blob([fileData.data]); // Convert audio buffer to blob
  const formData = new FormData();
  formData.append(fileData.name, blob, fileData.filename);


  try {
    const response = await axios.post(config.apiBasePath + `/chat/files/`, formData, {
      headers: {
        'api-key': config.apiSecret,
        'Content-Type': 'multipart/form-data', // Set Content-Type explicitly
        Authorization
      }
    });

    return response?.data;
  } catch (error: any) {
    setResponseStatus(event, error.response?.status ?? 500);

    return error.response?.data;
  }
});
