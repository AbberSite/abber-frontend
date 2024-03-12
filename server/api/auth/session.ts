import axios from 'axios';

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event);
    const config = useRuntimeConfig();
    const Authorization = headers?.authorization;

    try {
        const getUser = axios.get(config.apiBasePath + '/accounts/account/', {
            headers: {
                Authorization,
                'api-key': config.apiSecret,
                keepAlive: true
            }
        });

        const getNotifications = await axios.get(config.apiBasePath + '/alerts/notifications/', {
            headers: {
                Authorization,
                'api-key': config.apiSecret,
                keepAlive: true
            }
        });

        const [{ data: user }, { data: notifications }] = await Promise.all([getUser, getNotifications]);

        return Object.assign(user, { notifications });
    } catch (error: any) {


        if(error.response?.data?.code == 'user_inactive'){
            return { status : "error", error : error?.response?.data?.detail }
        }

        return {
            data: error,
            status: 'error',
            error: 'حدث خطأ ما'
        };
    }
});
