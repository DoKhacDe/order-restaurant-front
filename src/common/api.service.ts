import {createApp} from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./jwt.service";
import router from '@/router';
import App from "@/App.vue";
import {messageError} from "@/common/message.service";

/**
 * Service to call HTTP request via Axios
 */
const app = createApp(App)
const ApiService = {
    init() {
        app.use(VueAxios, axios);
        app.axios.defaults.baseURL = process.env.VUE_APP_URL_API;
    },
    /**
     * Set the default HTTP request headers
     */
    setHeader() {
        app.axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${JwtService.getToken()}`;
    },

    query(resource, params) {
        this.setHeader();
        return new Promise(resolve => {
            app.axios.get(`${resource}`, {params}).then((data) => {
                this.handleResponse(data);
                if (data.data.code == 401) {
                    router.push({name: 'login'});
                }
                resolve(data);
            })
                .catch(error => {
                    throw new Error(`[KT] ApiService ${error}`);
                });
        });
    },

    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
    get(resource, slug = "") {
        this.setHeader();
        return new Promise(resolve => {
            app.axios.get(`${resource}/${slug}`).then((data) => {
                this.handleResponse(data);
                if (data.data.code == 401) {
                    router.push({name: 'login'});
                }
                resolve(data);
            }).catch(error => {
                JwtService.destroyToken()
                router.push({name:'login'});
                throw new Error(`[KT] ApiService ${error}`);
            });
        });
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */
    post(resource, params) {
        this.setHeader();
        return new Promise((resolve, reject) => {
            app.axios.post(`${resource}`, params).then((data) => {
                this.handleResponse(data);
                resolve(data);
            }).catch(error => {
                reject(error)
                // throw new Error(`[KT] ApiService ${error}`);
            });
        });
    },

    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    update(resource, slug, params) {
        this.setHeader();
        return new Promise((resolve, reject) => {
            app.axios.put(`${resource}/${slug}`, params).then((data) => {
                this.handleResponse(data);
                resolve(data);
            }).catch(error => {
                reject(error)
                throw new Error(`[KT] ApiService ${error}`);
            });
        });
    },
    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    update1(resource, params) {
        this.setHeader();
        return new Promise(resolve => {
            app.axios.put(`${resource}`, params).then((data) => {
                this.handleResponse(data);
                resolve(data);
            }).catch(error => {
                throw new Error(`[KT] ApiService ${error}`);
            });
        });
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    put(resource, params) {
        this.setHeader();
        return new Promise((resolve, reject) => {
            app.axios.put(`${resource}`, params).then(({data}) => {
                this.handleResponse(data);
                resolve(data)
            }).catch(error => {
                reject(error)
                // throw new Error(`[KT] ApiService ${error}`);
            });
        });
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */
    delete(resource, param) {
        this.setHeader();
        return new Promise(resolve => {
            app.axios.delete(`${resource}/${param}`).then(({data}) => {
                this.handleResponse(data);
                resolve(data);
            }).catch(error => {
                throw new Error(`[RWV] ApiService ${error}`);
            });
        });
    },


    patch(resource, params) {
        this.setHeader();
        return new Promise(resolve => {
            app.axios.patch(`${resource}`, params).then(({data}) => {
                this.handleResponse(data);
                resolve(data);
            }).catch(error => {
                throw new Error(`[RWV] ApiService ${error}`);
            });
        });
    },

    handleResponse(data) {
        if (data
            && !data.status) {
            messageError(data.message)
        }
        // cần xóa token đi có 2 th là token hết hạn thì sẽ ko lỗi đấy
        if (data && data.data
            && !data.data.status && data.data.errorCode == 401) {
            JwtService.destroyToken();
            router.push({name: "login"});
        }
    }
};

export default ApiService;
