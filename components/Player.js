import React, {useEffect, useState} from 'react';
import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";

const Player = () => {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume,setVolume] = useState(50);
    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentTrackId(data?.body?.item?.id);
                console.log(`Now playing: ${data?.body?.item}`);

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data?.body?.is_playing);
                });
            });
        }
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId) {
            // fetch the song ingo
            fetchCurrentSong();
        }
    }, [currentTrackId, spotifyApi, session]);


    return (
        <div className="">
            {/* left */}
            <div>
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album?.images?.[0]?.url} alt=""/>
            </div>
        </div>
    );
};

export default Player;
