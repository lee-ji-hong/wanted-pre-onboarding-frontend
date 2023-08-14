import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../store/localStorage';
import SignIn from '../components/SignIn/SignIn';

const SignInPage = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (store.getLocalStorage('item')) {
  //     navigate(`/todo`);
  //     console.log('로컬스토리지 있음')
  //   }
  // }, []);

  return (
    <SignIn />
  );
}

export default SignInPage;