<template>
	<view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-grey lg">切换打印机</button>
			<button class="cu-btn bg-red margin-tb-sm lg">文档打印</button>
			<button class="cu-btn bg-blue margin-tb-sm lg">图片打印</button>
			<button class="cu-btn bg-yellow margin-tb-sm lg">其他打印(大文件，压缩包等)</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.$http.get('/user/login', {params: {userName: 'name', password: '123456'}}).then(res => {
			
			}).catch(err => {
				console.log("测试请求", err)
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
