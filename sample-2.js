import { TGoalAction } from "../actions/Goal.action";
import * as actionsTypes from "../constants/actionsTypes";
import * as investmentActionTypes from "../actions/Investment.action";
import { TInvestmentAction } from "../actions/Investment.action";
import { TGoal } from "../models/Goal.model";
import { TGoalType } from "../models/GoalTypes.model";

export type TGoalState = {
	goal: TGoal;
	goalTypes: TGoalType[];
};

const initialState: TGoalState = {
	goal: {} as TGoal,
	goalTypes: [] as TGoalType[]
};

export const GoalReducer =
	(state: TGoalState = initialState, action: TGoalAction | TInvestmentAction): TGoalState => {
		let newState;
		switch (action.type) {
			case actionsTypes.LOAD_GOAL_SUCCESS:
			case actionsTypes.SAVE_GOAL_SUCCESS:
			case actionsTypes.UPDATE_GOAL_SUCCESS:
				newState = Object.assign({}, state);
				newState.goal = action.goal;
				return newState;
			case actionsTypes.LOAD_GOAL_TYPES_SUCCESS:
				newState = Object.assign({}, state);
				newState.goalTypes = action.goalTypes;
				return newState;
			case investmentActionTypes.UPDATE_INVESTMENTSTRATEGY_AMOUNT:
				newState = Object.assign({}, state);
				if (newState.goal) {
					newState.goal.SavingsCurrent = action.investmentAmount;
				}
				return newState;
			case actionsTypes.LOAD_GOAL_FAILURE:
			case actionsTypes.SAVE_GOAL_FAILURE:
			case actionsTypes.UPDATE_GOAL_FAILURE:
			case actionsTypes.LOAD_GOAL_TYPES_FAILURE:
				return state;
			default:
				return state;
		}
	};