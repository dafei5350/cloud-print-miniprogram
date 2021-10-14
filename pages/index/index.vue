<template>
	<view>
		<view class="padding flex flex-direction">
			<!-- <button class="cu-btn bg-grey lg">切换打印机</button> -->
			<button class="cu-btn bg-red margin-tb-sm lg" @click="fromChat">聊天文件</button>
			<button class="cu-btn bg-blue margin-tb-sm lg">本地文件</button>
			<button class="cu-btn bg-yellow margin-tb-sm lg">其他打印(大文件，压缩包等)</button>
			<button class="cu-btn bg-pink margin-tb-sm lg">打印历史</button>
		</view>
		<test-a></test-a>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flieList: []
			}
		},
		onLoad() {
			// this.$http.get('/user/wxapp/authorize', {params: {userName: 'name', password: '123456'}}).then(res => {
			
			// }).catch(err => {
			// 	console.log("测试请求", err)
			// })
		},
		methods: {
			/**
			 * 从聊天窗口获取文件
			 */
			fromChat(){
				let that = this
				wx.chooseMessageFile({
					count: 10,
					type: 'all',
					success(res) {
						console.log('文件临时地址', res)
						that.toUpdateFile(res)
					}
				})
			},
			
			
			toUpdateFile(res){
				let fileList = encodeURIComponent(JSON.stringify(res.tempFiles))
				uni.navigateTo({
					url:`/pages/update-file/update-file?fileList=${fileList}`
				})
			}
		}
	}
</script>

<style>

</style>
