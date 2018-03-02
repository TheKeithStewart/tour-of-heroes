import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Hero } from './../models/hero.model';

export enum HeroActionTypes {
  LoadHeroes = '[Hero] Load Heroes',
  AddHero = '[Hero] Add Hero',
  UpsertHero = '[Hero] Upsert Hero',
  AddHeroes = '[Hero] Add Heroes',
  UpsertHeroes = '[Hero] Upsert Heroes',
  UpdateHero = '[Hero] Update Hero',
  UpdateHeroes = '[Hero] Update Heroes',
  DeleteHero = '[Hero] Delete Hero',
  DeleteHeroes = '[Hero] Delete Heroes',
  ClearHeroes = '[Hero] Clear Heroes',
  GetHeroes = '[Hero] Get Heroes',
  GetHeroesError = '[Hero] Get Heroes Error',
  GetHero = '[Hero] Get Hero',
  GetHeroSuccess = '[Hero] Get Hero Success',
  GetHeroError = '[Hero] Get Hero Error'
}

export class LoadHeroes implements Action {
  readonly type = HeroActionTypes.LoadHeroes;

  constructor(public payload: { heroes: Hero[] }) { }
}

export class AddHero implements Action {
  readonly type = HeroActionTypes.AddHero;

  constructor(public payload: { hero: Hero }) { }
}

export class UpsertHero implements Action {
  readonly type = HeroActionTypes.UpsertHero;

  constructor(public payload: { hero: Update<Hero> }) { }
}

export class AddHeroes implements Action {
  readonly type = HeroActionTypes.AddHeroes;

  constructor(public payload: { heroes: Hero[] }) { }
}

export class UpsertHeroes implements Action {
  readonly type = HeroActionTypes.UpsertHeroes;

  constructor(public payload: { heroes: Update<Hero>[] }) { }
}

export class UpdateHero implements Action {
  readonly type = HeroActionTypes.UpdateHero;

  constructor(public payload: { hero: Update<Hero> }) { }
}

export class UpdateHeroes implements Action {
  readonly type = HeroActionTypes.UpdateHeroes;

  constructor(public payload: { heroes: Update<Hero>[] }) { }
}

export class DeleteHero implements Action {
  readonly type = HeroActionTypes.DeleteHero;

  constructor(public payload: { id: number }) { }
}

export class DeleteHeroes implements Action {
  readonly type = HeroActionTypes.DeleteHeroes;

  constructor(public payload: { ids: number[] }) { }
}

export class ClearHeroes implements Action {
  readonly type = HeroActionTypes.ClearHeroes;
}

export class GetHeroes implements Action {
  readonly type = HeroActionTypes.GetHeroes;
}

export class GetHeroesError implements Action {
  readonly type = HeroActionTypes.GetHeroesError;

  constructor(public payload: string) { }
}

export class GetHero implements Action {
  readonly type = HeroActionTypes.GetHero;

  constructor(public payload: number) { }
}

export class GetHeroSuccess implements Action {
  readonly type = HeroActionTypes.GetHeroSuccess;

  constructor(public payload: Update<Hero>) { }
}

export class GetHeroError implements Action {
  readonly type = HeroActionTypes.GetHeroError;

  constructor(public payload: string) { }
}

export type HeroActions =
  LoadHeroes
  | AddHero
  | UpsertHero
  | AddHeroes
  | UpsertHeroes
  | UpdateHero
  | UpdateHeroes
  | DeleteHero
  | DeleteHeroes
  | ClearHeroes
  | GetHeroes
  | GetHeroesError
  | GetHero
  | GetHeroSuccess
  | GetHeroError;
