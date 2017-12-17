import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import reducers from './data/reducers.jsx';
import cookie from 'react-cookies';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'components/App';
import LoginPage from 'components/Login';

import 'semantic-ui-css/semantic.min.css';
import style from './static/scss/style.scss';
import favicon from './static/favicon.ico';

const translations = {
    'ru-RU': {
        pages: {
            home: 'Главная',
            login: 'Вход',
            monitor: 'Наблюдение',
            statistics: 'Статистика',
            settings: 'Настройки'
        },
        settings: {
            titles: {
                notifications: 'Извещения',
            },

            address: 'Адрес сервера',
            port: 'Порт',
            address_note: 'Если Ваш демон Argus работает на другом адресе в сети, укажите его здесь.',

            push: 'Отправлять push-извещения?',
            push_note: 'При включении данной опции на связанное с учётной записью мобильное устройство будут высылаться push-извещения о подозрительной активности в сети.'
        }
    }
}

//const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
//const store = createStoreWithMiddleware(reducers);
const store = createStore(
    combineReducers({
        ...reducers,
        i18n: i18nReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk)
)
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('ru-RU'));

const token = cookie.load('token');

if (token) {
    store.dispatch({ type: 'AUTH_LOGIN' });
}

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/* <Route exact path='/' component={Home} /> */}
                <Route path='/' component={App} />
                <Route path='/login' component={LoginPage} />
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('app-container'));