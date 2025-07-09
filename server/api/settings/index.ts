import axios from "axios";

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()

    // Validate configuration
    if (!config.apiBasePath || !config.apiSecret) {
        console.error('Missing API configuration - apiBasePath or apiSecret');
        setResponseStatus(event, 500);
        return {
            error: true,
            message: 'API configuration is missing',
            details: 'Please check your environment variables'
        };
    }

    try {
        console.log(`Fetching settings from: ${config.apiBasePath}/settings/settings/`);
        
        const response = await axios.get(config.apiBasePath + "/settings/settings/", {
            headers: {
                'api-key': config.apiSecret,
            },
            timeout: 10000, // 10 second timeout
        })
    
        return response.data

    } catch (error : any) {

        console.error('Settings API error:', error.message);
        setResponseStatus(event, 500);

        // Handle case where error.response is undefined
        if (error.response && error.response.data) {
            return error.response.data;
        }
        
        // Return a fallback error response
        return {
            error: true,
            message: error.message || 'Failed to fetch settings',
            details: 'Settings service is currently unavailable'
        };
        
    }

});
