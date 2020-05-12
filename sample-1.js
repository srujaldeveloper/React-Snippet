import {applyMiddleware, createStore, Store} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as appActionTypes from "../actions/App.action";
import DasApi from "../api/Das.api";
import {setMokeAPI} from "../helpers/apiHelper";
import rootReducer, {TCombinedState} from "../reducers/rootReducer";


export type TQueryParams = {
	agentId: string,
	investorId: string
};

export function configureStore(queryParams?: TQueryParams) {
	let middleware = applyMiddleware(thunk);
	try {
		if (process.env.NODE_ENV === "development") {
			middleware = composeWithDevTools(middleware);
		}

		// let initialState: TCombinedState = SessionHelper.loadState("store");

		const store = createStore(rootReducer, {}, middleware) as Store<TCombinedState>;

		// store.subscribe(() => {
		// 	SessionHelper.saveState("store", store.getState());
		// });

		const parseJson = function (returnedJson) {
			const action = appActionTypes.loadAppStateSuccess(returnedJson);
			store.dispatch(action);
		};

		const initialLoadError = function (loaderror) {
			const action = appActionTypes.loadAppStateFailure();
			store.dispatch(action);
		};
		setMokeAPI();
		queryParams.agentId ? queryParams.agentId = "1" : queryParams.agentId = "AG1634";
		DasApi.GetAppInitialState(queryParams.agentId, queryParams.investorId, parseJson);

		return store;
	} catch (ex) {
		throw ex;
	}
}
