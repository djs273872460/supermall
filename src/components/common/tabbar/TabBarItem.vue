<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<div :class="{active: isActive}"><slot name="item-text"></slot></div>
		<!-- 根据传进来的activeStyle值设置字体颜色 -->
		<!-- <div :style="activeStyle"><slot name="item-text"></slot></div> -->
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		props: {
			path: String,
			activeColor: {
				type: String,
				default: 'red'
			}
		},
		computed: {
			isActive() {
				// 判断当前活跃的路由path是否包含通过props传进来的path值,
				// 包含:说明当前tab-bar-item与相应的路由对应,返回true
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle() {
				// 判断isActive动态设置字体为通过props传进来的ActiveColor值
				return this.isActive ? {color: this.activeColor} : {}
			}
		},
		methods:{
			itemClick(){
				// 解决多次点击相同按钮报错的问题,
				// 点击后判断传进来的path值与当前活跃路由的path值是否相同,再去跳转
				if(this.path != this.$route.path){
					this.$router.replace(this.path)
				}
			}
		}
	}
</script>

<style>
	.tab-bar-item{
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	.tab-bar-item img{
		width: 24px;
		height: 24px;
		margin-top: 3px;
		margin-bottom: 2px;
		vertical-align: middle;
	}
	.tab-bar-item p{
		letter-spacing: 2px;
	}
	.active{
		color: red;
	}
</style>
