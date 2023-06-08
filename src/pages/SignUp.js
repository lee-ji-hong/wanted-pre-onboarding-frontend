import React, { useState } from 'react';
import useHttpRequest from '../hook/use-http';

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

  const { sendPostRequest } = useHttpRequest();

  //에러처리
  const errorMessage = responseData => {
    console.log(responseData)
    if (responseData.success === false) {
      console.log('통고ㅏ')
      return
      // return setSnackbar({ children: responseData.error.errorMessage, severity: 'error' });
    } else {
      console.log('실패')
      // setSnackbar({ children: '처리 완료되었습니다.', severity: 'success' });
      return
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await sendPostRequest({
      endpoint: '/auth/signup',
      bodyData: {
        email: data.get('email'),
        password: data.get('password'),
      },
    }, (response) => {
      console.log(response)
      errorMessage(response);
    })
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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

