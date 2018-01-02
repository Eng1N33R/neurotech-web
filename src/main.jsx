import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import * as neurotech from './data/reducers';
import { updateSettings } from './data/actions';
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
            monitor: 'Мониторинг',
            monitor_note: 'Анализ сетевого трафика и обнаружение атак.',
            statistics: 'Статистика',
            statistics_note: 'Анализ и аудит исторических данных об атаках.',
            settings: 'Настройки',
            settings_note: 'Изменение параметров системы обнаружения атак.',
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

const defaultSettings = {
    monitor: {
        graph: {
            woozy: 10,
            sick: 20,
        },
        timeline: {
            woozy: 200,
            sick: 400,
        }
    }
}

//const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
//const store = createStoreWithMiddleware(reducers);
const store = createStore(
    combineReducers({
        ...neurotech,
        i18n: i18nReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk)
)

const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('ru-RU'));
store.dispatch(updateSettings(defaultSettings));

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