import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
	state: {
		cartList: []
	},
	mutations: {
		addCart(state, payLoad) {
			for(let item of state.cartList){
				if(item.iid === payLoad.iid){
					
				}else {
					
				}
			}
			state.cartList.push(payLoad)
		}
	}
})

// 3.挂载Vue实例上
export default store