import React from 'react';
import {getProviders} from "next-auth/react";

const Login = ({providers}) => {
    return (
        <div className="">
            <img src="https://links.papareact.com/9xl" className="w-52 mb-5" alt=""/>
            {Object.values(providers).map((provider, index) => (
                <div>
                    <button>Login with {provider.name}</button>
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
