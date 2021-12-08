import React, {useCallback, useEffect, useState} from 'react';
import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    RewindIcon,
    SwitchHorizontalIcon
} from "@heroicons/react/solid";
import {VolumeUpIcon as VolumeDownIcon, HeartIcon, VolumeUpIcon} from "@heroicons/react/outline";
import {debounce} from "lodash";

const Player = () => {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume,setVolume] = useState(50);
    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log(`Now playing: ${data?.body?.item}`);
                setCurrentTrackId(data?.body?.item?.id);

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
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session]);

    useEffect(() => {
        if(volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume)
        }, 500),
        [],
    );

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data?.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    }


    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album?.images?.[0]?.url} alt=""/>
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

        {/*     center  */}

            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon
                    // onClick={() => spotifyApi.skipToPrevious()} does not work
                    className="button" />
                {isPlaying ? (
                    <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}

                <FastForwardIcon
                    // onClick={() => spotifyApi.skipToPrevious()} does not work
                    className="button" />

                <ReplyIcon className="button" />
            </div>

            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5" >
                <VolumeDownIcon className="button" onClick={() => volume > 0 && setVolume(volume - 10)} />
                <input className="w-14 md:w-28" value={volume} onChange={(e) => setVolume(Number(e.target.value))} type="range" min={0} max={100}/>
                <VolumeUpIcon className="button" onClick={() => volume < 100 && setVolume(volume + 10)} />
            </div>
        </div>
    );
};

export default Player;
