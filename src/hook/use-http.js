import { useState, useContext, useCallback } from 'react';
import { BACKEND_BASE_URL } from '../global_variables';
import store from '../store/localStorage';
import AuthContext from '../store/auth-context';

const useHttpRequest = (isLoadingInit = false) => {
  const [isLoading, setIsLoading] = useState(isLoadingInit);
  const authCtx = useContext(AuthContext);

  const sendGetRequest = useCallback(
    async (endpoint, callback, errorHandler) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const timeout = setTimeout(() => {
        signal.aborted();
      }, 1000);

      setIsLoading(true);
      try {
        let response;
        if (store.getLocalStorage('item')) {
          response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
            headers: {
              Authorization: 'Bearer ' + store.getLocalStorage('item'),
            },
            signal,
          });
        } else {
          response = await fetch(`${BACKEND_BASE_URL}${endpoint}`);
        }

        if (!response.ok) {
          throw Error('Some thing went Error');
        }

        const responseData = await response.json();
        callback(responseData);
      } catch (err) {
        errorHandler(err)
        console.error(err);
      }
      clearTimeout(timeout);
      setIsLoading(false);
    },
    [authCtx.token]
  );
  const sendPostSignupRequest = useCallback(
    async (requestOption, callback = () => { }) => {

      const { endpoint, bodyData } = requestOption;
      try {
        const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
          method: 'POST',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
          },
          // signal,
        });
        if (!response.ok) {
          const errorData = await response.json();
          callback({ success: false, errorData });
          throw Error('Some thing went Error');
        }
        callback({ success: true });
      } catch (err) {
        console.error(err);
      }
      // clearTimeout(timeout);
    },
    []
  );

  const sendPostRequest = useCallback(
    async (requestOption, callback = () => { }) => {
      // const controller = new AbortController();
      // const signal = controller.signal;
      // const timeout = setTimeout(() => {
      //   signal.aborted();
      // }, 2000);

      const { endpoint, bodyData } = requestOption;
      try {
        const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
          method: 'POST',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + store.getLocalStorage('item'),
          },
          // signal,
        });
        // console.log(response)
        if (!response.ok) {
          const errorData = await response.json();
          callback({ success: false, errorData });
          throw Error('Some thing went Error');
        }
        const responseData = await response.json();
        callback({ success: true, responseData });

      } catch (err) {
        console.error(err);
      }
      // clearTimeout(timeout);
    },
    [store.getLocalStorage('item')]
  );

  const sendPutRequest = useCallback(
    async (requestOption, callback = () => { }) => {
      const { endpoint, bodyData } = requestOption;
      const controller = new AbortController();
      const signal = controller.signal;
      const timeout = setTimeout(() => {
        signal.aborted();
      }, 2000);
      try {
        const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
          method: 'PUT',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + store.getLocalStorage('item'),
          },
          signal,
        });

        if (!response.ok) {
          throw Error('Some thing went Error');
        }

        const responseData = await response.json();
        callback(responseData);
      } catch (err) {
        console.error(err);
      }
      clearTimeout(timeout);
    },
    [store.getLocalStorage('item')]
  );

  const sendDelRequest = useCallback(
    async (requestOption, callback = () => { }) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const timeout = setTimeout(() => {
        signal.aborted();
      }, 2000);
      const { endpoint, bodyData } = requestOption;
      try {
        const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
          method: 'DELETE',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authCtx.token,
          },
          signal,
        });

        if (!response.ok) {
          throw Error('Some thing went Error');
        }
        const responseData = await response.json();
        callback(responseData);
      } catch (err) {
        console.error(err);
      }
      clearTimeout(timeout);
    },
    [authCtx.token]
  );

  return { isLoading, sendGetRequest, sendPostRequest, sendPostSignupRequest, sendPutRequest, sendDelRequest };
};

export default useHttpRequest;
