import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Hero } from './../models/hero.model';
import { HeroActions, HeroActionTypes } from './../actions/hero.actions';

export interface State extends EntityState<Hero> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export const initialState: State = adapter.getInitialState({
  ids: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  entities: {
    11: { id: 11, name: 'Mr. Nice' },
    12: { id: 12, name: 'Narco' },
    13: { id: 13, name: 'Bombasto' },
    14: { id: 14, name: 'Celeritas' },
    15: { id: 15, name: 'Magneta' },
    16: { id: 16, name: 'RubberMan' },
    17: { id: 17, name: 'Dynama' },
    18: { id: 18, name: 'Dr IQ' },
    19: { id: 19, name: 'Magma' },
    20: { id: 20, name: 'Tornado' }  
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

    // case HeroActionTypes.UpsertHero: {
    //   return adapter.upsertOne(action.payload.hero, state);
    // }

    case HeroActionTypes.AddHeroes: {
      return adapter.addMany(action.payload.heroes, state);
    }

    // case HeroActionTypes.UpsertHeroes: {
    //   return adapter.upsertMany(action.payload.heroes, state);
    // }

    case HeroActionTypes.UpdateHero: {
      return adapter.updateOne(action.payload.hero, state);
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

export const getHeroState = createFeatureSelector<State>('hero');

export const getHeroEntityState = createSelector(
  getHeroState,
  state => state.entities
);
export const getAllHeroes = createSelector(
  getHeroEntityState,
  (entities) => Object.keys(entities).map(id => entities[id])
);

export const getHeroIdState = createSelector(
  getHeroState,
  state => state.ids
);
