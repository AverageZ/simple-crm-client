/**
 *
 * Contacts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

/**
 * Data fetching
 */
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

/**
 * Components
 */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * Icons
 */
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/AddCircle';


/**
 * Selectors, reducers, actions
 */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectContacts from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const Wrapper = styled(Paper)`
  overflow-x: auto;
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const Actions = styled.div`
  display: flex;
`;

const TableToolbar = ({ onAddContact }) => (
  <Toolbar>
    <Typography color="inherit" variant="subheading">
      Contacts
    </Typography>

    <Spacer />

    <Actions>
      <Tooltip title="Add contact">
        <IconButton onClick={onAddContact} aria-label="Add contact">
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Filter list">
        <IconButton aria-label="Filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Actions>
  </Toolbar>
);

TableToolbar.propTypes = {
  onAddContact: PropTypes.func,
};

export class Contacts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {

  }

  state = {
    isAddContactOpen: false,
  }

  toggleAddContact = () => {
    console.log('zzz toggleAddContact');

    this.setState((s) => ({
      ...s,
      isAddContactOpen: !s.isAddContactOpen,
    }));
  }

  handleAddContact = () => {
    console.log('zzz handleAddContact');
  }

  renderDialogs = () => (
    <React.Fragment>
      <Dialog
        open={this.state.isAddContactOpen}
        onClose={this.toggleAddContact}
        aria-labelledby="add-contact"
      >
        <DialogTitle id="add-contact">Add Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.toggleAddContact} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleAddContact} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )

  render() {
    console.log('zzz', { state: this.state, props: this.props });

    return (
      <div>
        <Helmet>
          <title>Contacts</title>
          <meta name="description" content="Description of Contacts" />
        </Helmet>

        {this.renderDialogs()}

        <Query
          query={gql`
          query GetContacts {
            contacts {
              id
              firstName
              lastName
              email
              organizations {
                id
                name
              }
            }
          }
        `}
        >
          {({ loading, error, data }) => {
            if (error) {
              return 'error';
            }

            if (loading || !data) {
              return 'Loading...';
            }

            return (
              <Wrapper>
                <TableToolbar
                  onAddContact={this.toggleAddContact}
                />

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><FormattedMessage {...messages.table.header.name} /></TableCell>
                      <TableCell><FormattedMessage {...messages.table.header.organizations} /></TableCell>
                      <TableCell><FormattedMessage {...messages.table.header.email} /></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      data.contacts.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell>{c.firstName} {c.lastName}</TableCell>
                          <TableCell>
                            {
                              c.organizations.length <= 0 ? undefined : (
                                c.organizations[0].name
                              )
                            }
                          </TableCell>
                          <TableCell>{c.email}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </Wrapper>
            );
          }}
        </Query>
      </div>
    );
  }
}

Contacts.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contacts: makeSelectContacts(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'contacts', reducer });
const withSaga = injectSaga({ key: 'contacts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Contacts);
