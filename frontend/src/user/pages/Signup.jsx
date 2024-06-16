
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
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { signUpThunk } from '../../store/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Signup() {
  const [formValues, setFormValues] = useState({
    firstName:{
      value: '',
      error: false,
      message: 'No special characters'
    },
    lastName:{
      value: '',
      error: false,
      message: 'No special characters'
    },
    email:{
      value: '',
      error: false,
      message: 'Enter a valid email address'
    },
    password:{
      value: '',
      error: false,
      message: ''
    },
    phoneNumber:{
      value: '',
      error: false,
      message: 'Only numbers allowed'
    },
  });
  const dispatch = useDispatch();
  const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{1,}$/;
  const regex = /^[a-zA-Z]+[a-zA-Z]$/;
  const phoneRegex = /^[0-9]*$/;
  const navigate = useNavigate();
  const error = useSelector(state=>state.auth.error);
  const loggedIn = useSelector(state=>state.auth.isAuthenticated);


  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name === 'email') {
      setFormValues({...formValues, [name]:{...formValues[name], value:value, error: value !== '' ? !emailRegex.test(value) : false}});
      return;
    }else if(name === 'firstName' || name === 'lastName') {
      // converting first letter of the string to upper case
      const string = value.replace(/\b\w/g, (char) => char.toUpperCase());
      setFormValues({...formValues, [name]:{...formValues[name], value: string, error: value !== '' ? !regex.test(value) : false}});
      return;
    }else if(name === 'phoneNumber'){
      setFormValues({...formValues, [name]:{...formValues[name], value: value, error: value !== '' ? !phoneRegex.test(value) : false}});
      return;
    }
    setFormValues({...formValues, [name]:{...formValues[name], value: value}});
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(formValues.email.error || formValues.firstName.error || formValues.lastName.error || formValues.phoneNumber.error){
      return;
    }
    const body = {
      firstName: formValues.firstName.value,
      lastName: formValues.lastName.value,
      email: formValues.email.value,
      password: formValues.password.value,
      phoneNumber: formValues.phoneNumber.value,
    };
    // console.log(body);
    dispatch(signUpThunk(body));
  };
  
  useEffect(()=>{
    if(loggedIn){
      navigate('/')
    }
  },[loggedIn])

  
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, background: 'white' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formValues.firstName.value}
                  onChange={handleChange}
                  error={formValues.firstName.error}
                  helperText={formValues.firstName.error && formValues.firstName.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formValues.lastName.value}
                  onChange={handleChange}
                  error={formValues.lastName.error}
                  helperText={formValues.lastName.error && formValues.lastName.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formValues.email.value}
                  onChange={handleChange}
                  error={formValues.email.error}
                  helperText={formValues.lastName.error && formValues.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password.value}
                  onChange={handleChange}
                  error={formValues.password.error}
                  helperText={formValues.password.error && formValues.password.message}
                  inputProps={{minLength:6, maxLength:15}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Mobile Number"
                  type="tel"
                  id="phoneNumber"
                  value={formValues.phoneNumber.value}
                  onChange={handleChange}
                  error={formValues.phoneNumber.error}
                  helperText={formValues.phoneNumber.error && formValues.phoneNumber.message}
                  inputProps={{maxLength:10}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Box>
      </Container>
  );
}
