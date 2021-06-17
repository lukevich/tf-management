import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';

import { useScreen } from 'hooks';
import { fetchStacks } from 'store/effects';
import { routes } from 'settings/navigation/routes';
import { useSilentStacksRefresh } from 'pages/Stacks/hooks';
import { Tabs, Header, Spinner, Container } from 'components';

import { useStack } from './hooks';
import { Info, Resources, Variables, Outputs, History } from './components';

import styles from './styles.scss';

const StackPage = ({ data, state, match, history, stacksData, silentPending }) => {
    useSilentStacksRefresh(stacksData);
    useStack(match.params.id, stacksData);

    const { screen } = useScreen();

    if (state.pending || state.pending === null) {
        return <Spinner />;
    }

    const getTabs = () => [
        { label: 'Stack Info', Component: Info },
        { label: 'Resources', Component: Resources },
        { label: 'Variables', Component: Variables },
        { label: 'Outputs', Component: Outputs },
        { label: 'History', Component: History },
    ];

    const returnBack = () => {
        history.push(routes.index);
    };

    return (
        <Container className={styles.container}>
            <Header
                returnBack={returnBack}
                titleSize={3}
                title={(data || {}).name}
                onRefreshClick={() => fetchStacks(true)}
                silentPending={silentPending}
            />
            <Tabs tabs={getTabs()} data={data} colsNumber={screen.mobile ? 1 : 2} />
        </Container>
    );
};

StackPage.propTypes = {
    data: PropTypes.shape({
        resources: PropTypes.arrayOf(PropTypes.object),
        variables: PropTypes.shape({}),
        outputs: PropTypes.shape({}),
    }),
    stacksData: PropTypes.arrayOf(PropTypes.object).isRequired,
    state: PropTypes.shape({
        pending: PropTypes.bool,
    }).isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    silentPending: PropTypes.bool.isRequired,
};

StackPage.defaultProps = {
    data: null,
};

function mapStateToProps(state) {
    return {
        data: state.stack.data,
        state: state.stack.state,
        stacksData: state.stacks.data,
        silentPending: state.stacks.state.silentPending,
    };
}

export default connect(mapStateToProps)(StackPage);
