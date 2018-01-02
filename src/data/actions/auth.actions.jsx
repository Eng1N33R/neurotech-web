import axios from 'axios';
import cookie from 'react-cookies';

const API_URL = 'http://localhost:3000/api';

export const errorHandler = error => {
    return function(dispatch) {
        let errorMessage = '';

        if (error.data.error) {
            errorMessage = error.data.error;
        } else if (error.data) {
            errorMessage = error.data;
        } else {
            errorMessage = error;
        }

        if (error.status === 401) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: 'У вас нет разрешения на доступ к этому ресурсу. Пожалуйста, войдите в систему.'
            });
            dispatch(logoutUser());
        } else {
            dispatch({
                type: 'AUTH_ERROR',
                payload: errorMessage
            });
        }
    }
}

export const loginUser = (username, password) => {
    return function(dispatch) {
        axios.post(`${API_URL}/auth/login`, { username, password })
            .then(response => {
                cookie.save('token', response.data.token, { path: '/' });
                window.location.href = 'http://localhost:3000/';
                dispatch({ type: 'AUTH_LOGIN' });
            })
            .catch((error) => {
                dispatch(errorHandler(error.response))
            });
    }
}

export const logoutUser = () => {
    cookie.remove('token', { path: '/' });
    window.location.href = 'http://localhost:3000/login';
    return {
        type: 'AUTH_LOGOUT'
    };
}