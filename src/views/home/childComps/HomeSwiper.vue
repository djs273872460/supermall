<template>
	<swiper>
		<swiper-item v-for="item in banners">
			<a :href="item.link">
				<img :src="item.image" @load="imageLoad">
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper, SwiperItem} from 'components/common/swiper/index.js' 
	export default {
		name: 'HomeSwiper',
		props:{
			banners: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				loadFlag: true
			}
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			imageLoad() {
				if(this.loadFlag){
					this.$emit('swiperImageLoad');
					this.loadFlag = false
				}
			}
		}
	}
</script>

<style>
</style>
