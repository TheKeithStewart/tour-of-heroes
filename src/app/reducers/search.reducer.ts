import { HeroActions, HeroActionTypes } from './../actions/hero.actions';

export interface State {
  ids: number[];
  loading: boolean;
  error: string;
  query: string;
}

export const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: ''
};

export function reducer(state = initialState, action: HeroActions): State {
  switch (action.type) {
    case HeroActionTypes.Search: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query
      };
    }

    case HeroActionTypes.SearchSuccess: {
      return {
        ...state,
        ids: action.payload.map(hero => hero.id),
        loading: false,
        error: ''
      }
    }

    case HeroActionTypes.SearchFail: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
