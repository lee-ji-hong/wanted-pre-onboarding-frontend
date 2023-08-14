import { useEffect } from "react";
import { BACKEND_BASE_URL } from "../global_variables";

const NaverLogin = ({ userInfo, setUserInfo, setGetToken }) => {
  const { naver } = window;

  const initializeNaverLogin = () => {
    if (naver) {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: "IoYLAsbOUnBFDytGCMHa", 
        callbackUrl: "http://localhost:3000/todo",
        isPopup: false,
        loginButton: { color: "green", type: 1, height: "48", width: "48" },
        callbackHandle: true,
      });
      naverLogin.init();

      naverLogin.getLoginStatus((status) => {
        console.log(`로그인?: ${status}`);
        if (status) {
          console.log(naverLogin)
          setUserInfo(naverLogin.user);
        }
      });
    } else {
      console.error("네이버 객체가 정의되지 않았습니다.");
    }
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <>
      <div id="naverIdLogin"></div>
    </>
  )
}

export default NaverLogin;