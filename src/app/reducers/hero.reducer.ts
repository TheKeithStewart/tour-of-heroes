import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Hero } from './../models/hero.model';
import { HeroActions, HeroActionTypes } from './../actions/hero.actions';

export interface State extends EntityState<Hero> {
  loading: boolean,
  error: string,
  selectedHeroId: number | null
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: '',
  selectedHeroId: null
});

export function reducer(
  state = initialState,
  action: HeroActions
): State {
  switch (action.type) {
    case HeroActionTypes.AddHero: {
      return adapter.addOne(action.payload.hero, state);
    }

    case HeroActionTypes.UpsertHero: {
      return adapter.upsertOne(action.payload.hero, state);
    }

    case HeroActionTypes.AddHeroes: {
      return adapter.addMany(action.payload.heroes, state);
    }

    case HeroActionTypes.UpsertHeroes: {
      return adapter.upsertMany(action.payload.heroes, state);
    }

    case HeroActionTypes.UpdateHero: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }

    case HeroActionTypes.UpdateHeroSuccess: {
      return {
        ...adapter.updateOne(action.payload.hero, state),
        loading: false
      };
    }

    case HeroActionTypes.UpdateHeroFail: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case HeroActionTypes.UpdateHeroes: {
      return adapter.updateMany(action.payload.heroes, state);
    }

    case HeroActionTypes.DeleteHero: {
      return adapter.removeOne(action.payload.id, state);
    }

    case HeroActionTypes.DeleteHeroes: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case HeroActionTypes.LoadHeroes: {
      return adapter.addAll(action.payload.heroes, state);
    }

    case HeroActionTypes.ClearHeroes: {
      return adapter.removeAll(state);
    }

    case HeroActionTypes.GetHeroes: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }

    case HeroActionTypes.GetHeroesError: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case HeroActionTypes.GetHero: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }

    case HeroActionTypes.GetHeroSuccess: {
      const id = <number>action.payload.id;

      return {
        ...adapter.upsertOne(action.payload, state),
        loading: false,
        selectedHeroId: id
      }
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getHeroState = createFeatureSelector<State>('heroes');

export const getHeroEntityState = createSelector(
  getHeroState,
  state => state.entities
);
export const getAllHeroes = createSelector(
  getHeroEntityState,
  (entities) => Object.keys(entities).map(id => entities[id])
);
export const getTopHeroes = createSelector(
  getAllHeroes,
  (entities) => entities.slice(1, 5)
);

export const getHeroIdState = createSelector(
  getHeroState,
  state => state.ids
);

export const getSelectedHeroId = createSelector(
  getHeroState,
  state => state.selectedHeroId
);
export const getSelectedHero = createSelector(
  getHeroEntityState,
  getSelectedHeroId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId]
  }
);
