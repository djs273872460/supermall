<template>
	<div class="bottom-bar">
		<div class="bottom_left">
		  <div class="service">
		    <i class="icon"></i>
		    <span>客服</span>
		  </div>
		  <div class="shop">
		    <i class="icon"></i>
		    <span>店铺</span>
		  </div>
		  <div class="collect">
		    <i class="icon"></i>
		    <span>收藏</span>
		  </div>
		</div>
		<div class="bottom_right">
		  <div class="cart" @click="addToCart">
		    加入购物车
		  </div>
		  <div class="buy">
		    购买
		  </div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailBottomBar',
		methods: {
			addToCart() {
				this.$emit('addCart')
			}
		}
	}
</script>

<style scoped="scoped">
	.bottom-bar {
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 49px;
		z-index: 99;
		display: flex;
		text-align: center;
		/* border-top: 1px solid rgba(128, 128, 128, 0.2); */
		background-color: #fff;
	}
	.bottom_left {
		background-color: #fff;
	  display: flex;
	  flex: 1;
	}
	.bottom_left > div {
	  flex: 1;
	  border-right: 1px solid rgba(128, 128, 128, 0.2);
	}
	.bottom_left .icon {
	  display: block;
	  background-image: url("~assets/imgs/detail/detail_bottom.png");
		background-size: 100%;
	  width: 24px;
	  height: 24px;
	  margin: 3px auto;
	}
	.service .icon {
	  background-position: 0 -56px;
	}
	.shop .icon {
	  background-position: 0 -105px;
	}
	.bottom_right {
	  display: flex;
	  flex: 1;
	}
	.bottom_right > div {
	  flex: 1;
	  line-height: 49px;
	}
	.cart {
	  background-color: rgb(255, 174, 0);
	}
	.buy {
	  background-color: var(--color-tint);
	  color: white;
	}
</style>
