import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import * as fromHero from './hero.reducer';
import * as fromSearch from './search.reducer';

export interface State {
  heroes: fromHero.State;
  search: fromSearch.State;
}

export const reducers: ActionReducerMap<State> = {
  heroes: fromHero.reducer,
  search: fromSearch.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

export const getSearchState = createFeatureSelector<fromSearch.State>('search');

export const getSearchHeroIds = createSelector(
  getSearchState,
  state => state.ids
);
export const getSearchResult = createSelector(
  fromHero.getHeroEntityState,
  getSearchHeroIds,
  (heroes, searchIds) => {
    return searchIds.map(id => heroes[id]);
  }
);
