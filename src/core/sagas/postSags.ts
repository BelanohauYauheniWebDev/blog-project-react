import {
	setMyPostErrorAction,
	setMyPostsAction,
	setPostsAction,
	setSelectedPostAction,
} from "./../actions/postActions";
import { PostsService } from "./../../services/PostService";
import { IPostRequest, IPostSendRequest } from "./../../types/post";
import { call, put, takeEvery } from "redux-saga/effects";
import { ACTIONS } from "../actions/constants";
import { Action } from "redux-actions";

import { PublicService } from "../../services/PublicService";

function* getPostSaga() {
	try {
		const data: { data: IPostRequest } = yield call(() =>
			PublicService.getPosts()
		);
		yield put(setPostsAction(data.data.results));
	} catch (e: any) {
		console.log(`{e}`, { e });
	}
}

function* getMyPostSaga() {
	try {
		const data: { data: any } = yield call(() => PostsService.getMyPosts());
		yield put(setMyPostsAction(data.data));
	} catch (e: any) {
		console.log(`object`, typeof e.response.status);
		yield put(setMyPostErrorAction(e.response.status));
	}
}
function* getSelectedPostSaga({ payload: id }: Action<number>) {
	try {
		const data: { data: any } = yield call(() =>
			PublicService.getSelectedPost(id)
		);
		yield put(setSelectedPostAction(data.data));
	} catch (e: any) {}
}
function* sendPostSaga({ payload }: Action<IPostSendRequest>) {
	try {
		yield call(() => PostsService.sendPost(payload));
	} catch (e: any) {}
}

export function* postsSaga() {
	yield takeEvery(ACTIONS.GET_POSTS, getPostSaga);
	yield takeEvery(ACTIONS.GET_MY_POSTS, getMyPostSaga);
	yield takeEvery(ACTIONS.GET_SELECTED_POST, getSelectedPostSaga);
	yield takeEvery(ACTIONS.SEND_POST, sendPostSaga);
}
