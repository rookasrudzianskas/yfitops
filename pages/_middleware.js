import {NextResponse} from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    // token will exists if the user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const {pathname} = req.nextUrl;

    // if the user is logged in, add the token to the request
    // if the token is, I let you to go
    if(pathname.includes('/api/auth') || token) {
        // console.log(pathname);
        // console.log('This really works 🚀');
        // console.log(NextResponse.next());
        return NextResponse.next();
    }

    // redirect them to login if they dont have a token AND requesting route is a protected route

    if(!token && pathname !== '/login') {
        // console.log('Alright this works too 🚀')
        return NextResponse.redirect('/login');
    }

}
