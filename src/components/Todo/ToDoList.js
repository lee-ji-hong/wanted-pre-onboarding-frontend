import React, { useState, useEffect } from 'react';
import useHttpRequest from '../../hook/use-http';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/system';
import { Grid, List, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';

const TodoList = () => {
  const [todo, setTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [checked, setChecked] = useState(false);
  const { sendGetRequest, sendPostRequest, sendPutRequest, sendDelRequest } = useHttpRequest();

  console.log(editTodo)
  const handleToggle = (value) => {
    setChecked(!value);
  };

  const onChange = (event) => {
    event.preventDefault();
    setTodo(event.target.value);
  };

  const onEditChange = (event) => {
    event.preventDefault();
    setEditTodo(event.target.value);
  };

  const addItem = async () => {
    await sendPostRequest({
      endpoint: '/todos',
      bodyData: {
        todo: todo,
      },
    }, (response) => {
      console.log(response);
      // errorMessage(response);
    });
    setTodo('');
    sendGetRequest(`/todos`, (data) => {
      setTodoList(data);
    });
  };

  const handleEditSubmit = async (target) => {
    console.log(editTodo);
    await sendPutRequest({
      endpoint: `/todos/${target.id}`,
      bodyData: {
        todo: editTodo,
        isCompleted: checked,
      },
    }, (response) => {
      console.log(response);
      // errorMessage(response);
    });
    setEditIndex(-1);
    setEditTodo('');
    sendGetRequest(`/todos`, (data) => {
      setTodoList(data);
    });
  };

  const handleEditCancel = () => {
    setEditIndex(-1);
    setEditTodo('');
  };

  const handleDelete = async (target) => {
    await sendDelRequest({
      endpoint: `/todos/${target}`,
    }, (response) => {
      console.log(response);
      // errorMessage(response);
    });
    sendGetRequest(`/todos`, (data) => {
      setTodoList(data);
    });
  };

  useEffect(() => {
    sendGetRequest(`/todos`, (data) => {
      setTodoList(data);
    });
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
        <Grid
          container
          spacing={1}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Grid item xs={8}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="newTodo"
              label="New"
              name="newTodo"
              autoFocus
              data-testid="new-todo-input"
              onChange={onChange}
              value={todo}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              data-testid="new-todo-add-button"
              type="button"
              onClick={addItem}
              variant="contained"
              label={'margin="normal"'}
              sx={{ width: '100%', height: '54px', textAlign: 'center', fontWeight: '600' }}
            >
              추가
            </Button>
          </Grid>
        </Grid>

        {todoList.length > 0 && (
          <List sx={{ margin: '0 auto', width: '100%' }}>
            {todoList.map((todoItem) => {
              return (
                <ListItem key={todoItem.id} disablePadding>
                  {editIndex === todoItem.id ? (
                    <ListItemButton>
                      <ListItemIcon>
                        <Checkbox onClick={() => handleToggle(todoItem.isCompleted)} />
                      </ListItemIcon>
                      <input
                        data-testid="modify-input"
                        onChange={onEditChange}
                        value={editTodo}
                      />
                      <Button data-testid="submit-button" onClick={() => handleEditSubmit(todoItem)}>제출</Button>
                      <Button data-testid="cancel-button" onClick={handleEditCancel}>취소</Button>
                    </ListItemButton>
                  ) : (
                    <>
                      <ListItemButton dense>
                        <ListItemIcon>
                          <Checkbox onClick={() => handleToggle(todoItem.isCompleted)} />
                        </ListItemIcon>
                        <ListItemText id={todoItem.id} primary={todoItem.todo} />
                      </ListItemButton>
                      <Button data-testid="modify-button" onClick={() => setEditIndex(todoItem.id)}>수정</Button>
                      <Button data-testid="delete-button" onClick={() => handleDelete(todoItem.id)}>삭제</Button>
                    </>
                  )}
                </ListItem>
              );
            })}
          </List>
        )}
        {todoList.length === 0 && (
          <div>리스트가 존재하지 않아요</div>
        )}
      </Box>
    </Container>
  );
};

export default TodoList;
