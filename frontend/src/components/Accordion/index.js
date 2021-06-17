import React from 'react';
import PropTypes from 'prop-types';

import Accordion from 'react-bootstrap/cjs/Accordion';

const AccordionComponent = ({ children, ...props }) => (
    <Accordion {...props}>
        {children}
    </Accordion>
);

AccordionComponent.Toggle = Accordion.Toggle;
AccordionComponent.Collapse = Accordion.Collapse;

AccordionComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AccordionComponent;
