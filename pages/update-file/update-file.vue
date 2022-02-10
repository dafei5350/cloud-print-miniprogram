<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">文件配置</block>
		</cu-custom>
		<view class="container">
			<view class="flex flex-direction align-center" v-for="(item, index) in fileList" :key="index">
				<view class="print-file">
					<text class="lg text-gray cuIcon-close position-close" @click="delFile" :id="index"></text>
					<view class="describe">
						<image class="file-img" :src="item.tempImgType" mode=""></image>
						<view class="content">
							<view class="text-black text-xl text-cut text-bold" style="width: 500rpx;">{{ item.name }}</view>
							<view class="text-gray">{{item.printSize}}/{{item.printColor?'彩色':'黑白'}}/{{item.direction?'纵向':'横向'}}/{{item.printNum}}份</view>
						</view>
					</view>
					<view class="flex">
						<view class="flex-sub text-center bg-blue justify-center padding-sm margin-xs radius">查看</view>
						<view class="flex-sub text-center bg-green justify-center padding-sm margin-xs radius">编辑</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop shadow foot">
			<view :class="[fileList.length < 10?'bg-green submit':'bg-red submit']" @click="fileList.length < 10?'addFile':''">
				<text class="lg text-blue" :class="cuIcon-add"></text>继续添加（{{fileList.length}}/10）
			</view>
			<view class="bg-blue submit">立即打印</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				fileList: []
			}
		},
		onLoad(option) {
			let that = this
			let tempFileList = JSON.parse(decodeURIComponent(option.fileList))
			console.log(tempFileList)
			that.formatFile(tempFileList)
			
		},
		methods:{
			/**
			 * 文件列表格式化
			 * 添加默认打印数量 默认为1
			 * 纸张大小 A4 A3
			 * 颜色 false为黑白 true为彩色
			 * 打印方向 false为横向 true为纵向
			 * 文件类型 
			 */
			formatFile(tempFileList){
				let that = this
				let format = tempFileList
				format.forEach((item, index) =>{
					item.printNum = 1,
					item.printColor = true,
					item.direction = true,
					item.printSize = 'A4'
					item.fileType = item.name.substring(item.name.lastIndexOf('.') + 1),
					item.randomNmae = that.uuid() + '.' + item.fileType,
					item.tempImgType = that.onImgType(item.fileType)
				})
				that.fileList = that.fileList.concat(format)
			},
			uuid(){
				return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},
			addFile(){
				let that = this
				let fileNum = this.fileList.length
				if (fileNum <= 10){
					wx.chooseMessageFile({
						count: 10 - fileNum,
						type: 'all',
						success(res) {
							console.log('添加文件', res)
							that.formatFile(res.tempFiles)
						}
					})
				}
			},
			delFile(event){
				let that = this
				let id = event.target.id
				uni.showModal({
					title: '删除提示',
					content: '您即将进行删除操作，确认删除本张图片吗？',
					success: function (res) {
						if (res.confirm) {
							that.fileList.splice(id, 1)
						} 
					}
				});
			},
			onImgType(fileType){
				console.log(fileType)
				let excel = ['xls', 'xlsx', 'csv', 'xlsb']
				let word = ['doc', 'docx']
				let ppt = ['ppt', 'pptx', 'pps', 'pot']
				let img = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg']
				let document = ['txt']
				let pdf = ['pdf']
				if (pdf.includes(fileType)){
					return '../../static/file-img/pdf.png'
				}	else if (word.includes(fileType)) {
					return '../../static/file-img/word.png'
				} else if (img.includes(fileType)) {
					return '../../static/file-img/img.png'
				} else if (ppt.includes(fileType)) {
					return '../../static/file-img/ppt.png'
				} else if (excel.includes(fileType)) {
					return '../../static/file-img/excel.png'
				} else if (document.includes(fileType)) {
					return '../../static/file-img/document.png'
				} else {
					return '../../static/file-img/unknown.png'
				}
			}
		}
	}
</script>

<style scoped>
	.container{
		margin-bottom: 200rpx;
	}
	.print-file{
		width: 95%;
		height: auto;
		background-color: #ffffff;
		border-radius: 15rpx;
		margin-top: 15rpx;
		padding: 15rpx;
		position: relative;
	}
	.print-file .position-close{
		position: absolute;
		top: 15rpx;
		right: 15rpx;
	}
	.print-file .describe{
		display: flex;
		flex-direction: row;
		margin:10rpx 10rpx 0 10rpx;
	}
	.print-file .describe .file-img{
		width: 80rpx;
		height: 90rpx;
	}
	.print-file .describe .content{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 15rpx;
	}
</style>
