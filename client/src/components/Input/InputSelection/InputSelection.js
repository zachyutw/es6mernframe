import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import s from './InputSelection.module.css';
const InputSelection = (props) => {
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

    const { input, meta, t, className, placeholder, label, options, ...rest } = props;
    return (
        <div className={[ s.field, className ].join(' ')}>
            {_.isString(label) && <label htmlFor={input.name || props.name}>{t(label)}</label>}
            <Dropdown
                placeholder={t(placeholder)}
                fluid
                selection
                options={_.map(options, ({ text, ...rest }) => ({ text: t(text), ...rest }))}
                {...rest}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                error={!_.isEmpty(meta.error) && meta.touched}
            />
            {meta.error && meta.touched && <div className={s.validMessage}>{t(meta.error)}</div>}
        </div>
    );
};

InputSelection.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    propOnChange: PropTypes.func,
    name: PropTypes.string,
    input: PropTypes.object
};
InputSelection.defaultProps = {
    name: null,
    input: {},
    meta: { touched: true, error: 'error' },
    t: (text) => text,
    onChange: () => console.log('not set onCagne'),
    onBlur: () => console.log('not set onBlur')
};

export default InputSelection;
