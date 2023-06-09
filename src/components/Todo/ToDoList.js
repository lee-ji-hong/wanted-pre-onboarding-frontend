import React, { useState, useEffect } from 'react';
import useHttpRequest from '../../hook/use-http';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/system';
const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const { sendGetRequest } = useHttpRequest();
  useEffect(() => {
    const getTodo = data => {
      setTodoList(data)
      console.log(data)
    }
    sendGetRequest(`/todos`, getTodo);
  }, []);
  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Todo</h1>
        {todoList.length > 0 && (
          <ul>
            {todoList.map((item) => {
              <li key={item.id}>
                {item.todo}
              </li>
            })}
          </ul>
        )}
        {todoList.length == 0 && (
          <div>리스트가 존재하지 않아요</div>
        )}
      </Box>
    </Container>
  );
}

export default TodoList;