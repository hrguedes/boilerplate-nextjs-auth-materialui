import { useEffect, useContext } from 'react';
// context
import { AuthContext } from '@/src/contexts/AuthContext';

const Logout = () => {
    const { LogOut } = useContext(AuthContext);
    useEffect(() => {
        LogOut();
    }, []);
    return <div>Logging out...</div>;
}
export default Logout;