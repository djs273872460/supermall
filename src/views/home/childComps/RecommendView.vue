<template>
	<div class="recommend">
		<div v-for="item in recommends" class="recommend-item">
			<a :href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RecommendView',
		props: {
			recommends: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.recommend{
		display: flex;
		text-align: center;
		padding: 10px 0 15px;
		border-bottom: 8px solid #F2F2F2;
	}
	.recommend-item{
		flex: 1;
		font-size: 12px;
	}
	.recommend-item img{
		width: 68px;
		height: 68px;
		margin-bottom: 5px;
	}
</style>
