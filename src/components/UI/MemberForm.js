import React, { useState } from 'react';
import { FormHelperTexts } from '../../styles/GlobalStyle';
import { Box, TextField } from '@mui/material';

const MemberForm = ({ errors, setErrors, setInputs, inputFields }) => {

  const validateInput = async (event) => {
    event.preventDefault();
    const { value, id: targetId } = event.target;
    setInputs((prevState) => { return { ...prevState, [targetId]: value } });

    //이메일 유효성 체크
    if (targetId === "id") {
      const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!emailRegex.test(value)) setErrors({ ...errors, id: '올바른 이메일 형식이 아닙니다.' });
      else setErrors({ ...errors, id: '' });
    }

    // 비밀번호 유효성 체크
    if (targetId === "password") {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-~])(?=.*[0-9]).{8,25}$/;
      if (!passwordRegex.test(value)) setErrors({ ...errors, password: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!' });
      else setErrors({ ...errors, password: '' });
    }

    // 이름 유효성 검사
    if (targetId === "name") {
      const nameRegex = /^[가-힣a-zA-Z]+$/;
      if (!nameRegex.test(value) || value.length < 1) {
        setErrors({ ...errors, name: '올바른 이름을 입력해주세요.' });
      } else setErrors({ ...errors, name: '' });
    }

    // 전화번호
    if (targetId === "phoneNumber") {
      let numregex = /[^0-9]/g
      if (numregex.test(value)) {
        setErrors({ ...errors, phoneNumber: '숫자만 입력해주세요!' });
      }
      else if (value === '') {
        setErrors({ ...errors, phoneNumber: '전화번호를 입력해주세요' });
      }
      else if (value.length !== 11) {
        setErrors({ ...errors, phoneNumber: '전화번호 11자리를 모두 입력해주세요' });
      }
      else setErrors({ ...errors, phoneNumber: '' });
    }

  };

  return (
    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
      {inputFields.map((item) => (
        <React.Fragment key={item.id}>
          <TextField
            margin="normal"
            required
            fullWidth
            id={item.id}
            label={item.label}
            name={item.id}
            autoComplete={item.id}
            autoFocus
            error={errors[item.id] !== '' || false}
            onChange={validateInput}
          />
          <FormHelperTexts>{errors[item.id]}</FormHelperTexts>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default MemberForm;