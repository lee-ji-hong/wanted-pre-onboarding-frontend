import React, { useState, useEffect } from 'react';
import useHttpRequest from '../../hook/use-http';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/system';
import { Grid, List, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
const TodoList = () => {
  const [todo, setTodo] = useState(-1);
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [checked, setChecked] = React.useState(false);
  const { sendGetRequest, sendPostRequest, sendPutRequest, sendDelRequest } = useHttpRequest();


  const handleToggle = (value) => {
    console.log(value, !value)
    setChecked(!value)
  };

  const onChange = async (event) => {
    event.preventDefault();
    setTodo(event.target.value);
    console.log(event.target.value)
  }

  const addItem = async () => {
    await sendPostRequest({
      endpoint: '/todos',
      bodyData: {
        todo: todo,
      },
    }, (response) => {
      console.log(response)
      // errorMessage(response);
    })
    setTodo('')
  }

  const handleEditSubmit = async (target) => {
    console.log(todo)
    await sendPutRequest({
      endpoint: `/todos/${target.id}`,
      bodyData: {
        todo: todo,
        isCompleted: checked
      },
    }, (response) => {
      console.log(response)
      // errorMessage(response);
    })
    setTodo('')
  }

  const handleEditCancel = () => {
    setEditIndex(''); // Disable the edit mode
    setTodo('')
  };

  const handleDelete = async (target) => {
    console.log(todo)
    await sendDelRequest({
      endpoint: `/todos/${target}`,
    }, (response) => {
      console.log(response)
      // errorMessage(response);
    })
    setTodo('')
  };

  useEffect(() => {
    const getTodo = data => {
      setTodoList(data)
      console.log(data)
    }
    sendGetRequest(`/todos`, getTodo);
  }, [setTodo]);

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
            {todoList.map((todo, index) => {
              return (
                <ListItem
                  key={todo.id}
                  disablePadding
                >
                  {editIndex === todo.id ? (
                    <ListItemButton>
                      <ListItemIcon>
                        <Checkbox onClick={() => handleToggle(todo.isCompleted)} />
                      </ListItemIcon>
                      <input data-testid="modify-input" onChange={onChange} />
                      <Button data-testid="submit-button" onClick={() => handleEditSubmit(todo)}>제출</Button>
                      <Button data-testid="cancel-button" onClick={() => handleEditCancel}>취소</Button>
                    </ListItemButton>
                  ) : (
                    <>
                      <ListItemButton dense>
                        <ListItemIcon>
                          <Checkbox onClick={() => handleToggle(todo.isCompleted)} />
                        </ListItemIcon>
                        <ListItemText id={todo.id} primary={todo.todo} />
                      </ListItemButton>
                      <Button data-testid="modify-button" onClick={() => setEditIndex(todo.id)}>수정</Button>
                      <Button data-testid="delete-button" onClick={() => handleDelete(todo.id)}>삭제</Button>
                    </>
                  )}
                </ListItem>
              )
            })}
          </List>
        )}
        {todoList.length === 0 && (
          <div>리스트가 존재하지 않아요</div>
        )}
      </Box>
    </Container>
  );
}

export default TodoList;