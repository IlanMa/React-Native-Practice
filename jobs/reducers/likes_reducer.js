import { LIKE_JOB, CLEAR_LIKE_JOBS } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action) {
  switch (action.type) {
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');
    case CLEAR_LIKE_JOBS:
      return [];
    default: 
      return state;
  }
}