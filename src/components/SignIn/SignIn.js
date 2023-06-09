import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import store from "../../store/localStorage";
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

const SignIn = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { sendPostRequest } = useHttpRequest();
  const navigate = useNavigate();

  //에러처리
  const errorMessage = responseData => {
    console.log(responseData)
    if (responseData.success === false) {
      return setEmailError(responseData.errorData.message);
    } else if (responseData.success === true) {
      navigate(`/todo`);
      setEmailError('');
      store.setLocalStorage(responseData.responseData.access_token);
      return
    }
  }

  const handleSubmit = async (joinData) => {
    const { email, password } = joinData;

    await sendPostRequest({
      endpoint: '/auth/signin',
      bodyData: {
        email: email,
        password: password
      },
    }, (response) => {
      errorMessage(response);
    })
  }

  const validateInput = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const joinData = {
      email: data.get('email'),
      password: data.get('password')
    }
    const { email, password } = joinData;

    //이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password))
      setPasswordError('8자리 이상 입력해주세요!');
    else setPasswordError('');

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      handleSubmit(joinData);
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
          로그인
        </Typography>
        <Box component="form" onSubmit={validateInput} noValidate sx={{ mt: 1 }}>
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
          />
          <FormHelperTexts>{passwordError}</FormHelperTexts>
          <Button
            data-testid="signin-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인하기
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"회원 가입을 진행하시겠어요?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );

}

export default SignIn;