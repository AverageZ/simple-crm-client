import { createSelector } from 'reselect';

/**
 * Direct selector to the contacts state domain
 */
const selectContactsDomain = (state) => state.get('contacts');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Contacts
 */

const makeSelectContacts = () => createSelector(
  selectContactsDomain,
  (substate) => substate.toJS()
);

export default makeSelectContacts;
export {
  selectContactsDomain,
};
