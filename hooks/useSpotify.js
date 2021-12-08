import React, {useEffect} from 'react';
import {signIn, useSession} from "next-auth/react";

const useSpotify = () => {
    const {data: session, status} = useSession();

    useEffect(async () => {
        if (session) {
            // if refreshed access token fails, so direct the user to manual login again
            if (session.error === 'RefreshAccessTokenError') {
                await signIn();
            }
        }
    }, [session]);
    return null;
};

export default useSpotify;
