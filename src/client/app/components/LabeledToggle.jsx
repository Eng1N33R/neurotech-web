import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

export default props => (
    <Form.Field className='check-group'>
        <Checkbox toggle />
        <span className='label'>{props.label}</span>
        <span className='note'>{props.note}</span>
    </Form.Field>
);