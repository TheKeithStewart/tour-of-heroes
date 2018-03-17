import { Action } from '@ngrx/store';

export enum ChallengeActionTypes {
  SetChallenger = '[Challenge] Set Challenger',
  SetChallengee = '[Challenge] Set Challengee',
  ClearChallenge = '[Challenge] Clear Challenge',
  Battle = '[Challenge] Battle!'
}

export class SetChallenger implements Action {
  readonly type = ChallengeActionTypes.SetChallenger;

  constructor(public payload: number) { }
}

export class SetChallengee implements Action {
  readonly type = ChallengeActionTypes.SetChallengee;

  constructor(public payload: number) { }
}

export class ClearChallenge implements Action {
  readonly type = ChallengeActionTypes.ClearChallenge;
}

export class Battle implements Action {
  readonly type = ChallengeActionTypes.Battle;
}

export type ChallengeActions =
  SetChallenger
  | SetChallengee
  | ClearChallenge
  | Battle;
