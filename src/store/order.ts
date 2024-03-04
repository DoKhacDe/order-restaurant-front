import ApiService from "@/common/api.service";

import {GetterTree, ActionTree, MutationTree,Module} from 'vuex';

/* eslint-disable @typescript-eslint/no-explicit-any */

// action types
export const GET_DETAIL_ORDER = "/detail-order";
export const GET_LIST_ORDER = "/list-order";
export const SAVE_ORDER = "/save-order";

// mutation types

export const SET_ORDER = "setDetailOrder";
export const SET_LIST_ORDER = "setListOrder";
export const SET_ERROR = "setError";


export const state = () => ({
    order_detail: {} as any,
    orders: [] as any,
    errors: null,
})

type RootState = ReturnType<typeof state>
const getters: GetterTree<RootState, RootState> = {
    orderDetail :state  =>  state.order_detail,
    orders :state  =>  state.orders,
}

const mutations: MutationTree<RootState> = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_ORDER](state, data) {
        state.order_detail = data;
    },
    [SET_LIST_ORDER](state, data) {
        state.orders = data;
    },
}

const actions: ActionTree<RootState, RootState> = {
    async  [GET_DETAIL_ORDER]({commit}, id) {
        return new Promise((resolve, reject) => {
            ApiService.get(GET_DETAIL_ORDER, id)
                .then((data: any) => {
                    if (data.status) {
                        commit(SET_ORDER, data.data.data);
                    } else {
                        commit(SET_ERROR, data.message);
                    }
                    resolve(data.data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    async  [GET_LIST_ORDER]({commit}) {
        return new Promise((resolve, reject) => {
            ApiService.get(GET_LIST_ORDER)
                .then((data: any) => {
                    if (data.status) {
                        commit(SET_LIST_ORDER, data.data.data);
                    } else {
                        commit(SET_ERROR, data.message);
                    }
                    resolve(data.data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    async  [SAVE_ORDER]({commit}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post(SAVE_ORDER, payload)
                .then((data: any) => {
                    resolve(data.data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
}
const orderModule: Module<any, any> = {
    state,
    mutations,
    actions,
    getters,
}

export default orderModule