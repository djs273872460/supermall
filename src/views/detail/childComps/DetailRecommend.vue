<template>
	<div class="goods">
		<goods-item v-for="item in goods" :goods-item="item"></goods-item>
		<p class="load-more">上拉加载更多···</p>
	</div>
</template>

<script>
	export default {
		name: 'DetailRecommend'
	}
</script>

<style>
</style>
