export default async (data: { refresh_token: string; token?: string; access_token?: string }) => {
    const { getSession } = useAuth();
    const { rawToken } = useAuthState();

    // rawRefreshToken.value = data.refresh_token;
    rawToken.value = data.access_token;


    await getSession();
};
