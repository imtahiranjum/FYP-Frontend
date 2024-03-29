import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from 'components/Typography';
import AppForm from 'components/AppForm';
import { email, required } from 'form/validation';
import RFTextField from 'form/RFTextField';
import FormButton from 'form/FormButton';
import FormFeedback from 'form/FormFeedback';
import { useNavigate } from 'react-router-dom';
// import Typography from './modules/components/Typography';
// import AppFooter from './modules/views/AppFooter';
// import AppAppBar from './modules/views/AppAppBar';
// import AppForm from './modules/views/AppForm';
// import { email, required } from './modules/form/validation';
// import RFTextField from './modules/form/RFTextField';
// import FormButton from './modules/form/FormButton';
// import FormFeedback from './modules/form/FormFeedback';
// import withRoot from './modules/withRoot';

const loginAPI = 'https://tararoutray.com/demo/react-auth/login.php';
const navigate = useNavigate();
const submitLoginForm = (event) => {
    event.preventDefault();
    const formElement = document.querySelector('#loginForm');
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);
    const btnPointer = document.querySelector('#login-btn');
    btnPointer.innerHTML = 'Please wait..';
    btnPointer.setAttribute('disabled', true);
    axios.post(loginAPI, formDataJSON).then((response) => {
        btnPointer.innerHTML = 'Login';
        btnPointer.removeAttribute('disabled');
        const data = response.data;
        const token = data.token;
        if (!token) {
            alert('Unable to login. Please try after some time.');
            return;
        }
        localStorage.clear();
        localStorage.setItem('user-token', token);
        setTimeout(() => {
            navigate('/');
        }, 500);
}).catch((error) => {
        btnPointer.innerHTML = 'Login';
        btnPointer.removeAttribute('disabled');
        alert("Oops! Some error occured.");
    });
}


function SignIn() {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link
              href={"/signup"}
              align="center"
              underline="always"
            >
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default SignIn;
