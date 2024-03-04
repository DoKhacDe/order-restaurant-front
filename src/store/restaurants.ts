import ApiService from "@/common/api.service";

import {GetterTree, ActionTree, MutationTree,Module} from 'vuex';

/* eslint-disable @typescript-eslint/no-explicit-any */

// action types
export const GET_RESTAURANT = "/restaurants";
export const DETAIL_RESTAURANT = "/restaurant-detail";

// mutation types

export const SET_RESTAURANT = "setRestaurants";
export const SET_DETAIL_RESTAURANT = "setRestaurantDetail";
export const SET_ERROR = "setError";


export const state = () => ({
    restaurants: [] as any,
    restaurant: {} as any,
    errors: null,
})

type RootState = ReturnType<typeof state>
const getters: GetterTree<RootState, RootState> = {
    restaurants :state  =>  state.restaurants,
    detailRestaurant :state  =>  state.restaurant,
}

const mutations: MutationTree<RootState> = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_RESTAURANT](state, data) {
        state.restaurants = data;
    },
    [SET_DETAIL_RESTAURANT](state, data) {
        state.restaurant = data;
    },
}

const actions: ActionTree<RootState, RootState> = {
    async  [GET_RESTAURANT](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.query(GET_RESTAURANT, credentials)
                .then((data: any) => {
                    if (data.status) {
                        context.commit(SET_RESTAURANT, data.data.data);
                    } else {
                        context.commit(SET_ERROR, data.message);
                    }
                    resolve(data.data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    async  [DETAIL_RESTAURANT]({commit}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.query(DETAIL_RESTAURANT, payload)
                .then((data: any) => {
                    if (data.status) {
                        commit(SET_DETAIL_RESTAURANT, data.data.data);
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
const restaurantModule: Module<any, any> = {
    state,
    mutations,
    actions,
    getters,
}

export default restaurantModule