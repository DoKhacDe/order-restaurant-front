import ApiService from "@/common/api.service";
import jwtService from "@/common/jwt.service";

import {GetterTree, ActionTree, MutationTree,Module} from 'vuex';

/* eslint-disable @typescript-eslint/no-explicit-any */

// action types
export const ADMIN_DETAIL = "/auth/me";

// mutation types

export const SET_ADMIN = "setAdminDetail";
export const SET_ERROR_ADMIN = "setErrorAdmin";


export const state = () => ({
    admin_detail: {} as any,
    errors_admin: null,
})

type RootState = ReturnType<typeof state>
const getters: GetterTree<RootState, RootState> = {
    admin :state  =>  state.admin_detail,
}

const mutations: MutationTree<RootState> = {
    [SET_ERROR_ADMIN](state, error) {
        state.errors_admin = error;
    },
    [SET_ADMIN](state, data) {
        state.admin_detail = data;
        jwtService.saveUser(data.data);
    },
}

const actions: ActionTree<RootState, RootState> = {
    async  [ADMIN_DETAIL](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.get(ADMIN_DETAIL, credentials)
                .then((data: any) => {
                    if (data.status) {
                        context.commit(SET_ADMIN, data.data);
                    } else {
                        context.commit(SET_ERROR_ADMIN, data.message);
                    }
                    resolve(data.data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },

}
const authModule: Module<any, any> = {
    state,
    mutations,
    actions,
    getters,
}

export default authModule