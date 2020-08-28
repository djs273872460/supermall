<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['流行', '新款', '精选']"
								 @tabClick="tabClick"
								 ref="tabControl1"
								 :class="{showTabControl: isShowTabControl,dispalyNone: isdispalyNone}"/>
		<scroll class="wrapper" 
						ref="scroll" 
						:probe-type="3" 
						@scroll="wrapperScroll"
						:pull-up-load="true"
						@pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
			<recommend-view :recommends="recommends" />
			<feature-view />
			<tab-control :titles="['流行', '新款', '精选']" 
									 @tabClick="tabClick"
									 ref="tabControl2" />
			<goods-list :goods="this.goods[currentType].list"/>
		</scroll>
		<back-top @click.native = "backClick" v-show="isShowBackTop" />
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'
	
	import NavBar from 'components/common/navbar/NavBar.vue'
	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	import {getHomeMultidata, getHomeGoods} from 'network/home.js'
	import {debounce} from 'common/utils.js'
	import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
	
	export default {
		name: 'Home',
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0, list: []},
					'new': {page: 0, list: []},
					'sell': {page: 0, list: []},
				},
				currentType: 'pop',
				isShowBackTop: false,
				tabOffsetTop: 0,
				isShowTabControl: false,
				isdispalyNone: true,
				saveY: 0,
			}
		},
		created() {
			// 1.请求多个数据
			this.getHomeMultidata();
			
			// 2.请求商品数据
			this.getHomeGoods('pop');
			this.getHomeGoods('new');
			this.getHomeGoods('sell');
		},
		mounted() {
		},
		activated() {
			this.$refs.scroll.refresh();
			this.$refs.scroll.scrollTo(0, this.saveY, 0);
		},
		deactivated() {
			// 1.保存离开时的y值
			this.saveY = this.$refs.scroll.getScrollY()
			// 2.取消全局事件的监听
			this.$bus.$off('itemImageLoad', this.itemImgListener)
		},
		methods: {
			// 事件监听相关的方法
			// tabcontrol点击事件
			tabClick(index) {
				switch (index) {
					case 0:
						this.currentType = 'pop';
						break
					case 1:
						this.currentType = 'new';
						break
					case 2:
						this.currentType = 'sell';
						break
				}
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			backClick(){
				this.$refs.scroll.scrollTo(0,0,500)
			},
			// 监听滚动
			wrapperScroll(position){
				// 决定tabControl是否吸顶
				this.isShowTabControl = (-position.y) > this.tabOffsetTop
				// 决定tabControl是否显示
				this.isdispalyNone = !((-position.y) > this.tabOffsetTop)
				// 决定backTop是否显示
				this.listenShowBackTop(position);		 // backTopMixin对象中的函数,
			},
			loadMore() {
				this.getHomeGoods(this.currentType)
			},
			swiperImageLoad() {
			  this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
			},
			// 网络请求相关的方法
			// 请求banner,recommends数据
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				})
			},
			// 请求商品数据
			getHomeGoods(type) {
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					// arr1.push(...arr2) 将arr2解构依次push到arr1中
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page += 1;
					// pullingUp只会监听一次,如果还需要监听,需要finishPullUp()
					this.$refs.scroll.finishPullUp();
				})
			}
		}
	}
</script>

<style scoped>
	#home{
		height: 100vh;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		letter-spacing: 2px;
	}
	.wrapper{
		height: calc(100% - 45px);
		position: absolute;
		top: 44px;
		overflow: hidden;
	}
	.showTabControl{
		position: relative;
	}
	.dispalyNone{
		display: none;
	}
</style>
