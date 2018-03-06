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

    case HeroActionTypes.LoadHeroesSuccess: {
      return adapter.addAll(action.payload.heroes, state);
    }

    case HeroActionTypes.ClearHeroes: {
      return adapter.removeAll(state);
    }

    case HeroActionTypes.LoadHeroes: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }

    case HeroActionTypes.LoadHeroesError: {
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

export const getSelectedHeroId = (state: State) => state.selectedHeroId;
