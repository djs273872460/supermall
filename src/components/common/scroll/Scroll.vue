<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default {
		name: 'Scroll',
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			// 创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,	//默认false,bscroll会阻止原生点击事件,true为允许点击
				probeType: this.probeType,		//probeType:3 实时监听
				pullUpLoad: {
					pullUpLoad: this.pullUpLoad,
					threshold: -100
				}
			})
			// 监听滚动位置
			if(this.probeType ==3 ) {
				this.scroll.on('scroll', (position) => {
					this.$emit('scroll', position)
				})
			}
			// 监听scroll滚动到底部
			if(this.pullUpLoad) {
				this.scroll.on('pullingUp', () => {
					this.$emit('pullingUp')
				})
			}
		},
		methods:{
			scrollTo(x, y, time=300) {
				//this.scroll 先判断scroll是否存在
				this.scroll && this.scroll.scrollTo(x, y, time)	
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			finishPullUp() {
				this.scroll && this.scroll.finishPullUp()
			},
			getScrollY() {
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style scoped>
</style>
