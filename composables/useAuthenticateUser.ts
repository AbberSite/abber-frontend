export default async (data: { refresh_token: string; token: string }) => {
    const { refresh } = useAuth();
    const { rawRefreshToken, rawToken } = useAuthState();

    rawRefreshToken.value = data.refresh_token;
    rawToken.value = data.token;

    await refresh();
};
