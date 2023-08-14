import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import Kakao from "react-kakao-login";

import AuthContext from '../store/auth-context';

const KakaoLogin = ({ callback }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmitLogin = (token) => {
    // event.preventDefault();
    authCtx
      .socialLogin('/users/signup/oauth', token, 'KAKAO')
      .then(data => {
        if (data.error) {
          throw new Error();
        } else if (data.success === false) {
          alert('인증정보가 올바르지 않습니다.');
          return;
        } else {
          if (callback) {
            callback();
          } else {
            navigate('/todo');
          }
          return;
        }
      })
      .catch(event => {
        alert('인증이 실패했거나 오류가 발생했습니다!');
      });
    return;
  };

  const getToken = (token) => {
    localStorage.setItem('access_token', token)
    handleSubmitLogin(token)
  }

  const kakaoClientId = '93de4aa31db40af94b2caf2b7e781e9f'
  const kakaoOnSuccess = async (data) => {
    console.log(data)
    const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    if (idToken) {
      console.log(idToken)
      getToken(idToken);
    }
  }
  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <div>
        {/* <img alt="카카오로그인" src={`./kakaotalk.png`} style={{ height: '48px' }} /> */}
        <Kakao
          token={kakaoClientId}
          onSuccess={kakaoOnSuccess}
          onFail={kakaoOnFailure}
          style={{
            height: '48px',
            width: '48px',
            cursor: 'pointer',
            fontSize: 0,
            backgroundImage: 'url("./kakaotalk.png")',
          }}
        />
      </div>
    </>
  )
}

export default KakaoLogin;