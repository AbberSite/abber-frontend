import axios from "axios";

export default defineEventHandler(async (event) => {

    const headers = getRequestHeaders(event) 


    const { del } = getQuery(event)


    const Authorization = headers.authorization 

    const config = useRuntimeConfig()

    const slug = event.context.params?.slug

    const url = config.apiBasePath +  `/blog/posts/${slug}/${del ? 'remove_from' : 'add_to'}_bookmark/`

    try {
        
        const response = await axios.get(url,{
            headers : {
                'api-key' : config.apiSecret,
                Authorization
            }, 
        })
    
        return response.data

    } catch (error : any) {

        setResponseStatus(event, 500);

        return error.response.data
        
    }

});
