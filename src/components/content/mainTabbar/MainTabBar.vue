<template>
	<tab-bar>		<!-- 这个就是组件TabBar,大写形式可以转换为- -->
		<tab-bar-item path="/home" activeColor="blue">
			<img slot="item-icon" src="~assets/imgs/tabbar/shouye.png" alt="">
			<img slot="item-icon-active" src="~assets/imgs/tabbar/shouye-active.png" alt="">
			<p slot="item-text">首页</p>
		</tab-bar-item>
		<tab-bar-item  path="/category" activeColor="blue">
			<img slot="item-icon" src="~assets/imgs/tabbar/fenlei.png" alt="">
			<img slot="item-icon-active" src="~assets/imgs/tabbar/fenlei-active.png" alt="">
			<p slot="item-text">分类</p>
		</tab-bar-item>
		<tab-bar-item path="/cart" activeColor="blue">
			<img slot="item-icon" src="~assets/imgs/tabbar/gouwuche.png" alt="">
			<img slot="item-icon-active" src="~assets/imgs/tabbar/gouwuche-active.png" alt="">
			<p slot="item-text">购物车</p>
		</tab-bar-item>
		<tab-bar-item path="/profile" activeColor="blue">
			<img slot="item-icon" src="~assets/imgs/tabbar/gerenzhongxin.png" alt="">
			<img slot="item-icon-active" src="~assets/imgs/tabbar/gerenzhongxin-active.png" alt="">
			<p slot="item-text">我的</p>
		</tab-bar-item>
	</tab-bar>
</template>

<script>
	import TabBar from 'components/common/tabbar/TabBar.vue'
	import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
	
	export default {
		name: 'MainTabBar',
		components:{
			TabBar,
			TabBarItem
		}
	}
</script>

<style>
</style>
