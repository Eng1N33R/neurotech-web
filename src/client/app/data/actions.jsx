import axios from 'axios';
import cookie from 'react-cookies';
import { push } from 'react-router-redux';

const API_URL = 'http://localhost:3000/api';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authRequest = credentials => {
    return {
        type: AUTH_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        credentials
    }
}

export const authReceive = user => {
    return {
        type: AUTH_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token: user.token
    }
}

export const authError = message => {
    return {
        type: AUTH_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export const errorHandler = error => {
    return dispatch => {
        let errorMessage = '';

        if (typeof error.data == 'object' && error.data.error) {
            errorMessage = error.data.error;
        } else if (error.data) {
            errorMessage = error.data;
        } else {
            errorMessage = error;
        }

        if (error.status === 401) {
            dispatch(authError('У вас нет разрешения на доступ к этому ресурсу. Пожалуйста, войдите в систему.'));
        } else {
            dispatch(authError(errorMessage));
        }
    }
}

export const loginUser = credentials => {
    dispatch(authRequest(credentials));
    let { username, password } = credentials;

    return function(dispatch) {
        axios.post(`${API_URL}/auth/login`, { username, password }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(response => {
                cookie.save('token', response.data.token, { path: '/' });
                push('/');
                dispatch(authReceive(response.data));
            })
            .catch((error) => {
                dispatch(errorHandler(error.response));
            });
    }
}

export const logoutUser = () => {
    cookie.remove('token', { path: '/' });
    dispatch(push('/'));
    return {
        type: AUTH_LOGOUT
    };
}