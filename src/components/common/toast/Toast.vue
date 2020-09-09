<template>
	<div class="toast" v-show="isShow">
		<span>{{message}}</span>
	</div>
</template>

<script>
	export default {
		name: 'Toast',
		data() {
			return {
				message: '',
				isShow: false
			}
		},
		methods: {
			show(message, duration=2000) {
				this.isShow = true;
				this.message = message;
				setTimeout(() => {
					this.isShow = false;
					this.message = ''
				}, duration)
			}
		}
	}
</script>

<style scoped="scoped">
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px 30px;
		background-color: rgba(0,0,0,.8);
		color: #fff;
		border-radius: 10px;
		white-space: nowrap;
		z-index: 999;
	}
</style>
