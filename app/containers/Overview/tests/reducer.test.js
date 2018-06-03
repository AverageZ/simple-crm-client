
import { fromJS } from 'immutable';
import overviewReducer from '../reducer';

describe('overviewReducer', () => {
  it('returns the initial state', () => {
    expect(overviewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
