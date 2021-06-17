import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Title = ({ title, titleSize }) => {
    const clsN = styles.title;
    const getTitleSize = () => {
        switch (titleSize) {
            case 1: return <h1 className={clsN}>{title}</h1>;
            case 2: return <h2 className={clsN}>{title}</h2>;
            case 3: return <h3 className={clsN}>{title}</h3>;
            case 4: return <h4 className={clsN}>{title}</h4>;
            case 5: return <h5 className={clsN}>{title}</h5>;
            case 6: return <h6 className={clsN}>{title}</h6>;
            default: return <h1 className={clsN}>{title}</h1>;
        }
    };
    return getTitleSize();
};

Title.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Title.defaultProps = {
    title: '',
};

export default Title;
