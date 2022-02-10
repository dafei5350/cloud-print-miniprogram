<template>
	<view>
		<cu-custom bgColor="#54b1ff">
			<block slot="left">云打印</block>
		</cu-custom>
		<view class="bg-head"></view>	

		<view class="padding">
			<swiper class="screen-swiper round-dot swiper-radius" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image class="swiper-radius" :src="item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		

		
		<template>
			<view class="default-print">
				<image class="img margin-bottom" src="../../static/print.png" mode="aspectFill"></image>
				<view class="text-center text-gray">你还没有添加设备哦</view>
				<button class="cu-btn bg-blue margin-tb-sm lg round">
					<text class="cuIcon-scan lg text-white margin-right"></text>
					扫码添加</button>
			</view>
		</template>

	<!--<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @click="fromChat">聊天文件</button>
			<button class="cu-btn bg-blue margin-tb-sm lg">本地文件</button>
			<button class="cu-btn bg-yellow margin-tb-sm lg">其他打印(大文件，压缩包等)</button>
			<button class="cu-btn bg-pink margin-tb-sm lg">打印历史</button>
			<test-a> </test-a> 
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [
					{
						id: 0,
						type: 'image',
						url: '../../static/test.jpg'
					},{
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					}
				],
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

<style scoped>
	.bg-head{
		width: 100%;
		height: 600upx;
		background-image: linear-gradient(180deg, #54b1ff , #ffffff 99%);
		position: absolute;
		top: 0;
		z-index: -1;
	}
	.swiper-radius{
		border-radius: 20upx;
	}
	.default-print{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 120upx;
	}
	.default-print .img{
		width: 600upx;
		height: 300upx;
	}
</style>
