import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Collapse } from 'components';
import { Card } from 'pages/Stack/components';
import ListGroup from 'react-bootstrap/cjs/ListGroup';

import ToggleBar from './ToggleBar';
import CollapseContent from './CollapseContent';

import { groupByType, getSearchedTypes } from '../helpers';

import styles from './styles.scss';

const Body = ({ resources, searchedTypes, colsNumber }) => {
    const [openedRess, setOpenedRess] = useState(searchedTypes);

    useEffect(() => {
        setOpenedRess(searchedTypes);
    }, [searchedTypes.length]); // eslint-disable-line

    if (!resources) return null;

    const onToggle = (type) => {
        const openedIndex = openedRess.findIndex((openType) => openType === type);

        if (openedIndex !== -1) {
            const openItems = [...openedRess];
            openItems.splice(openedIndex, 1);
            setOpenedRess(openItems);
        } else {
            const openItems = [...openedRess];
            openItems.push(type);
            setOpenedRess(openItems);
        }
    };

    const isOpen = (resource) => openedRess.includes(resource.type);

    return (
        <Card>
            {resources.map((resource) => (
                <ListGroup className={styles.list__group} key={resource.type}>
                    <ToggleBar
                        className={styles.toggle}
                        resource={resource}
                        isOpen={isOpen(resource)}
                        onToggle={onToggle}
                    />
                    <Collapse open={isOpen(resource)} allowOverflowWhenOpen>
                        <CollapseContent resource={resource} colsNumber={colsNumber} />
                    </Collapse>
                </ListGroup>
            ))}
        </Card>
    );
};

Body.propTypes = {
    resources: PropTypes.arrayOf(PropTypes.object),
    colsNumber: PropTypes.number,
    searchedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Body.defaultProps = {
    resources: null,
    colsNumber: undefined,
};

function mapStateToProps(state) {
    const { search } = state.stack.state.resources.filter;
    const resources = groupByType(state.stack.state.resources.data);

    const searchedTypes = getSearchedTypes(resources, search);

    return {
        search,
        resources,
        searchedTypes,
    };
}

export default connect(mapStateToProps)(memo(Body));
