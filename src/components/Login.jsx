import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import Main from './styled-components/Main';
import useFormInput from '../utils/useFormInput';
import Alert from './Alerts';
import { Button, Container, TextField } from '@mui/material';

export default function Login() {
  const [form, setForm] = useState('login');

  const email = useFormInput('');
  const password = useFormInput('');
  const passwordVerification = useFormInput('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarSettings, setSnackBarSettings] = useState({
    severity: '',
    message: '',
  });

  const validationRules = {
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  };

  const validateForm = () => {
    let errorCounter = 0;

    if (password.value === '') {
      errorCounter++;
      setSnackBarSettings({
        severity: 'error',
        message: 'Please Enter Password.',
      });
      setOpenSnackbar(true);
    }
    if (email.value === '') {
      errorCounter++;
      setSnackBarSettings({
        severity: 'error',
        message: 'Enter email.',
      });
      setOpenSnackbar(true);
    }

    if (email.value) {
      const regex = validationRules.email;
      if (!regex.test(email.value)) {
        errorCounter++;
        setSnackBarSettings({
          severity: 'error',
          message: 'Invalid Email',
        });
        setOpenSnackbar(true);
      }
    }
    if (password.value) {
      const regex = validationRules.password;
      if (!regex.test(password.value)) {
        errorCounter++;
        setSnackBarSettings({
          severity: 'error',
          message: 'Invalid Password',
        });
        setOpenSnackbar(true);
      } else if (passwordVerification.value !== password.value) {
        errorCounter++;
        setSnackBarSettings({
          severity: 'error',
          message: "Password don't match",
        });
        setOpenSnackbar(true);
      }
    }

    if (errorCounter === 0) {
      setSnackBarSettings({
        severity: 'success',
        message: 'SignUp Successful',
      });
      setOpenSnackbar(true);
      setForm('login');
    }
  };

  const onSignUp = async () => {
    const isValidForm = validateForm();
    if (!isValidForm) return;

    const formData = new FormData();

    if (email.value) {
      formData.append('Email', email.value);
    }
    if (password.value) {
      formData.append('Password', password.value);
    }
  };

  const onSignIn = () => {
    console.log('Login');
  };

  return (
    <Container>
      <Main>
        <h1>{form === 'login' ? 'Login' : 'Sign-Up'}</h1>
        <p>
          Welcome to eFarm Manager Portal
        </p>
        <TextField
          autoFocus
          label="Email"
          variant="outlined"
          onChange={email.onChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          onChange={password.onChange}
        />
        {form === 'signup' && password.value !== '' && (
          <TextField
            label="Repeat Password"
            type="password"
            variant="outlined"
            onChange={passwordVerification.onChange}
          />
        )}

        {form === 'login' ? (
          <Link to = '/dashboard'>
            <Button onClick={onSignIn}>Login</Button>
          </Link>
        ) : (
          <Button onClick={onSignUp}>Sign-Up</Button>
        )}

        <p className="form-change">
          {form === 'login' ? (
            <Fragment>
              
            </Fragment>
          ) : (
            <Fragment>
              Already a member? Sign-in here!{' '}
              <span onClick={() => setForm('login')}>Login</span>
            </Fragment>
          )}
        </p>
        {openSnackbar && (
          <Alert
            open={true}
            setOpen={setOpenSnackbar}
            severity={snackBarSettings.severity}
            message={snackBarSettings.message}
          />
        )}
      </Main>
    </Container>
  );
}
