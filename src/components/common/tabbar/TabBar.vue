<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'TabBar'
	}
</script>

<style>
	#tab-bar{
		display: flex;
		background-color: #F2F2F2;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		box-shadow: 0 0 1.5px rgba(0,0,0,.4);
		z-index: 9;
	}
</style>
