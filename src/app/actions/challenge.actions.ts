import { Action } from '@ngrx/store';

import { BattleOutcome } from '../reducers/challenge.reducer';

export enum ChallengeActionTypes {
  SetChallenger = '[Challenge] Set Challenger',
  SetChallengee = '[Challenge] Set Challengee',
  ClearChallenge = '[Challenge] Clear Challenge',
  Battle = '[Challenge] Battle!',
  BattleOutcomeDetermined = '[Challenge] Battle Outcome Determined!',
  BattleOutcomeClear = '[Challenge] Battle Outcome Clear'
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

export class BattleOutcomeDetermined implements Action {
  readonly type = ChallengeActionTypes.BattleOutcomeDetermined;

  constructor(public payload: BattleOutcome) { }
}

export class BattleOutcomeClear implements Action {
  readonly type = ChallengeActionTypes.BattleOutcomeClear;
}

export type ChallengeActions =
  SetChallenger
  | SetChallengee
  | ClearChallenge
  | Battle
  | BattleOutcomeDetermined
  | BattleOutcomeClear;
