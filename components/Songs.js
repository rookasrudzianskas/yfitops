import React from 'react';
import {playlistState} from "../atoms/playlistAtom";
import {useRecoilValue} from "recoil";

const Songs = () => {
    const playlist = useRecoilValue(playlistState);

    return (
        <div className="">
            {playlist?.tracks.items.map((track, index) => (
                <div className="" key={index}>
                    {track.track.name}
                </div>
            ))}
        </div>
    );
};

export default Songs;
