import React, { useState } from 'react';

import {Box,Link,Grid,Container,CssBaseline} from '@mui/material';

import MemberForm from '../UI/MemberForm';
import CustomButton from '../UI/CustomButton';

const SignIn = () => {
  const [errors, setErrors] = useState({ id: '', password: '' });
  const [inputs, setInputs] = useState({ id: '', password: '' });

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
            <Grid item>
              <Link href="/signup" variant="body2">
                {"회원 가입을 진행하시겠어요?"}
              </Link>
            </Grid>
          </Grid>
      </Box>
    </Container>
  );

}

export default SignIn;