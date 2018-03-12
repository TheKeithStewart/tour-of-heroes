import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Dancer } from './../models/dancer.model';

export enum HeroActionTypes {
  AddDancer = '[Dancer] Add Hero',
  UpsertDancer = '[Dancer] Upsert Hero',
  AddDancers = '[Dancer] Add Heroes',
  UpsertDancers = '[Dancer] Upsert Heroes',
  UpdateDancer = '[Dancer] Update Hero',
  UpdateDancerSuccess = '[Dancer] Update Hero Success',
  UpdateDancerFail = '[Dancer] Update Hero Fail',
  UpdateDancers = '[Dancer] Update Heroes',
  DeleteDancer = '[Dancer] Delete Hero',
  DeleteDancers = '[Dancer] Delete Heroes',
  ClearHeroes = '[Dancer] Clear Heroes',
  LoadHeroes = '[Dancer] Load Heroes',
  LoadHeroesSuccess = '[Dancer] Load Heroes Success',
  LoadHeroesFail = '[Dancer] Load Heroes Fail',
  GetHero = '[Dancer] Get Hero',
  GetHeroSuccess = '[Dancer] Get Hero Success',
  GetHeroFail = '[Dancer] Get Hero Fail',
  Search = '[Dancer] Search',
  SearchSuccess = '[Dancer] Search Success',
  SearchFail = '[Dancer] Search Fail'
}

export class AddHero implements Action {
  readonly type = HeroActionTypes.AddDancer;

  constructor(public payload: { hero: Dancer }) { }
}

export class UpsertHero implements Action {
  readonly type = HeroActionTypes.UpsertDancer;

  constructor(public payload: { hero: Update<Dancer> }) { }
}

export class AddHeroes implements Action {
  readonly type = HeroActionTypes.AddDancers;

  constructor(public payload: { heroes: Dancer[] }) { }
}

export class UpsertHeroes implements Action {
  readonly type = HeroActionTypes.UpsertDancers;

  constructor(public payload: { heroes: Update<Dancer>[] }) { }
}

export class UpdateHero implements Action {
  readonly type = HeroActionTypes.UpdateDancer;

  constructor(public payload: Dancer) { }
}

export class UpdateHeroSuccess implements Action {
  readonly type = HeroActionTypes.UpdateDancerSuccess;

  constructor(public payload: { hero: Update<Dancer> }) { }
}

export class UpdateHeroFail implements Action {
  readonly type = HeroActionTypes.UpdateDancerFail;

  constructor(public payload: string) { }
}

export class UpdateHeroes implements Action {
  readonly type = HeroActionTypes.UpdateDancers;

  constructor(public payload: { heroes: Update<Dancer>[] }) { }
}

export class DeleteHero implements Action {
  readonly type = HeroActionTypes.DeleteDancer;

  constructor(public payload: { id: number }) { }
}

export class DeleteHeroes implements Action {
  readonly type = HeroActionTypes.DeleteDancers;

  constructor(public payload: { ids: number[] }) { }
}

export class ClearHeroes implements Action {
  readonly type = HeroActionTypes.ClearHeroes;
}

export class LoadHeroes implements Action {
  readonly type = HeroActionTypes.LoadHeroes;
}

export class LoadHeroesSuccess implements Action {
  readonly type = HeroActionTypes.LoadHeroesSuccess;

  constructor(public payload: { heroes: Dancer[] }) { }
}

export class LoadHeroesFail implements Action {
  readonly type = HeroActionTypes.LoadHeroesFail;

  constructor(public payload: string) { }
}

export class GetDancer implements Action {
  readonly type = HeroActionTypes.GetHero;

  constructor(public payload: number) { }
}

export class GetHeroSuccess implements Action {
  readonly type = HeroActionTypes.GetHeroSuccess;

  constructor(public payload: Update<Dancer>) { }
}

export class GetHeroFail implements Action {
  readonly type = HeroActionTypes.GetHeroFail;

  constructor(public payload: string) { }
}

export class Search implements Action {
  readonly type = HeroActionTypes.Search;

  constructor(public payload: string) { }
}

export class SearchSuccess implements Action {
  readonly type = HeroActionTypes.SearchSuccess;

  constructor(public payload: Dancer[]) { }
}

export class SearchFail implements Action {
  readonly type = HeroActionTypes.SearchFail;

  constructor(public payload: string) { }
}

export type HeroActions =
  LoadHeroesSuccess
  | AddHero
  | UpsertHero
  | AddHeroes
  | UpsertHeroes
  | UpdateHero
  | UpdateHeroSuccess
  | UpdateHeroFail
  | UpdateHeroes
  | DeleteHero
  | DeleteHeroes
  | ClearHeroes
  | LoadHeroes
  | LoadHeroesFail
  | GetDancer
  | GetHeroSuccess
  | GetHeroFail
  | Search
  | SearchSuccess
  | SearchFail;
