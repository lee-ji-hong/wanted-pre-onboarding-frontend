import React, { useState } from 'react';

import {Box,Link,Grid,Container,CssBaseline} from '@mui/material';

import MemberForm from '../UI/MemberForm';
import CustomButton from '../UI/CustomButton';
import NaverLogin from '../NaverLogin';
import KakaoLogin from '../KakaoLogin';

const SignIn = () => {
  const [errors, setErrors] = useState({ id: '', password: '' });
  const [inputs, setInputs] = useState({ id: '', password: '' });
  const [userInfo, setUserInfo] = useState(null);
  const [getToken, setGetToken] = useState(null);
  console.log(inputs)

  const inputFields = [
    {
      id: 'id',
      label: '아이디(이메일)',
      autoComplete: 'id',
      type: 'text',
    },
    {
      id: 'password',
      label: '비밀번호',
      autoComplete: 'current-password',
      type: 'password',
    },
  ];

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
        <MemberForm
          errors={errors}
          setErrors={setErrors}
          setInputs={setInputs}
          inputFields={inputFields}
        />
        <CustomButton
        label="로그인하기"
        inputs={inputs}
        errors={errors}
        setErrors={setErrors}
        disabled={errors.id === '' && errors.password === '' && inputs.email !== '' && inputs.password !== '' ? false : true}
        />
          <Grid container>
            <Grid item xs={12}>
              <Link href="/signup" variant="body2">
                {"회원 가입을 진행하시겠어요?"}
              </Link>
            </Grid><br/><br/><br/>
            <Grid item xs={4}>
            <img alt="구글로그인" src={`./google.png`} style={{ height: '48px' }} />
          </Grid>
          <Grid item xs={4}>
            <NaverLogin
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setGetToken={setGetToken} />
          </Grid>
          <Grid item xs={4}>
            <KakaoLogin />
          </Grid>
          </Grid>
      </Box>
    </Container>
  );

}

export default SignIn;