import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { AppEffects } from './app.effects';
import { HeroService } from './../hero.service';
import { Hero } from './../models/hero.model';
import {
  LoadHeroes,
  LoadHeroesSuccess,
  LoadHeroesError
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
}

describe('AppService', () => {
  let actions$: TestActions;
  let effects: AppEffects;
  let heroService: any;

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
  });

  describe('loadHeroes$', () => {
    it('should return a LoadHeroesSuccess, with heroes, after success', () => {
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

    it('should return a LoadHeroesError if an error is thrown', () => {
      const action = new LoadHeroes();
      const error = 'Epic fail!!!';
      const completion = new LoadHeroesError(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      heroService.getHeroes.and.returnValue(response);

      expect(effects.loadHeroes$).toBeObservable(expected);
    });
  });
});
