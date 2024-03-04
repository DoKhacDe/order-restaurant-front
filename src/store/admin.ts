//
// import ApiService from "@/common/api.service";
//
// import {GetterTree, ActionTree, MutationTree,Module} from 'vuex';
// import API from "@/common/API";
//
// /* eslint-disable @typescript-eslint/no-explicit-any */
//
// // action types
// export const LIST_ADMINS_SEARCH = "/admins/search";
// export const ADD_ADMINS = "addAdmin";
// export const DETAIL_ADMIN = "detailAdmin";
// export const UPDATE_ADMIN = "updateAdmin";
// export const DELETE_ADMIN = "deleteAdmin";
//
// // mutation types
//
// export const SET_LIST_ADMINS = "setListAdmins";
// export const SET_DETAIL_ADMIN = "setDetailAdmins";
// export const SET_ERROR = "setError";
//
//
// export const state = () => ({
//     errors: null,
//     list_admins: [],
//     detail_admin: {},
// })
//
// type RootState = ReturnType<typeof state>
// const getters: GetterTree<RootState, RootState> = {
//     listAdminsSearch:state  =>  state.list_admins,
//     detailAdmin:state  =>  state.detail_admin,
// }
//
// const mutations: MutationTree<RootState> = {
//     [SET_ERROR](state, error) {
//         state.errors = error;
//     },
//     [SET_LIST_ADMINS](state, error) {
//         state.list_admins = error;
//     },
//     [SET_DETAIL_ADMIN](state, error) {
//         state.detail_admin = error;
//     },
// }
//
// const actions: ActionTree<RootState, RootState> = {
//       [DETAIL_ADMIN](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.get(API.DETAIL_ADMIN, credentials)
//                 .then((data:any) => {
//                     if (data.status) {
//                         context.commit(SET_DETAIL_ADMIN, data.data.data);
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
//     [LIST_ADMINS_SEARCH](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.query(LIST_ADMINS_SEARCH, credentials)
//                 .then((data:any) => {
//                     if (data.status) {
//                         context.commit(SET_LIST_ADMINS, data.data.data);
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
//       [ADD_ADMINS](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.post(API.ADD_ADMINS, credentials)
//                 .then((data) => {
//                     resolve(data)
//                 }).catch((err) => {
//                     reject(err.response.data);
//                 });
//         });
//     },
//     [UPDATE_ADMIN](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.put(`${API.UPDATE_ADMIN}/${credentials.id}`, credentials)
//                 .then((data) => {
//                     resolve(data)
//                 }).catch((err) => {
//                     reject(err.response.data);
//                 });
//         });
//     },
//     [DELETE_ADMIN](context, credentials) {
//         return new Promise((resolve, reject) => {
//             ApiService.delete(`${API.DELETE_ADMIN}`, credentials)
//                 .then((data) => {
//                     resolve(data)
//                 }).catch((err) => {
//                     reject(err.response.data);
//                 });
//         });
//     },
// }
// const adminModule: Module<any, any> = {
//     state,
//     mutations,
//     actions,
//     getters,
// }
//
// export default adminModule