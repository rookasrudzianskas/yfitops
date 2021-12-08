import React, {useState} from 'react';
import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";

const Player = () => {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume,setVolume] = useState(50);


    return (
        <div className="">
            {/* left */}
            <div>
                <img src="" alt=""/>
            </div>
        </div>
    );
};

export default Player;
