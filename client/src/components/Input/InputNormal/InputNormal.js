import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import s from './InputNormal.module.css';
const InputNormal = (props) => {
    const handleOnChange = (event, data) => {
        if (!_.isEmpty(props.input)) {
            props.input.onChange(event.target.value);
        } else {
            props.onChange(event, { name: props.name, value: data.value });
        }
    };
    const handleOnBlur = (event, data) => {
        if (!_.isEmpty(props.input)) {
            props.input.onBlur(props.name);
        } else {
            props.name && props.onBlur(event, { name: props.name, value: true });
        }
    };

    const { input, meta, t, className, placeholder, label, ...rest } = props;
    return (
        <div className={[ s.field, className ].join(' ')}>
            {_.isString(label) && <label htmlFor={input.name || props.name}>{t(label)}</label>}
            <Input
                {...input}
                fluid
                placeholder={t(placeholder)}
                arial-label={placeholder}
                {...rest}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                error={!_.isEmpty(meta.error) && meta.touched}
                label={React.isValidElement(label) ? label : null}
            />
            {meta.error && meta.touched && <div className={s.validMessage}>{t(meta.error)}</div>}
        </div>
    );
};

InputNormal.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    propOnChange: PropTypes.func,
    name: PropTypes.string,
    input: PropTypes.object
};
InputNormal.defaultProps = {
    name: null,
    input: {},
    meta: {},
    t: (text) => text,
    onChange: () => console.log('not set onCagne'),
    onBlur: () => console.log('not set onBlur')
};

export default InputNormal;
