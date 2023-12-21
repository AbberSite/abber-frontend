import { GoogleOAuthProvider } from 'google-oauth-gsi';

export default () =>
    new Promise((resolve, reject) => {
        const googleProvider: any = new GoogleOAuthProvider({
            clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            onScriptLoadError: () => useNotification({ type: 'danger', content : "failed to initialize google login"}),
            onScriptLoadSuccess: () => resolve(googleProvider),
        });
    });
