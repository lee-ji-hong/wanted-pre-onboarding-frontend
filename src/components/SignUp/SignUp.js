import React, { useState } from 'react';

import { Box, Divider, Link, Grid, Container, Typography, CssBaseline } from '@mui/material';

import MemberForm from '../UI/MemberForm';
import CustomButton from '../UI/CustomButton';

const SignUp = () => {
  const [errors, setErrors] = useState({ id: '', password: '', name: '', phoneNumber: '' });
  const [inputs, setInputs] = useState({ id: '', password: '', name: '', phoneNumber: '' });

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
    {
      id: 'name',
      label: '이름',
      autoComplete: 'name',
      type: 'text',
    },
    {
      id: 'phoneNumber',
      label: '전화번호',
      autoComplete: 'tel',
      type: 'tel',
    }
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
        <Typography color="#ACB3BF">SNS계정으로 간편하게 회원가입</Typography>
        <Grid container p="20px">
          {['google', 'kakaotalk', 'naver'].map((image) => (
            <Grid key={image} item xs={4}>
              <img alt={image} src={`./${image}.png`} />
            </Grid>
          ))}
        </Grid>
        <Divider width="100%" />
        <br />
        <MemberForm
          errors={errors}
          setErrors={setErrors}
          setInputs={setInputs}
          inputFields={inputFields}
        />
        <CustomButton
          label="가입하기"
          inputs={inputs}
          errors={errors}
          setErrors={setErrors}
          disabled={errors.id === '' && errors.password === '' && errors.name === '' && errors.phoneNumber === '' && inputs.id !== '' && inputs.password !== '' && inputs.name !== '' && inputs.phoneNumber !== '' ? false : true}
        />
        <Grid container>
          <Grid item>
            <Link href="/signin" variant="body2">
              {"로그인 페이지로 이동하시겠어요?"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default SignUp;

