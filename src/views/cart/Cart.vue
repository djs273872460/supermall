<template>
	<div class="cart">
		<nav-bar class="nav-bar">		<!-- 导航 -->
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		<cart-list />
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/CartBottomBar.vue'
	
	// mapGetters 辅助函数仅仅是将store中的 getter 映射到局部(组件)计算属性
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'Cart',
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			// 1.第一种用法,直接导入getters内cartLength,该组件就可直接使用cartLength计算属性
			...mapGetters(['cartLength'])
			// 2.第二种用法,导入的同时重新为其命名,组件使用length计算属性
			// ...mapGetters({
			// 	length: 'cartLength'
			// })
		}
	}
</script>

<style scoped="scoped">
	.cart{
		height: 100vh;
	}
	.nav-bar{
		background-color: var(--color-tint);
		color: #fff;
		letter-spacing: 2px;
	}
</style>
