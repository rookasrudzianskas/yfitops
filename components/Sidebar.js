import React, {useEffect, useState} from 'react';
import {HeartIcon, HomeIcon, LibraryIcon, RssIcon, SearchIcon} from '@heroicons/react/outline';
import {PlusCircleIcon} from "@heroicons/react/outline";
import {signOut, useSession} from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import {useRecoilState} from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";


const Sidebar = () => {
    const spotifyApi = useSpotify();
    const {data: session} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);


    useEffect(() => {
        if(spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);
    // console.log(playlistId);

    // console.log(playlist);
    // console.log(session)

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div className="space-y-4">
                <button onClick={() => signOut()} className="flex items-center space-x-2 hover:text-white">
                    <p>Log Out</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />


            {/*    playlist */}


                {playlists.map((playlist) => (
                    <div onClick={() => setPlaylistId(playlist.id)} className="flex items-center space-x-2 hover:text-white cursor-pointer" key={playlist.id}>
                        <p>{playlist.name}</p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Sidebar;
