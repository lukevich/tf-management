import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchStacks } from 'store/effects';
import { Header, Spinner, Container } from 'components';

import { isAuth } from 'settings/constants/auth';
import { useFilters, useSilentStacksRefresh } from './hooks';
import { Filter, Table } from './components';

import styles from './styles.scss';

const StacksPage = ({ data, state, silentPending }) => {
    useSilentStacksRefresh(data);

    useFilters(state.filter);

    if (state.pending || !data || !isAuth) {
        return <Spinner />;
    }

    return (
        <Container className={styles.container}>
            <Header
                title={`Stacks (${state.data.length})`}
                titleSize={5}
                onRefreshClick={() => fetchStacks(true)}
                silentPending={silentPending}
            >
                <Filter />
            </Header>
            <Table />
        </Container>
    );
};

StacksPage.propTypes = {
    state: PropTypes.shape({
        pending: PropTypes.bool,
        data: PropTypes.arrayOf(PropTypes.object),
        filter: PropTypes.shape({}),
    }).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    silentPending: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        state: state.stacks.state,
        data: state.stacks.data,
        silentPending: state.stacks.state.silentPending,
    };
}

export default connect(mapStateToProps)(StacksPage);
