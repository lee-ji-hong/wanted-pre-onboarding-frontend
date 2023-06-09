import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../store/localStorage';
import TodoList from '../components/Todo/ToDoList';
const ToDoPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.getLocalStorage('item')) {
      navigate(`/signin`);
    }
  }, []);
  return (
    <TodoList />
  );
}

export default ToDoPage;