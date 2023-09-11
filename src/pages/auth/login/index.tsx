import { Inter } from 'next/font/google'
import { useContext, useState } from 'react'

// ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid'; // Grid version 1
import { CircularProgress } from '@mui/material';

// context
import { AuthContext } from '@/src/contexts/AuthContext';

// services
import ApiService from '@/src/services/ServiceApi';

// models
import UserAutenticated from '@/src/models/responses/UserAutenticated';
import ReturnOk from '@/src/models/Base/ReturnOk';
import Copyright from '@/src/components/molecules/Copyright';


const inter = Inter({ subsets: ['latin'] })
const Login = () => {
    const { SignIn } = useContext(AuthContext);
    const [inputUser, setInputUser] = useState('');
    const [inputUserError, setInputUserError] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordError, setInputPasswordError] = useState(false);
    const [alerts, setAlerts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);


    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        var api = new ApiService();

        if (inputUser === '') {
            setInputUserError(true);
        } else {
            setInputUserError(false);
        }
        if (inputPassword === '') {
            setInputPasswordError(true);
        } else {
            setInputPasswordError(false);
        }

        if (inputUser === '' || inputPassword === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please insert all inputs!',
            });
            setLoading(false);
            return;
        }


        // const ret: ReturnOk<UserAutenticated> = await api.post("/v1/Auth/login", {
        //     email: 'hugo.guedes@hrguedes.dev',
        //     password: '123123'
        // });
        // mocking var ret for testing
        var ret = {
            ok: true,
            response: {
                user: {
                    id: "1",
                    name: 'Hugo Guedes',
                    email: 'mail@mail.com',
                    userType: 'ROOT',
                },
                roles: ['admin'],
                token: 'token',
                tokenExpires: new Date()
            },
            messages: [{
                message: 'Success',
                key: 'Success'
            }]
        };
        if (ret.ok) {
            if (ret.response)
                await SignIn({
                    user: ret.response.user,
                    roles: ret.response.roles,
                    token: ret.response.token,
                    tokenExpires: ret.response.tokenExpires
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ret.messages[0].message,
            });
            setAlerts(ret.messages.map(x => x.message));
        }
    }


    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            error={inputUserError}
                            fullWidth
                            onChange={(e) => setInputUser(e.target.value)}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={inputPasswordError}
                            name="password"
                            label="Password"
                            type="password"
                            onChange={(e) => setInputPassword(e.target.value)}
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                       <Button
                            type="submit"
                            fullWidth
                            disabled={loading}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <span>Sign In</span>
                            )}
                            
                        </Button>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
export default Login;