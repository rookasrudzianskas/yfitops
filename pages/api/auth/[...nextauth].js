import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorizationEndpoint: "https://accounts.spotify.com/authorize",
        }),
        // ...add more providers here
    ],
});
