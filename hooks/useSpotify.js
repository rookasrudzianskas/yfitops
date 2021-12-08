import React, {useEffect} from 'react';
import {signIn, useSession} from "next-auth/react";
import spotifyApi from "../lib/spotify";

const useSpotify = () => {
    const {data: session, status} = useSession();

    useEffect(async () => {
        if (session) {
            // if refreshed access token fails, so direct the user to manual login again
            if (session.error === 'RefreshAccessTokenError') {
                await signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
};

export default useSpotify;
