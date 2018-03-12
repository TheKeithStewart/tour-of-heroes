import { DancerActions, DancerActionTypes } from './../actions/dancer.actions';

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

export function reducer(state = initialState, action: DancerActions): State {
  switch (action.type) {
    case DancerActionTypes.Search: {
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

    case DancerActionTypes.SearchSuccess: {
      return {
        ...state,
        ids: action.payload.map(dancer => dancer.id),
        loading: false,
        error: ''
      }
    }

    case DancerActionTypes.SearchFail: {
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
