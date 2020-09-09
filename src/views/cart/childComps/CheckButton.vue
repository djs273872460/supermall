<template>
	<div class="check-button" :class="{checked: isChecked}">
		<img src="~assets/imgs/cart/tick.svg" alt="">
	</div>
</template>

<script>
	export default {
		name: 'CheckButton',
		props: {
			isChecked: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped="scoped">
	.check-button {
		width: 5vw;
		height: 5vw;
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	.checked {
		background-color: orangered;
		border-color: orangered;
	}
</style>
