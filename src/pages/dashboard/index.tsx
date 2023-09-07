import { GetServerSideProps } from "next";
import { useContext } from "react";
import { useRouter } from "next/router";

// ui
import { Button } from '@mui/material';

// context
import { AuthContext } from "@/src/contexts/AuthContext";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    async function logout() {
        // redirect to login
        router.push('/auth/logout');
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <Button variant="contained" onClick={logout}>LogOut</Button>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = ctx.req.cookies['micro-erp.token'];
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default Dashboard;