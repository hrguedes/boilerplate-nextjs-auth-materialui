'use client'

import { GetServerSideProps } from "next";
import { useContext } from "react";
import { useRouter } from "next/router";

// ui
import { Button } from '@mui/material';

// context
import { AuthContext } from "@/src/contexts/AuthContext";

const Dashboard = () => {
    const { isAuthenticated, user, SignIn, LogOut, token } = useContext(AuthContext);
    const router = useRouter();
    async function logout() {
        router.push('/auth/logout');
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                <li>Autenticated: {isAuthenticated} </li>
                <li>Token: {token} </li>
                <li>User : {user?.name}
                    <ul>
                        <li>id: {user?.id} </li>
                        <li>name: {user?.name} </li>
                        <li>Is Autenticated: {user?.email} </li>
                        <li>Is Autenticated: {user?.roles} </li>
                        <li>Is Autenticated: {user?.token} </li>
                        <li>Is Autenticated: {user?.tokenExpires.getDay()} </li>
                        <li>Is Autenticated: {user?.userType} </li>
                    </ul>
                </li>
            </ul>
            <Button variant="contained" onClick={logout}>LogOut</Button>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const token = ctx.req.cookies['micro-erp.token'];
    // console.log(token);
    // if (!token) {
    //     console.log('redirect');
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false
    //         }
    //     }
    // }
    return {
        props: {}
    }
}

export default Dashboard;