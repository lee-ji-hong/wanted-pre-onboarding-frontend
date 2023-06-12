import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hook/use-http';
import { FormHelperTexts } from '../../styles/GlobalStyle';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { VscAccount } from "react-icons/vsc";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

const SignUp = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { sendPostSignupRequest } = useHttpRequest();
  const navigate = useNavigate();

  //에러처리
  const errorMessage = responseData => {
    // console.log(responseData)
    if (responseData.success === false) {
      return setEmailError(responseData.errorData.message);
    } else if (responseData.success === true) {
      navigate(`/signin`);
      setEmailError('');
      return
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await sendPostSignupRequest({
      endpoint: '/auth/signup',
      bodyData: {
        email: inputs.email,
        password: inputs.password
      },
    }, (response) => {
      errorMessage(response);
    })
  }

  const validateInput = async (event) => {
    event.preventDefault();
    const { value, id: targetId } = event.target;
    setInputs((prevState) => { return { ...prevState, [targetId]: value } });

    //이메일 유효성 체크
    if (targetId === "email") {
      const emailRegex = /@/;
      if (!emailRegex.test(value)) setEmailError('올바른 이메일 형식이 아닙니다.');
      else setEmailError('');
    }

    // 비밀번호 유효성 체크
    if (targetId === "password") {
      const passwordRegex = /^.{8,}$/;
      if (!passwordRegex.test(value)) setPasswordError('8자리 이상 입력해주세요!');
      else setPasswordError('');
    }

  };

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <VscAccount size="30" />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            data-testid="email-input"
            error={emailError !== '' || false}
            onChange={validateInput}
          />
          <FormHelperTexts>{emailError}</FormHelperTexts>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            data-testid="password-input"
            autoComplete="current-password"
            error={passwordError !== '' || false}
            onChange={validateInput}
          />
          <FormHelperTexts>{passwordError}</FormHelperTexts>

          <Button
            data-testid="signup-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={emailError === '' && passwordError === '' && inputs.email !== '' && inputs.password !== '' ? false : true}
          >
            가입하기
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"로그인 페이지로 이동하시겠어요?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp;

