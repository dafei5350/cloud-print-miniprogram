<template>
		<view>
			<my-login></my-login>
<!-- 			<view class="padding flex flex-direction">
				<button class="cu-btn bg-grey lg" @click="getUserInfo">切换打印机</button>
			</view> -->
		</view>
</template>

<script>
	export default {
			data() {
				return {
					
				}
			},
			onLoad() {

			},
			methods: {
				getUserInfo(){
					uni.showLoading({
						title: 'Loading'
					})
					uni.getUserProfile({
						desc: '请求登入',
						success(res) {
							console.log(res)
						}
					})
				}
			}
		}
	</script>
	
	<style>
	
	</style>
	