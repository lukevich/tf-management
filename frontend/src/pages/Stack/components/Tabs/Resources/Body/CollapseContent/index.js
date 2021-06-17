import React from 'react';
import PropTypes from 'prop-types';

import { CardBody } from 'pages/Stack/components';
import { useScreen } from 'hooks';

import styles from './styles.scss';

const CollapseContent = ({ resource, colsNumber }) => {
    const { screen } = useScreen();

    const calculateRowsNumber = (data) => {
        const fieldsLength = Object.keys(data).length - 2; // name and url not included
        const colsNum = (fieldsLength / colsNumber);

        if (screen.width <= 768) {
            return fieldsLength;
        }

        return fieldsLength > 2 ? colsNum : 1;
    };

    return (
        <div className={styles.collapse__body}>
            {resource.data.map((res, i) => (
                <CardBody
                    withLink
                    data={res}
                    colsNumber={calculateRowsNumber(res)}
                    className={styles.items}
                    key={res.id || `${resource.type}-${i}`}
                />
            ))}
        </div>
    );
};

CollapseContent.propTypes = {
    resource: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
        })),
        type: PropTypes.string,
    }).isRequired,
    colsNumber: PropTypes.number.isRequired,
};

export default CollapseContent;
