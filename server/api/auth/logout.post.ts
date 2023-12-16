import axios, { AxiosError } from 'axios';

export default defineEventHandler(async (event) => {

    const headers = getRequestHeaders(event)
    
    const jwt = headers.authorization?.replace("Bearer", "")?.replace(" ", "")

    if(!jwt) {

        setResponseStatus(event, 401)

        return { 
            status : "error", 
            error: "unauthorized"
        }

    }

    try {
        const response = await axios.get(
            'https://test.abber.co/api/authentication/logout/',

            {
                headers :  {
                    "Authorization" : `JWT ${jwt}`
                }
            },
        );


        return {
            status : "success",
            message : "logged out successfully"
        } 

    } catch ( error : any ) {

        setResponseStatus(event, 500)

        return { 

            status : "error", 
            error : "حدث خطأ ما"
            
        }

    }
});
