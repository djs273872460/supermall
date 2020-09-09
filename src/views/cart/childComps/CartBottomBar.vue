<template>
	<div class="bottom-bar">
		<div class="check-box">
			<check-button :isChecked="isSelectAll" 
										@click.native="selectAllClick"/>
			<span>全选</span>
		</div>
		
		<div class="total-price">
			<span>合计:{{totalPrice}}</span>
		</div>
		
		<div class="calculate">
			<span>去计算({{checkLengt}})</span>
		</div>
	</div>
</template>

<script>
	import CheckButton from './CheckButton.vue'
	
	import { mapGetters } from 'vuex'
	import { formatFloat } from 'common/utils.js'
	
	export default {
		name: 'CartBottomBar',
		components: {
			CheckButton
		},
		computed: {
			...mapGetters(['cartList']),
			totalPrice() {
				return '￥' + this.cartList.filter(item => {
					return item.checked
				}).reduce((preValue, item) => {
					// 解决JavaScript计算精度问题
					return formatFloat(preValue + item.price * item.count, 2)
					// return parseInt((preValue + item.price * item.count)*100) / 100
				}, 0)
			},
			checkLengt() {
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll() {
				if (this.cartList.length === 0) return false
				// 1.使用filter
				// return !(this.cartList.filter(item => !item.checked).length)
				// 2.使用find
				// return !this.cartList.find(item => !item.checked)
				// 3.普通遍历
				for(let item of this.cartList){
					if(!item.checked){
						return false
					}
				}
				return true
			}
		},
		methods: {
			selectAllClick() {
				if(this.isSelectAll) {
					this.cartList.forEach(item => item.checked = false)
				}else {
					this.cartList.forEach(item => item.checked = true)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.bottom-bar{
		width: 100%;
		height: 40px;
		background-color: gainsboro;
		position: relative;
		z-index: 999;
	}
	.check-box {
		width: 27vw;
		display: flex;
		justify-content: space-around;
		padding-top: 3vw;
		padding-left: 9vw;
		float: left;
	}
	.total-price {
		float: left;
		padding-top: 3vw;
		padding-left: 6vw;
	}
	.calculate {
		float: right;
		width: 26vw;
		height: 40px;
		line-height: 40px;
		background-color: orangered;
		text-align: center;
		color: #fff;
	}
</style>
