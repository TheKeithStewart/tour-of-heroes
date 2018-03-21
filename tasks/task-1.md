### Tasks ###

* **Task 1 <-**
* [Task 2](./task-2.md)
* [Task 3](./task-3.md)
* [Task 4 (optional)](./task-4.md)

### Description ###

When a `Battle` action is dispatched the dance battle begins. The winner is determined by executing the DancerService.determineBattleWinnerByCategory() function. The result of that function should be included as the payload of the BattleOutcomeDetermined action completing the effect.

### Steps ###

Before we can start writing our test we need to create the initial shell of the functionality that we will be testing. This is so that we will be able to import a reference to that functionality in our tests. To create the shell of our effect add the following to the `src/app/effects/app.effects.ts` file:

```ts
@Effect()
battle$: Observable<Action> = this.actions$.pipe(

);
```

Now let's write our first test. The first thing that we need to do is create a new `describe` function to group together the tests for our `battle$` effect. Add the following to the bottom of the `AppEffects` describe function in `src/app/effects/app.effects.spec.ts`:

```ts
describe('battle$', () => {

}
```

Inside of the describe add the `it` function that will be your test and explain what you expect to happen in this test:

```ts
it('should return a BattleOutcomeDetermined action on completion', () => {

}
```

Next, at the top of the test setup the data that will be needed for this test:

```ts
// BattleOutcome is an enum representing the different possible outcomes
const battleOutcome = BattleOutcome.ChallengerWins;
// create the dancers that will be challenging each other in the battle
const challenger = new Dancer();
const challengee = new Dancer();
```

Then setup the start and completion actions:

```ts
const action = new Battle({
  challenger: challenger,
  challengee: challengee
});
const completion = new BattleOutcomeDetermined(battleOutcome);
```

Now it is time to setup the data stream. To recap the sequence of events, the following will be happening in this effect:

1. The dispatching of the `Battle` action starts the effect
1. Next the battle outcome will be determined
1. Then the expected result is that the `BattleOutcomeDetermined` action is returned

To setup the data stream for these events add the following to your test:

```ts
// the Battle action is dispatched
actions$.stream = hot('-a', { a: action });
// the battle outcome is determined
const battle = cold('-b', { b: battleOutcome });
// upon success completion the BattleOutcomeDetermined action is returned
const expected = cold('--c', { c: completion });
// the determineBattleWinnerByCategory() function is used to determine the outcome
// a spy has been created for this function so we can have it return the battle outcome here
dancerService.determineBattleWinnerByCategory.and.returnValue(battle);
```

Lastly we add our expectations:

```ts
// the end result of the battle$ effect
expect(effects.battle$).toBeObservable(expected);
// the determineBattleWinnerByCategory() should have been called with the challengers as arguments
expect(dancerService.determineBattleWinnerByCategory).toHaveBeenCalledWith(challenger, challengee);
```

The end result of all this should be:

```ts
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
});
```

Once you have done this you will have a unit test that is failing. The next thing that we need to do is write the rest of the Effect to get the test to pass.

The completed Effect (in the `app.effects.ts` file) should look like this:

```ts
@Effect()
battle$: Observable<Action> = this.actions$.pipe(
  ofType<Battle>(ChallengeActionTypes.Battle),
  switchMap(action => this.dancerService.determineBattleWinnerByCategory(action.payload.challenger, action.payload.challengee).pipe(
    map((outcome: BattleOutcome) => new BattleOutcomeDetermined(outcome))
  ))
);
```
