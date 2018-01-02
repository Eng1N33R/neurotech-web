export default (state = {}, action) => {
    switch (action.type) {
        case 'SETTINGS_UPDATE':
            return { ...state, ...action.settings };
        default:
            return state;
    }
}