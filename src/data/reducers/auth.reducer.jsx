const INITIAL_STATE = { error: '', message: '', content: '', fetching: false, authenticated: false, username: ''};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'AUTH_REQUESTED':
            return { ...state, fetching: true };
        case 'AUTH_LOGIN':
            return { ...state, error: '', message: '', fetching: false, authenticated: true, username: action.payload };
        case 'AUTH_LOGOUT':
            return { ...state, authenticated: false, username: '' };
        case 'AUTH_ERROR':
            return { ...state, fetching: false, error: action.payload };
    }

    return state;
}