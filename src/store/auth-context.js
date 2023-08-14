import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { BACKEND_BASE_URL } from '../global_variables';

const AuthContext = React.createContext({
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  loginModalOpened: false,
  login: () => { },
  logout: () => { },
  socialLogin: () => { },
  toggleLoginModal: () => { },
});

export const AuthContextProvider = props => {
  const [cookies, setCookie, removeCookie] = useCookies(['onboarding']);

  let initialToken = cookies.usertoken || null;
  let initialReftoken = cookies.refreshtoken || null;

  const [token, setToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState(initialReftoken);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const userIsLoggedIn = !!token;

  const socialLoginHandler = async (endpoint, accessToken, type) => {
    try {
      const socialLoginData = {
        accessToken: accessToken,
        type: type,
      };
      const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(socialLoginData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const tokenData = await response.json();
      if (tokenData.success) {
        console.log(tokenData)
        const accessToken = tokenData.data.result.accessToken;
        const refreshToken = tokenData.data.result.refreshToken;
        const expires = new Date();
        expires.setUTCDate(expires.setUTCDate() + 14);
        setCookie('usertoken', accessToken, {
          path: '/',
          expires: expires,
        });
        setCookie('refreshtoken', refreshToken, {
          path: '/',
          expires: expires
        });
        setToken(accessToken);
        setRefreshToken(refreshToken);
        return { error: false, success: true };
      } else {
        return { error: false, success: false };
      }
    } catch (e) {
      return { error: true, success: false };
    }
  };

  const loginHandler = async (id, password) => {
    try {
      const loginData = {
        id: id,
        password: password,
      };
      const response = await fetch(`${BACKEND_BASE_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const tokenData = await response.json();
      if (tokenData.success) {
        console.log(tokenData)
        const accessToken = tokenData.data.accessToken;
        const refreshToken = tokenData.data.refreshToken;
        const expires = new Date();
        expires.setUTCDate(expires.setUTCDate() + 14);
        setCookie('usertoken', accessToken, {
          path: '/',
          expires: expires,
        });
        setCookie('refreshtoken', refreshToken, {
          path: '/',
          expires: expires
        });
        setToken(accessToken);
        setRefreshToken(refreshToken);
        return { error: false, success: true };
      } else {
        return { error: false, success: false };
      }
    } catch (e) {
      return { error: true, success: false };
    }
  };

  const oAuthLoginhandler = (tokenData) => {
    if (tokenData.success) {
      const accessToken = tokenData.data.accessToken;
      const refreshToken = tokenData.data.refreshToken;

      const expires = new Date();
      expires.setUTCDate(expires.setUTCDate() + 14);

      setCookie('usertoken', accessToken, {
        path: '/',
        expires: expires,
      });
      setToken(accessToken);
      setRefreshToken(refreshToken);
      return { error: false, success: true };
    } else {
      return { error: false, success: false };
    }
  }

  const logoutHandler = () => {
    removeCookie('usertoken', { path: '/' });
    removeCookie('refreshtoken', { path: '/' });
    setToken(null);
    setRefreshToken(null);
    window.location.href = "/";
    return;
  };

  const toggleLoginModalHandler = () => {
    setLoginModalOpened(prevState => !prevState);
  }

  const contextValue = {
    token: token,
    refreshToken: refreshToken,
    isLoggedIn: userIsLoggedIn,
    loginModalOpened: loginModalOpened,
    login: loginHandler,
    oAuthLogin: oAuthLoginhandler,
    socialLogin: socialLoginHandler,
    logout: logoutHandler,
    toggleLoginModal: toggleLoginModalHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
