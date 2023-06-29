import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import AuthContext from '../../store/auth-context';
import useHttpRequest from '../../hook/use-http';

const CustomButton = ({ label, inputs, disabled, errors, setErrors,callback }) => {
  const { sendPostRequest } = useHttpRequest();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  //에러처리
  const errorMessage = responseData => {
    // console.log(responseData)
    if (responseData.success === false) {
      return setErrors({ ...errors, id: responseData.errorData.message });
    } else if (responseData.success === true) {
      navigate(`/signin`);
      setErrors({ ...errors, id: '' });
      return
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await sendPostRequest({
      endpoint: '/users/signup',
      bodyData: {
        id: inputs.id,
        password: inputs.password,
        name: inputs.name,
        phoneNumber: inputs.phoneNumber,
      },
    }, (response) => {
      errorMessage(response);
    })
  }

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    console.log(authCtx)
    authCtx
      .login(inputs.id, inputs.password)
      .then(data => {
        console.log(data)
        if (data.error) {
          throw new Error();
        } else if (data.success === false) {
          alert('인증정보가 올바르지 않습니다.');
          return;
        } else {
          if (callback) {
            callback();
          } else {
            navigate('/');
          }
          return;
        }
      })
      .catch(event => {
        alert('인증이 실패했거나 오류가 발생했습니다!');
      });
    return;
  };


  return (
    <Button
      data-testid="custom-button"
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={window.location.pathname === '/signin' ? handleSubmitLogin : handleSubmit}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
