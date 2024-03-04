import ApiService from "@/common/api.service";

import {GetterTree, ActionTree, MutationTree,Module} from 'vuex';

/* eslint-disable @typescript-eslint/no-explicit-any */

// action types
export const GET_DISHES = "/dishes";

// mutation types

export const SET_DISHES = "setDishes";
export const SET_ERROR = "setError";


export const state = () => ({
    dishes: [] as any,
    errors: null,
})

type RootState = ReturnType<typeof state>
const getters: GetterTree<RootState, RootState> = {
    dishes :state  =>  state.dishes,
}

const mutations: MutationTree<RootState> = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_DISHES](state, data) {
        state.dishes = data;
    },
}

const actions: ActionTree<RootState, RootState> = {
    async  [GET_DISHES]({commit}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.query(GET_DISHES, payload)
                .then((data: any) => {
                    if (data.status) {
                        commit(SET_DISHES, data.data.data);
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

}
const dishModule: Module<any, any> = {
    state,
    mutations,
    actions,
    getters,
}

export default dishModule