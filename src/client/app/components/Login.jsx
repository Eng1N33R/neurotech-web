import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../data/actions.jsx';

import logo_login from 'assets/img/logo_login.png';

const form = reduxForm({
    form: 'login'
});

class LoginForm extends React.Component {
    handleFormSubmit(formProps) {
        this.props.loginUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    componentDidMount() {
        document.body.classList.add('fullscreen');
    }

    render() {
        const { handleSubmit } = this.props;

        return <Form className="nt-login-form" onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } >
            <img src={logo_login} />

            <Form.Field>
                <Icon name="user" />
                <input type="text" name="username" className="text-field" placeholder="Имя пользователя" />
            </Form.Field>

            <Form.Field>
                <Icon name="lock" />
                <input type="password" name="password" className="text-field" placeholder="Пароль" />
            </Form.Field>

            <div className="button-line">
                <Button type="submit">Войти</Button>
            </div>

            <div className="copyright">
                <small>
                    Крымский федеральный университет имени В.&nbsp;И. Вернадского
                    <br/>
                    Институт экономики и управления
                </small>
            </div>
        </Form>
    }
}

LoginForm.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    loginUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        errorMessage: state.authentication.error,
        message: state.authentication.message
    };
}

export default connect(mapStateToProps, { loginUser })(form(LoginForm));