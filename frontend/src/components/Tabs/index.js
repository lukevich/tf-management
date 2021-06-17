import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'react-bootstrap/cjs/Tabs';
import Tab from 'react-bootstrap/cjs/Tab';

import { concatCls } from 'helpers/utils';

import styles from './styles.scss';

const TabsComponent = ({ tabs, styles: parentStyles, ...props }) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Tabs className={concatCls(styles.tabs, parentStyles.tabs)} defaultActiveKey={tabIndex} onSelect={setTabIndex}>
            {tabs.map((tab, index) => {
                const { label, Component } = tab;

                return (
                    <Tab
                        key={label}
                        tabClassName={concatCls(
                            styles.tab, parentStyles.tab,
                            index === +tabIndex && concatCls(styles.active, parentStyles.active),
                        )}
                        title={label}
                        eventKey={index}
                    >
                        <Component {...props} />
                    </Tab>
                );
            })}
        </Tabs>
    );
};

TabsComponent.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        }),
    ).isRequired,
    styles: PropTypes.shape({
        tabs: PropTypes.string,
        tab: PropTypes.string,
        active: PropTypes.string,
    }),
};

TabsComponent.defaultProps = {
    styles: {},
};

export default TabsComponent;
