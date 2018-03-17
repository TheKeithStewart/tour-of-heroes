import { Action } from '@ngrx/store';

import { ChallengeActions, ChallengeActionTypes } from './../actions/challenge.actions';

export interface State {
  challengerId: number | null,
  challengeeId: number | null,
  battleInProgress: boolean
}

export const initialState: State = {
  challengerId: null,
  challengeeId: null,
  battleInProgress: false
};

export function reducer(state = initialState, action: ChallengeActions): State {
  switch (action.type) {
    case ChallengeActionTypes.SetChallenger: {
      return {
        ...state,
        challengerId: action.payload
      }
    }

    case ChallengeActionTypes.SetChallengee: {
      return {
        ...state,
        challengeeId: action.payload
      }
    }

    case ChallengeActionTypes.ClearChallenge: {
      return {
        ...state,
        challengerId: null,
        challengeeId: null
      }
    }

    case ChallengeActionTypes.Battle: {
      return {
        ...state,
        battleInProgress: true
      }
    }

    default:
      return state;
  }
}

export const getChallengerId = (state: State) => state.challengerId;
export const getChallengeeId = (state: State) => state.challengeeId;
