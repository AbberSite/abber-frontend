import axios from 'axios';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const { data: user } = await axios.get(config.apiBasePath + '/accounts/account/', {
        headers: {
            Authorization: getHeaders(event).authorization,
            'api-key': config.apiSecret,
        },
    });

    const { data: notifications } = await axios.get(config.apiBasePath + '/alerts/notifications/', {
        headers: {
            Authorization: getHeaders(event).authorization,
            'api-key': config.apiSecret,
        },
    });

    return Object.assign(user, { notifications });
});
