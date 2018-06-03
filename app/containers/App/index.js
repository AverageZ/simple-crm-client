/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import compose from 'recompose/compose';
import withState from 'recompose/withState';

import DefaultClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

/**
 * Components
 */
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

/**
 * Containers
 */
import Overview from 'containers/Overview/Loadable';
import Contacts from 'containers/Contacts/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

/**
 * Styles
 */
const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

/**
 * Data fetching
 */
const config = {
  uri: 'http://localhost:8000/graphql',
};

const client = new DefaultClient(config);

function App(props) {
  const { classes } = props;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <List component="nav">
          <Link to="/">
            <ListItem>
              <ListItemText primary="Overview" />
            </ListItem>
          </Link>
          <Link to="/contacts">
            <ListItem>
              <ListItemText primary="Contacts" />
            </ListItem>
          </Link>
          <Link to="/settings">
            <ListItem>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </List>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => props.toggleDrawer(!props.mobileOpen)}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            SimpleCRM
          </Typography>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={props.theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mobileOpen}
          onClose={() => props.toggleDrawer(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={Overview} />
            <Route exact path="/contacts" component={Contacts} />
            <Route component={NotFoundPage} />
          </Switch>
        </ApolloProvider>
      </main>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string,
    content: PropTypes.string,
    drawerPaper: PropTypes.string,
    modal: PropTypes.string,
    navIconHide: PropTypes.string,
    root: PropTypes.string,
    toolbar: PropTypes.string,
  }),
  mobileOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  theme: PropTypes.shape({
    direction: PropTypes.string,
  }),
};

const addMobileState = compose(
  withState('mobileOpen', 'toggleDrawer', false),
  withStyles(styles, { withTheme: true }),
);

export default addMobileState(App);
