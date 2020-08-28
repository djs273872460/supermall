<template>
	<div class="goods">
		<goods-item v-for="item in goods" :goods-item="item"></goods-item>
		<p class="load-more">上拉加载更多···</p>
	</div>
</template>

<script>
	import GoodsItem from './GoodsItem.vue'
	
	export default {
		name: 'GoodsList',
		components: {
			GoodsItem
		},
		props: {
			goods: {
				type: Array,
				default() {
					return []
				}
			}
		},
	}
</script>

<style>
	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 3px;
	}
	.load-more {
		text-align: center;
		padding-top: 5px;
		height: 75px;
	}
	.dispalyNone {
		display: none;
	}
</style>
