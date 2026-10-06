import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import '@/team-theme.css';
import '@/utils/i18n';
import { applyBlocklyLocale } from '@/utils/blockly-locales';
import i18n from '@/utils/i18n';
import '@/utils/blockly-global'; // Expose Blockly globally for external plugins
import { initAiBuddyAccess } from '@/utils/aiBuddyAccess';
import App from '@/App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleClientIdContext } from '@/utils/google-client-id';
import { ThemeInit } from '../.flowbite-react/init';

initAiBuddyAccess();
applyBlocklyLocale(i18n.language);

// only show the screen size label when running the dev server
if (import.meta.env.DEV) {
    document.body.classList.add('debug-screens');
}

function Root() {
    const [googleClientId, setGoogleClientId] = useState<string>('');
    const googleAuthBackendUrl = import.meta.env.GOOGLE_AUTH_URL;

    useEffect(() => {
        if (!googleAuthBackendUrl) {
            console.warn('GOOGLE_AUTH_URL is not set - Google sign-in is disabled.');
            return;
        }
        const fetchClientId = async () => {
            try {
                const response = await fetch(`${googleAuthBackendUrl}/google-auth/client-id`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch client ID: ${response.statusText}`);
                }
                const data = await response.json();
                setGoogleClientId(data.client_id ?? '');
            } catch (error) {
                // The IDE stays usable without Google - only Drive sign-in is lost.
                console.error('Error fetching Google Client ID:', error);
            }
        };
        fetchClientId();
    }, [googleAuthBackendUrl]);

    return (
        <StrictMode>
            <ThemeInit />
            <GoogleClientIdContext.Provider value={googleClientId}>
                <GoogleOAuthProvider clientId={googleClientId}>
                    <App />
                </GoogleOAuthProvider>
            </GoogleClientIdContext.Provider>
        </StrictMode>
    );
}

createRoot(document.getElementById('root')!).render(<Root />);
