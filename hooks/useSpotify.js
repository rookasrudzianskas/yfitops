import React from 'react';
import {useSession} from "next-auth/react";

const useSpotify = () => {
    const {data: session, status} = useSession();

    return (
        <div>

        </div>
    );
};

export default useSpotify;
