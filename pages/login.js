import React from 'react';
import {getProviders, signIn} from "next-auth/react";

const Login = ({providers}) => {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img src="https://links.papareact.com/9xl" className="w-52 mb-5" alt=""/>
            {Object.values(providers).map((provider, index) => (
                <div key={provider.name} >
                    <button onClick={() => signIn(provider.id, {callbackUrl: '/'})} className="bg-[#18D860] text-white p-5 rounded-lg font-bold">Login with {provider.name}</button>
                </div>
            ))}
        </div>
    );
};

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    };
}
