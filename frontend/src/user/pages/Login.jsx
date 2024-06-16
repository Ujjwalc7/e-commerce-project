import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../store/slice/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

export default function Login() {
  const [user, setUser] = useState({
    email: {
      value: '',
      error: false
    },
    password: {
      value: '',
      error: false
    },
  });
  const error = useSelector(state=>state.auth.error);
  const loggedIn = useSelector(state=>state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{1,}$/;
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name === 'email') {
      setUser({...user, [name]:{...user[name], value:value, error: value !== '' ? !emailRegex.test(value) : false}});
      return;
    }
    setUser({...user, [name]:{...user[name], value: value}});
  }
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(user.email.error){
      return;
    }
    const body = {
      email: user.email.value,
      password: user.password.value
    };
    dispatch(loginThunk(body));
  };

  useEffect(()=>{
    if(loggedIn){
      navigate(location.state ? location.state : '/');
    }
  },[loggedIn]);
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 8
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, background: 'white' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type='email'
              name="email"
              autoFocus
              value={user.email.value}
              onChange={handleChange}
              error={user.email.error}
              helperText={user.email.error && user.email.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={user.password.value}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Box>
      </Container>
  );
}