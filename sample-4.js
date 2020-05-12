import * as React from "react";
import {history, Link} from "react-router-dom";

import {
	TGoalsContainerDispatchProps,
	TGoalsContainerStateProps
} from "../../containers/Goals/Goals.container";
import "./Goals.style.css";
import {TAppState} from "../../models/AppState.model";
import {SideBarContainer} from "../../containers/common/SideBar/SideBar.container";
import {PageContainer} from "../../containers/common/Page/Page.container";
import {MenuBarContainer} from "../../containers/common/MenuBar/MenuBar.container";
import {AnnualContributionContainer} from "../../containers/Goals/AnnualContribution.container";
import {MonthlyIncomeContainer} from "../../containers/Goals/MonthlyIncome.container";
import {RetirementIncomeContainer} from "../../containers/Goals/RetirementIncome.container";

import WealthBuilderFooter from "../common/Footer/WealthBuilderFooter.component";

import { EMenubarType } from "../../models/Menubar.model";
import { EGoalSideBarType, ESideBarGroupType, EAboutSideBarType } from "../../models/Sidebar.model";

import { GetSideBarMenuItem } from "../../helpers/sidebarHelper";

import {GoalsRetiermentAgeContainer} from "../../containers/Goals/RetirementAge.container";
import {InvestmentTargetContainer} from "../../containers/Goals/InvestmentTarget.container";

import { EGoalType } from "../../models/Goal.model";
export type TGoalProps = {
	history?: any;
	match?: any;
};

export type TGoalState = {
	appState?: TAppState
};

export type TFinalGoalProps = TGoalProps & TGoalsContainerDispatchProps & TGoalsContainerStateProps;

export class GoalsComponent extends React.Component<TFinalGoalProps, TGoalState> {

	constructor(props?: TFinalGoalProps, context?: any) {
		super(props, context);
		this.state = {
			appState: this.props.appState
		};
	}

	public componentWillMount() {

		if (this.props.appState && this.props.appState.GoalId) {
			this.props.goalActions.loadGoal(this.props.appState.GoalId); // Always use the InvestorId from AppState to load an investor
		}

		// need to call investor if investmentInfo not available
		if (!this.props.investmentState.investmentInfo || !this.props.investmentState.investmentInfo.InvestmentType) {
			this.props.investorActions.loadInvestor(this.state.appState.InvestorId);
		}
	}

	public render() {
		// const goalType = this.props.goal.GoalType; old logic
		const goalType = Number(this.props.investmentState.investmentInfo.InvestmentType);
		return (
			<div>
				<MenuBarContainer match={this.props.match} type={EMenubarType.YourGoals}/>
				<div className="goals-container">
					<div className="container-fluid ">
						<PageContainer type={EMenubarType.YourGoals} groupType={goalType === EGoalType.GeneralSavings ? ESideBarGroupType.YourGoalsGeneral : ESideBarGroupType.YourGoalsRetirement} subModule={this.props.match.params.subModule ? this.props.match.params.subModule : (goalType === EGoalType.GeneralSavings ? GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.InvestmentTarget).Key : GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.RetirementAge).Key)}>
						{(() => {
							switch (goalType) {
								case EGoalType.GeneralSavings:

									switch (this.props.match.params.subModule || (GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.InvestmentTarget).Key)) {
										case GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.InvestmentTarget).Key:
											return <InvestmentTargetContainer history={this.props.history}/>;
									}
									break;
								case EGoalType.Retirement:
									switch (this.props.match.params.subModule || (GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.RetirementAge).Key)) {
										case GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.RetirementAge).Key:
											return <GoalsRetiermentAgeContainer history={this.props.history}/>;
										case GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.MonthlyIncome).Key:
											return <MonthlyIncomeContainer history={this.props.history}/>;
										case GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.IncomeInRetirement).Key:
											return <RetirementIncomeContainer history={this.props.history}/>;
										case GetSideBarMenuItem(EMenubarType.YourGoals, EGoalSideBarType.AnnualContributions).Key:
											return <AnnualContributionContainer history={this.props.history}/>;
									}
									break;
							}
						})()}
						</PageContainer>
					</div>
				</div>
				<WealthBuilderFooter/>
			</div>
		);
	}

	public componentWillReceiveProps(nextProps: TFinalGoalProps) {

		if (nextProps.appState) {
			this.setState(
				{appState: nextProps.appState}
			);
		}

		if (this.props.goal &&
			nextProps &&
			nextProps.goal) {

			let newState: TGoalState = Object.assign({}, this.state);
			newState = Object.assign({}, newState, {
				goal: nextProps.goal
			});
			this.setState(newState);
		}

		if (nextProps.investmentState) {
			let newState: TGoalState = Object.assign({}, this.state);
			newState = Object.assign({}, newState, {
				investmentState: nextProps.investmentState
			});
		}
	}
}