import { createSelector } from 'reselect';

/**
 * Direct selector to the overview state domain
 */
const selectOverviewDomain = (state) => state.get('overview');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Overview
 */

const makeSelectOverview = () => createSelector(
  selectOverviewDomain,
  (substate) => substate.toJS()
);

export default makeSelectOverview;
export {
  selectOverviewDomain,
};
