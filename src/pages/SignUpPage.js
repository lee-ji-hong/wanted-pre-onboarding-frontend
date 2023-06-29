import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../store/localStorage';
import SignUp from '../components/SignUp/SignUp';

const SignUpPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (store.getLocalStorage('item')) {
      navigate(`/`);
      console.log('로컬스토리지 있음')
    }
  }, []);

  return (
    <SignUp />
  )
}

export default SignUpPage;

