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

import { AppEffects, SCHEDULER, DEBOUNCE } from './app.effects';
import { DancerService } from './../dancer.service';
import { Dancer } from './../models/dancer.model';
import {
  LoadDancers,
  LoadDancersSuccess,
  LoadDancersFail,
  GetDancer,
  GetDancerSuccess,
  GetDancerFail,
  UpdateDancer,
  UpdateDancerSuccess,
  UpdateDancerFail
} from './../actions/dancer.actions';

import {
  Search,
  SearchSuccess,
  SearchFail
} from './../actions/search.actions';
import { BattleOutcome } from '../reducers/challenge.reducer';
import { Battle, BattleOutcomeDetermined, BattleFail } from '../actions/challenge.actions';

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

class MockDancerService {
  getDancers = jasmine.createSpy('getDancers');
  getDancer = jasmine.createSpy('getDancer');
  updateDancer = jasmine.createSpy('updateDancer');
  searchDancers = jasmine.createSpy('searchDancers');
  determineBattleWinnerByCategory = jasmine.createSpy('determineBattleWinnerByCategory');
}

describe('AppEffects', () => {
  let actions$: TestActions;
  let effects: AppEffects;
  let dancerService: any;
  let location: SpyLocation;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        { provide: DancerService, useClass: MockDancerService },
        { provide: Actions, useFactory: getActions },
        { provide: DEBOUNCE, useValue: 30 },
        { provide: SCHEDULER, useFactory: getTestScheduler }
      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(AppEffects);
    dancerService = TestBed.get(DancerService);
    actions$ = TestBed.get(Actions);
    location = TestBed.get(Location);
  });

  describe('loadDancers$', () => {
    it('should return a LoadDancersSuccess, with dancers, on success', () => {
      // payload data
      const dancer1 = { id: 1, name: 'test1' } as Dancer;
      const dancer2 = { id: 2, name: 'test2' } as Dancer;
      const dancers = [dancer1, dancer2];

      // start action and completion action
      const action = new LoadDancers();
      const completion = new LoadDancersSuccess({ dancers: dancers });

      // setup the Effect
      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: dancers });
      const expected = cold('--c', { c: completion });
      dancerService.getDancers.and.returnValue(response);

      expect(effects.loadDancers$).toBeObservable(expected);
    });

    it('should return a LoadDancersFail if there is a failure', () => {
      const error = 'Epic fail!!!';
      const action = new LoadDancers();
      const completion = new LoadDancersFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      dancerService.getDancers.and.returnValue(response);

      expect(effects.loadDancers$).toBeObservable(expected);
    });
  });

  describe('getDancer$', () => {
    const dancer = { id: 1, name: 'test1' } as Dancer;

    it('should return a GetDancerSuccess, with a dancer, on success', () => {
      const action = new GetDancer(dancer.id);
      const completion = new GetDancerSuccess({ id: dancer.id, changes: dancer });

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: dancer });
      const expected = cold('--c', { c: completion });
      dancerService.getDancer.and.returnValue(response);

      expect(effects.getDancer$).toBeObservable(expected);
    });

    it('should return a GetDancerFail if there is a failure', () => {
      const action = new GetDancer(dancer.id);
      const error = 'Oh noooooooo!!!';
      const completion = new GetDancerFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      dancerService.getDancer.and.returnValue(response);

      expect(effects.getDancer$).toBeObservable(expected);
    });
  });

  describe('updateDancer$', () => {
    const dancer = { id: 1, name: 'test1' } as Dancer;

    it('should return an UpdateDancerSuccess, with the dancer changes, and navigate back on success', () => {
      location.back = jasmine.createSpy('back');
      const action = new UpdateDancer(dancer);
      const completion = new UpdateDancerSuccess({ dancer: { id: dancer.id, changes: dancer } });

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: dancer });
      const expected = cold('--c', { c: completion });
      dancerService.updateDancer.and.returnValue(response);

      expect(effects.updateDancer$).toBeObservable(expected);
      expect(location.back).toHaveBeenCalled();
    });

    it('should return an UpdateDancerFail if there is a failure', () => {
      const action = new UpdateDancer(dancer);
      const error = 'This is very, very bad';
      const completion = new UpdateDancerFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      dancerService.updateDancer.and.returnValue(response);

      expect(effects.updateDancer$).toBeObservable(expected);
    });
  });

  describe('search$', () => {
    it('should return a SearchSuccess, after a de-bounce, on success', () => {
      const dancer1 = { id: 1, name: 'test1' } as Dancer;
      const dancer2 = { id: 2, name: 'test2' } as Dancer;
      const dancers = [dancer1, dancer2];
      const action = new Search('test');
      const completion = new SearchSuccess(dancers);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b|', { b: dancers });
      const expected = cold('-----c', { c: completion });
      dancerService.searchDancers.and.returnValue(response);

      expect(effects.search$).toBeObservable(expected);
    });

    it('should return a SearchFail on failure', () => {
      const action = new Search('query');
      const error = 'OMG! Another Failure!?';
      const completion = new SearchFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('-----b', { b: completion });
      dancerService.searchDancers.and.returnValue(response);

      expect(effects.search$).toBeObservable(expected);
    });

    it('should return a SearchSuccess, after each de-bounce period, on success', () => {
      const dancer1 = { id: 1, name: 'test1' } as Dancer;
      const dancer2 = { id: 2, name: 'test2' } as Dancer;
      const dancers = [dancer1, dancer2];
      const action = new Search('test');
      const completion = new SearchSuccess(dancers);

      actions$.stream = hot('-a---a-a', { a: action });
      const response = cold('-b|', { b: dancers });
      const expected = cold('-----c-----c', { c: completion });
      dancerService.searchDancers.and.returnValue(response);

      expect(effects.search$).toBeObservable(expected);
    });
  });

  describe('battle$', () => {
    it('should return a BattleOutcomeDetermined action on completion', () => {
      // BattleOutcome is an enum representing the different possible outcomes
      const battleOutcome = BattleOutcome.ChallengerWins;
      // create the dancers that will be challenging each other in the battle
      const challenger = new Dancer();
      const challengee = new Dancer();
      const action = new Battle({
        challenger: challenger,
        challengee: challengee
      });
      const completion = new BattleOutcomeDetermined(battleOutcome);
  
      // the Battle action is dispatched
      actions$.stream = hot('-a', { a: action });
      // the battle outcome is determined
      const battle = cold('-b', { b: battleOutcome });
      // upon success completion the BattleOutcomeDetermined action is returned
      const expected = cold('--c', { c: completion });
      // the determineBattleWinnerByCategory() function is used to determine the outcome
      // a spy has been created for this function so we can have it return the battle outcome here
      dancerService.determineBattleWinnerByCategory.and.returnValue(battle);
  
      // the end result of the battle$ effect
      expect(effects.battle$).toBeObservable(expected);
      // the determineBattleWinnerByCategory() should have been called with the challengers as arguments
      expect(dancerService.determineBattleWinnerByCategory).toHaveBeenCalledWith(challenger, challengee);
    });

    it('should return a BattleFail if there is an error when processing the battle', () => {
      // the error message that will be thrown
      const error = 'When you error I will catch you (I will be waiting time after time)';
      const challenger = new Dancer();
      const challengee = new Dancer();
      const action = new Battle({
        challenger: challenger,
        challengee: challengee
      });
      const completion = new BattleFail(error);
  
      actions$.stream = hot('-a', { a: action });
      // instead of returning a value an error is thrown
      const battle = cold('-#', { }, error);
      const expected = cold('--c', { c: completion });
      dancerService.determineBattleWinnerByCategory.and.returnValue(battle);
  
      expect(effects.battle$).toBeObservable(expected);
    });


    it('should return a BattleOutcomeDetermined action on completion with a 50 frame delay', () => {
      const battleOutcome = BattleOutcome.ChallengerWins;
      const challenger = new Dancer();
      const challengee = new Dancer();
      // this time the payload for the Battle action includes a delay value
      const action = new Battle({
        challenger: challenger,
        challengee: challengee,
        delay: 50
      });
      const completion = new BattleOutcomeDetermined(battleOutcome);

      actions$.stream = hot('-a', { a: action });
      const battle = cold('-b', { b: battleOutcome });
      const expected = cold('-------c', { c: completion });
      dancerService.determineBattleWinnerByCategory.and.returnValue(battle);

      expect(effects.battle$).toBeObservable(expected);
  });
  });
});
