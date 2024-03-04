
import {createStore} from 'vuex'
import step from './step'
import restaurants from './restaurants'
import dishes from './dishes'
import order from './order'

export default createStore({
    modules:{
        step,
        restaurants,
        dishes,
        order,
    }
})
