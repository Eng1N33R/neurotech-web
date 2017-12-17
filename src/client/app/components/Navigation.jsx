import React, { Component } from 'react';
import Crumb from 'components/Breadcrumb';
import { Menu, Button, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';

import logo from 'assets/img/logo.png';
import 'assets/img/texture.png';

export default props => (
    <div>
        <div className="navbar-container">
            <Menu stackable className="navbar">
                <Menu.Item as={ Link } name="index" to="/" className="navbar-brand"><img src={logo} /></Menu.Item>
                <Menu.Menu position='right'>
                    <Responsive as={ Menu.Item } minWidth={768}>
                        <Button as={ Link } to="/logout">Выход</Button>
                    </Responsive>
                    <Responsive as={ Menu.Item } maxWidth={768} className="navbar-responsive">
                        <Link to="/logout">Выход</Link>
                    </Responsive>
                </Menu.Menu>
            </Menu>
        </div>
        <Crumb location={props.location} />
    </div>
);