//
// import ApiService from "@/common/api.service";
//
// import {GetterTree, ActionTree, MutationTree,Module} from 'vuex';
// import API from "@/common/API";
//
// /* eslint-disable @typescript-eslint/no-explicit-any */
//
// // action types
// export const LIST_USERS_SEARCH = "/users/search";
// export const ADD_USERS = "addUser";
// export const DETAIL_USER = "detailUser";
// export const UPDATE_USER = "updateUser";
// export const DELETE_USER = "deleteUser";
//
// // mutation types
//
// export const SET_LIST_USERS = "setListUsers";
// export const SET_DETAIL_USER = "setDetailUsers";
// export const SET_ERROR = "setError";
//
//
// export const state = () => ({
//     errors: null,
//     list_users: [],
//     detail_user: {},
// })
//
// type RootState = ReturnType<typeof state>
// const getters: GetterTree<RootState, RootState> = {
//     listUsersSearch:state  =>  state.list_users,
//     detailUser:state  =>  state.detail_user,
// }
//
// const mutations: MutationTree<RootState> = {
//     [SET_ERROR](state, error) {
//         state.errors = error;
//     },
//     [SET_LIST_USERS](state, error) {
//         state.list_users = error;
//     },
//     [SET_DETAIL_USER](state, error) {
//         state.detail_user = error;
//     },
// }
//
// const actions: ActionTree<RootState, RootState> = {
//       [DETAIL_USER](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.get(API.DETAIL_USER, credentials)
//                 .then((data:any) => {
//                     if (data.status) {
//                         context.commit(SET_DETAIL_USER, data.data.data);
//                     } else {
//                         context.commit(SET_ERROR, data.message);
//                     }
//                     resolve(data);
//                 })
//                 .catch(({ response }) => {
//                     reject(response);
//                 });
//         });
//     },
//
//     [LIST_USERS_SEARCH](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.query(LIST_USERS_SEARCH, credentials)
//                 .then((data:any) => {
//                     if (data.status) {
//                         context.commit(SET_LIST_USERS, data.data.data);
//                     } else {
//                         context.commit(SET_ERROR, data.message);
//                     }
//                     resolve(data);
//                 })
//                 .catch(({ response }) => {
//                     reject(response);
//                 });
//         });
//     },
//
//       [ADD_USERS](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.post(API.ADD_USERS, credentials)
//                 .then((data) => {
//                     resolve(data)
//                 }).catch((err) => {
//                     reject(err.response.data);
//                 });
//         });
//     },
//     [UPDATE_USER](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.put(`${API.UPDATE_USER}/${credentials.id}`, credentials)
//                 .then((data) => {
//                     resolve(data)
//                 }).catch((err) => {
//                     reject(err.response.data);
//                 });
//         });
//     },
//     [DELETE_USER](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.delete(`${API.DELETE_USER}`, credentials)
//                 .then((data) => {
//                     resolve(data)
//                 }).catch((err) => {
//                     reject(err.response.data);
//                 });
//         });
//     },
// }
// const userModule: Module<any, any> = {
//     state,
//     mutations,
//     actions,
//     getters,
// }
//
// export default userModule