import {request} from './request.js'
// Home.vue中的网络请求
export function getHomeMultidata(){
	return request({
		url: '/home/multidata'
	})
}
export function getHomeGoods(type, page){
	return request({
		url: '/home/data',
		params: {
			type,
			page
		}
	})
}