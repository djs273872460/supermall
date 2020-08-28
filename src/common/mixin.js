import {debounce} from './utils.js'

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null
		}
	},
	mounted() {
		// 对this.$refs.scroll.refresh这个函数进行防抖操作,
		// 因为该函数执行太过频繁,加载一张图片便会执行一次refresh()函数
		let newRefresh = debounce(this.$refs.scroll.refresh, 50);
		this.itemImgListener = function(){
			newRefresh()
		};
		this.$bus.$on('itemImageLoad', this.itemImgListener)
	}
}

// 生命周期函数内的函数可以进行抽离,混入的时候会将其合并
// methods内的函数不能抽离,混入的时候会覆盖
import BackTop from 'components/content/backTop/BackTop.vue'
export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false,
		}
	},
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0,0,500)
		},
		listenShowBackTop(position) {
		this.isShowBackTop = -position.y > 800	
		}
	}
}