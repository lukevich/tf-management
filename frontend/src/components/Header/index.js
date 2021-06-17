import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';
import { concatCls } from 'helpers/utils';
import { IoMdArrowBack } from 'react-icons/all';

import Title from './Title';
import Actions from './Actions';

import styles from './styles.scss';

const Header = ({ title, titleSize, children, onRefreshClick, returnBack, ...props }) => (
    <div className={styles.header}>
        <Row>
            {returnBack && (
                <Col md={1} sm={1} xs={1} className={styles.return__back}>
                    <div className={styles.return__holder} onClick={returnBack}><IoMdArrowBack /></div>
                </Col>
            )}
            <Col
                md={returnBack ? 9 : 10}
                sm={returnBack ? 9 : 10}
                xs={returnBack ? 9 : 10}
                className={concatCls(styles.title_col, returnBack && styles.isback)}
            >
                <Title title={title} titleSize={titleSize} />
            </Col>
            <Col md={2} sm={2} xs={2} className={styles.actions}>
                <Actions onRefreshClick={onRefreshClick} {...props} />
            </Col>
        </Row>
        {children && <div className={styles.extends}>{children}</div>}
    </div>
);

Header.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
    onRefreshClick: PropTypes.func,
    titleSize: PropTypes.number,
    returnBack: PropTypes.func,
};

Header.defaultProps = {
    children: undefined,
    onRefreshClick: () => {},
    title: '',
    titleSize: 1,
    returnBack: undefined,
};

export default Header;
