import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/cjs/Container';

const ContainerComponent = ({ fluid, children, ...props }) => (
    <Container fluid={fluid} {...props}>
        {children}
    </Container>
);

ContainerComponent.propTypes = {
    fluid: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

ContainerComponent.defaultProps = {
    fluid: true,
};

export default ContainerComponent;
