<template>
	<scroll class="cart-list" ref="scroll">
		<cart-list-item v-for="(item, index) in cartList" 
										:key="index"
										:item-info="item">
		</cart-list-item>
	</scroll>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll.vue'
	import CartListItem from './CartListItem.vue'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'CartList',
		components: {
			Scroll,
			CartListItem
		},
		computed: {
			...mapGetters(['cartList'])
		},
	}
</script>

<style scoped="scoped">
	.cart-list {
		height: calc(100% - 133px);
		overflow: hidden;
	}
</style>
