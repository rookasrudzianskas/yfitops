import React, {useEffect} from 'react';
import {signIn, useSession} from "next-auth/react";
import spotifyApi from "../lib/spotify";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
});

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
