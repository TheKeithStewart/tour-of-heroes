import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';
import { Location } from '@angular/common';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { async } from 'rxjs/scheduler/async';

import { AppEffects } from './app.effects';
import { HeroService } from './../hero.service';
import { Hero } from './../models/hero.model';
import {
  LoadHeroes,
  LoadHeroesSuccess,
  LoadHeroesFail,
  GetHero,
  GetHeroSuccess,
  GetHeroFail,
  UpdateHero,
  UpdateHeroSuccess,
  UpdateHeroFail,
  Search,
  SearchSuccess,
  SearchFail
} from './../actions/hero.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockHeroService {
  getHeroes = jasmine.createSpy('getHeroes');
  getHero = jasmine.createSpy('getHero');
  updateHero = jasmine.createSpy('updateHero');
  searchHeroes = jasmine.createSpy('searchHeroes');
}

describe('AppService', () => {
  let actions$: TestActions;
  let effects: AppEffects;
  let heroService: any;
  let location: SpyLocation;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        { provide: HeroService, useClass: MockHeroService },
        { provide: Actions, useFactory: getActions },

      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(AppEffects);
    heroService = TestBed.get(HeroService);
    actions$ = TestBed.get(Actions);
    location = TestBed.get(Location);
  });

  describe('loadHeroes$', () => {
    it('should return a LoadHeroesSuccess, with heroes, on success', () => {
      const hero1 = { id: 1, name: 'test1' } as Hero;
      const hero2 = { id: 2, name: 'test2' } as Hero;
      const heroes = [hero1, hero2];
      const action = new LoadHeroes();
      const completion = new LoadHeroesSuccess({ heroes: heroes });

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: heroes });
      const expected = cold('--c', { c: completion });
      heroService.getHeroes.and.returnValue(response);

      expect(effects.loadHeroes$).toBeObservable(expected);
    });

    it('should return a LoadHeroesFail if there is a failure', () => {
      const action = new LoadHeroes();
      const error = 'Epic fail!!!';
      const completion = new LoadHeroesFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      heroService.getHeroes.and.returnValue(response);

      expect(effects.loadHeroes$).toBeObservable(expected);
    });
  });

  describe('getHero$', () => {
    const hero = { id: 1, name: 'test1' } as Hero;

    it('should return a GetHeroSuccess, with a hero, on success', () => {
      const action = new GetHero(hero.id);
      const completion = new GetHeroSuccess({ id: hero.id, changes: hero });

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: hero });
      const expected = cold('--c', { c: completion });
      heroService.getHero.and.returnValue(response);

      expect(effects.getHero$).toBeObservable(expected);
    });

    it('should return a GetHeroFail if there is a failure', () => {
      const action = new GetHero(hero.id);
      const error = 'Oh noooooooo!!!';
      const completion = new GetHeroFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      heroService.getHero.and.returnValue(response);

      expect(effects.getHero$).toBeObservable(expected);
    });
  });

  describe('updateHero$', () => {
    const hero = { id: 1, name: 'test1' } as Hero;

    it('should return an UpdateHeroSuccess, with the hero changes, and navigate back on success', () => {
      location.back = jasmine.createSpy('back');
      const action = new UpdateHero(hero);
      const completion = new UpdateHeroSuccess({ hero: { id: hero.id, changes: hero } });

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: hero });
      const expected = cold('--c', { c: completion });
      heroService.updateHero.and.returnValue(response);

      expect(effects.updateHero$).toBeObservable(expected);
      expect(location.back).toHaveBeenCalled();
    });

    it('should return an UpdateHeroFail if there is a failure', () => {
      const action = new UpdateHero(hero);
      const error = 'This is very, very bad';
      const completion = new UpdateHeroFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      heroService.updateHero.and.returnValue(response);

      expect(effects.updateHero$).toBeObservable(expected);
    });
  });

  describe('search$', () => {
    beforeEach(() => {
      const testScheduler = getTestScheduler();
      async.schedule = (work, delay, state) =>     
          testScheduler.schedule(work, delay, state);
    });

    it('should return a SearchSuccess, after a 300ms de-bounce, on success', () => {
      const hero1 = { id: 1, name: 'test1' } as Hero;
      const hero2 = { id: 2, name: 'test2' } as Hero;
      const heroes = [hero1, hero2];
      const action = new Search('query');
      const completion = new SearchSuccess(heroes);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: heroes });
      const expected = cold('--------------------------------c', { c: completion });
      heroService.searchHeroes.and.returnValue(response);

      expect(effects.search$).toBeObservable(expected);
    });

    it('should return a SearchFail on failure', () => {
      const action = new Search('query');
      const error = 'OMG! Another Failure!?';
      const completion = new SearchFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--------------------------------b', { b: completion });
      heroService.searchHeroes.and.returnValue(response);

      expect(effects.search$).toBeObservable(expected);
    });
  });
});
