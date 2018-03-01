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
  selectedHeroId: null,
  ids: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  entities: {
    11: { id: 11, name: 'Madonna' },
    12: { id: 12, name: 'Micheal Jackson' },
    13: { id: 13, name: 'Axel Rose' },
    14: { id: 14, name: 'Susanna Hoffs' },
    15: { id: 15, name: 'Debbie Harry' },
    16: { id: 16, name: 'David Bowie' },
    17: { id: 17, name: 'Mick Jagger' },
    18: { id: 18, name: 'Stevie Nicks' },
    19: { id: 19, name: 'Elton John' },
    20: { id: 20, name: 'James Hetfield' }
  }
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
