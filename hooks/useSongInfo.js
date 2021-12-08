import React, {useEffect, useState} from 'react';
import useSpotify from "./useSpotify";
import {useRecoilState} from "recoil";
import {currentTrackIdState} from "../atoms/songAtom";

const useSongInfo = () => {

    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                );
            }
        }

        fetchSongInfo();
    }, []);

    return (
        <div>

        </div>
    );
};

export default useSongInfo;
