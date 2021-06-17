import React from 'react';
import PropTypes from 'prop-types';

import { concatCls } from 'helpers/utils';

import style from './style.scss';

const Checkbox = (props) => {
    const {
        className, size, checked, multiple, disabled,
    } = props;
    const {
        text, renderText, readonly, onChange,
    } = props;

    const onClick = (e) => {
        if (readonly) return null;

        e.preventDefault();

        if (!disabled && onChange) {
            onChange(e, !checked);
        }
    };

    return (
        <div className={concatCls(style.wrap, className)}>
            <label // eslint-disable-line
                className={concatCls(
                    style.checkbox,
                    size,
                    checked ? style.checked : '',
                    multiple ? style.multiple : '',
                    disabled ? style.disabled : '',
                    (text || renderText) ? style.has_text : '',
                )}
            >
                <input type="checkbox" onClick={onClick} disabled={disabled} />
                <div onClick={onClick}>
                    {multiple ? (
                        <svg viewBox="0 0 12 8">
                            <rect x="1" y="3" width="10" height="2" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 12 8">
                            <polyline points="1 2.821 4.75 6.69289 11 1" />
                        </svg>
                    )}
                </div>
                {typeof renderText === 'function' ? renderText() : <span>{text}</span>}
            </label>
        </div>
    );
};

Checkbox.SIZE_DEFAULT = '';

Checkbox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    multiple: PropTypes.bool,
    text: PropTypes.string,
    size: PropTypes.oneOf([Checkbox.SIZE_DEFAULT]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    readonly: PropTypes.bool,
    renderText: PropTypes.func,
};

Checkbox.defaultProps = {
    className: '',
    checked: false,
    multiple: false,
    size: Checkbox.SIZE_DEFAULT,
    readonly: false,
    text: undefined,
    disabled: false,
    onChange: undefined,
    renderText: undefined,
};

export default Checkbox;
