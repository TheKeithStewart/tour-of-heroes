import { reducer, State } from './challenge.reducer';
import { Battle } from '../actions/challenge.actions';

describe('Challenge Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const initialState: State = {
        challengerId: null,
        challengeeId: null,
        battleInProgress: false
      };

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Battle', () => {
    it('should set battleInProgress to true if challengers have been selected', () => {
      const initialState: State = {
        challengerId: 1,
        challengeeId: 2,
        battleInProgress: false
      };
      const action = new Battle();
      const expectedResult: State = {
        challengerId: 1,
        challengeeId: 2,
        battleInProgress: true
      }
      
      const result = reducer(initialState, action);
      expect(result).toEqual(expectedResult);
    });
    
    it('should return the existing state if challenger has not been chosen', () => {
      const initialState: State = {
        challengerId: null,
        challengeeId: 2,
        battleInProgress: false
      };
      const action = new Battle();
      
      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
    
    it('should return the existing state if challengee has not been chosen', () => {
      const initialState: State = {
        challengerId: 1,
        challengeeId: null,
        battleInProgress: false
      };
      const action = new Battle();
      
      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });
});
