import React from 'react';
import Navigation from 'components/Navigation';
import Crumb from 'components/Breadcrumb';
import LabeledToggle from 'components/LabeledToggle';
import { Menu, Form, Checkbox } from 'semantic-ui-react';
import { Translate } from 'react-redux-i18n';

export default () => (
    <div className="settings">
        <div className="settings-inner">
            <Form>
                <h3>Argus</h3>
                <Form.Group>
                    <Form.Field width={6}>
                        <label><Translate value='settings.address' /></label>
                        <input placeholder='127.0.0.1' />
                    </Form.Field>
                    <Form.Field width={2}>
                        <label><Translate value='settings.port' /></label>
                        <input type='number' placeholder='561' />
                    </Form.Field>
                </Form.Group>
                <span className='note'><Translate value='settings.address_note' /></span>

                <h3>Postgres</h3>
                <Form.Group>
                    <Form.Field width={6}>
                        <label><Translate value='settings.address' /></label>
                        <input placeholder='127.0.0.1' />
                    </Form.Field>
                    <Form.Field width={2}>
                        <label><Translate value='settings.port' /></label>
                        <input type='number' placeholder='5432' />
                    </Form.Field>
                </Form.Group>
                <span className='note'><Translate value='settings.address_note' /></span>

                <h3><Translate value='settings.titles.notifications' /></h3>
                <LabeledToggle label={<Translate value='settings.push' />} note={<Translate value='settings.push_note' />} />
                <LabeledToggle label={<Translate value='settings.push' />} note={<Translate value='settings.push_note' />} />
            </Form>
        </div>
    </div>
);