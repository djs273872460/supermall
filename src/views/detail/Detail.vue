<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav-bar" @titleClick="titleClick"
										ref="detailNavBar"></detail-nav-bar>
		<scroll class="wrapper" ref="scroll" :probe-type="3" @scroll="detailScroll">
			<div>{{$store.state.cartList.length}}</div>
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo"
												 @imageLoad="imageLoad"
												 class="detail-goods-info"></detail-goods-info>
			<detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
			<detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
			<goods-list :goods="recommends" ref="recommend"></goods-list>
		</scroll>
		<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
		<back-top @click.native = "backClick" v-show="isShowBackTop" />
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	
	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
	import {debounce} from 'common/utils.js'
	import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
	
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			Scroll,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				iid: '',
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: []
			}
		},
		created() {
			// 1.保存传入的iid
			this.iid = this.$route.params.id
			// 2.根据iid请求商品详情数据
			getDetail(this.iid).then(res => {
				const data = res.result;
				// 1.获取商品详情轮播图数据
				this.topImages = data.itemInfo.topImages;
				// 2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
				// 3.获取店铺信息
				this.shop = new Shop(data.shopInfo);
				// 4.获取商品的介绍详情数据
				this.detailInfo = data.detailInfo;
				// 5.获取商品参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				// 6.获取商品评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
				// this.$nextTick(() => {})等到元素渲染完之后调用该函数,但是图片可能还未加载
				// this.$nextTick(() => {
				// })
			})
			// 3.请求推荐数据,接口为recommend
			getRecommend().then(res => {
				this.recommends = res.data.list;
			})
		},
		mounted() {
			
		},
		destroyed() {
			this.$bus.$off('itemImageLoad', this.itemImgListener)
		},
		methods: {
			// 因为在DetailGoodsInfo组件做了判断,只有所有图片加载完成才会发出imageLoad事件
			// 所以在这里imageLoad()只会执行一次,无须进行防抖
			imageLoad() {
				this.$refs.scroll.refresh();
				this.themeTopYs = [];
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
				// console.log(this.themeTopYs);
			},
			titleClick(index) {
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500) 
			},
			detailScroll(position) {
				const positionY = -position.y;
				if(positionY >=0 && positionY <this.themeTopYs[1]){
					this.$refs.detailNavBar.currentIndex = 0;
				}else if(positionY >=this.themeTopYs[1] && positionY <this.themeTopYs[2]){
					this.$refs.detailNavBar.currentIndex = 1;
				}else if(positionY >=this.themeTopYs[2] && positionY <this.themeTopYs[3]){
					this.$refs.detailNavBar.currentIndex = 2;
				}else if(positionY >=this.themeTopYs[3]){
					this.$refs.detailNavBar.currentIndex = 3;
				}
				// 决定backTop是否显示
				this.listenShowBackTop(position);		 // backTopMixin对象中的函数,
			},
			addToCart() {
				// 1.获取购物车需要展示的信息
				const product = {};
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;
				
				// 2.将商品添加到购物车
				this.$store.commit('addCart', product)
			}
		}
	}
</script>

<style scoped="scoped">
	#detail {
		position: relative;
		z-index: 99;
		background-color: #fff;
		height: 100vh;
	}
	.detail-nav-bar{
		position: relative;
		z-index: 99;
		background-color: #fff; 
	}
	.wrapper{
		height: calc(100% - 44px);
	}
	.detail-goods-info{
		position: relative;
		top: 0;
	}
</style>
