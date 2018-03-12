import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dancer } from './../models/dancer.model';
import { HeroActions, HeroActionTypes } from './../actions/hero.actions';

export interface State extends EntityState<Dancer> {
  loading: boolean,
  error: string,
  selectedHeroId: number | null
}

export const adapter: EntityAdapter<Dancer> = createEntityAdapter<Dancer>();

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
    case HeroActionTypes.AddDancer: {
      return adapter.addOne(action.payload.hero, state);
    }

    case HeroActionTypes.UpsertDancer: {
      return adapter.upsertOne(action.payload.hero, state);
    }

    case HeroActionTypes.AddDancers: {
      return adapter.addMany(action.payload.heroes, state);
    }

    case HeroActionTypes.UpsertDancers: {
      return adapter.upsertMany(action.payload.heroes, state);
    }

    case HeroActionTypes.UpdateDancer: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }

    case HeroActionTypes.UpdateDancerSuccess: {
      return {
        ...adapter.updateOne(action.payload.hero, state),
        loading: false
      };
    }

    case HeroActionTypes.UpdateDancerFail: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case HeroActionTypes.UpdateDancers: {
      return adapter.updateMany(action.payload.heroes, state);
    }

    case HeroActionTypes.DeleteDancer: {
      return adapter.removeOne(action.payload.id, state);
    }

    case HeroActionTypes.DeleteDancers: {
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

    case HeroActionTypes.LoadHeroesFail: {
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
