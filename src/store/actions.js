import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types.js'

export default {
	addCart(context, payload) {
		return new Promise((resolve, reject) => {
			let oldProduct = null;
			// 1.循环比较是否是相同的商品
			for(let item of context.state.cartList){
				if(item.iid === payload.iid){
					oldProduct = item;
				}
			}
			// 2.oldProduct不为null说明cartList已有该商品,
			if(oldProduct){
				context.commit(ADD_COUNTER, oldProduct);
				resolve('当前的商品数量+1')
			}else{
				payload.count = 1;
				context.commit(ADD_TO_CART, payload);
				resolve('添加了新的商品')
			}
		})
	}
}