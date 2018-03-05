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

export const getHeroState = createFeatureSelector<fromHero.State>('heroes');
export const getSearchState = createFeatureSelector<fromSearch.State>('search');

export const {
  selectIds: getHeroIdState,
  selectEntities: getHeroEntityState,
  selectAll: getAllHeroes,
  selectTotal,
} = fromHero.adapter.getSelectors(getHeroState);

export const getTopHeroes = createSelector(
  getAllHeroes,
  (entities) => entities.slice(1, 5)
);

export const getSelectedHeroId = createSelector(
  getHeroState,
  fromHero.getSelectedHeroId
);
export const getSelectedHero = createSelector(
  getHeroEntityState,
  getSelectedHeroId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId]
  }
);

export const getSearchHeroIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchResult = createSelector(
  getHeroEntityState,
  getSearchHeroIds,
  (heroes, searchIds) => {
    return searchIds.map(id => heroes[id]);
  }
);
