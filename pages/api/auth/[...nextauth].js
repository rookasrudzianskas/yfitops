import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
import {LOGIN_URL} from "../../../lib/spotify";
import {refreshAccessToken} from "spotify-web-api-node/src/server-methods";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({token, account, user}) {
            // initial sign in
            if(account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000, // we are handling the expiry times in milliseconds Hence * 1000
                }
            }

            // refresh token
            // return the last token if the access token has not expired yet
            if(Date.now() < token.accessTokenExpires) {
                console.log('EXISTING ACCESS TOKEN IS VALID');
                return token;
            }

            // access token has expired, so we need to refresh it
            console.log('EXISTING ACCESS TOKEN HAS EXPIRED< REFRESHING IT');
            return await refreshAccessToken(token);

        },
    },
});
