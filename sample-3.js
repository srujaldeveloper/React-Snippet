import * as React from "react";
import { ReactPropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppActions from "../../actions/App.action";
import * as GoalActions from "../../actions/Goal.action";
import * as InvestorActions from "../../actions/Investor.action";
import { TAppState } from "../../models/AppState.model";
import { TGoal } from "../../models/Goal.model";
import { TGoalType } from "../../models/GoalTypes.model";
import { TInvestor } from "../../models/Investor.model";
import {InvestmentTargetComponent} from "../../components/Goals/InvestmentTarget.component";
import {TInvestmentInfo} from "../../models/InvestmentInfo.model";

import {GoalsComponent} from "../../components/Goals/Goals.component";
import { TInvestmentState } from "../../reducers/Investment.reducer";

// Use this as the return type of mapStateToProps
export type TGoalsContainerStateProps = {
	goal?: TGoal;
	goalTypes?: TGoalType[];
	appState?: TAppState;
	investor?: TInvestor;
	investmentState?: TInvestmentState;
};

// Use this as the return type of mapDispatchToProps
export type TGoalsContainerDispatchProps = {
	goalActions?: any;
	appActions?: any;
	investorActions?: any;
};

const mapStateToProps = (combinedState: any): TGoalsContainerStateProps => {
	return {
		goal: combinedState.goalState.goal,
		goalTypes: combinedState.goalState.goalTypes,
		appState: combinedState.appState,
		investor: combinedState.investorState.investor,
		investmentState: combinedState.investmentState
	};
};

const mapDispatchToProps = (dispatch: any): TGoalsContainerDispatchProps => {
	return {
		goalActions: bindActionCreators(GoalActions as any, dispatch),
		appActions: bindActionCreators(AppActions as any, dispatch),
		investorActions: bindActionCreators(InvestorActions as any, dispatch),
	};
};

export const GoalsContainer = connect(mapStateToProps, mapDispatchToProps)(GoalsComponent);