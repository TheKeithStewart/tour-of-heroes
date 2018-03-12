import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import * as fromDancer from './dancer.reducer';
import * as fromSearch from './search.reducer';

export interface State {
  dancers: fromDancer.State;
  search: fromSearch.State;
}

export const reducers: ActionReducerMap<State> = {
  dancers: fromDancer.reducer,
  search: fromSearch.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

export const getDancerState = createFeatureSelector<fromDancer.State>('dancers');
export const getSearchState = createFeatureSelector<fromSearch.State>('search');

export const {
  selectIds: getDancerIdState,
  selectEntities: getDancerEntityState,
  selectAll: getAllDancers,
  selectTotal,
} = fromDancer.adapter.getSelectors(getDancerState);

export const getTopDancers = createSelector(
  getAllDancers,
  (entities) => entities.slice(1, 5)
);

export const getSelectedDancerId = createSelector(
  getDancerState,
  fromDancer.getSelectedDancerId
);
export const getSelectedDancer = createSelector(
  getDancerEntityState,
  getSelectedDancerId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId]
  }
);

export const getSearchDancerIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchResult = createSelector(
  getDancerEntityState,
  getSearchDancerIds,
  (dancers, searchIds) => {
    return searchIds.map(id => dancers[id]);
  }
);
