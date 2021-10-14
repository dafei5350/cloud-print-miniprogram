<template>
  <view class="my-container">
    <!-- 用户未登录 -->
    <block v-if="!token">
      <image class="avatar avatar-img" src="/static/images/default-avatar.png" mode="scaleToFill" />
      <view class="login-desc">登录后可同步数据</view>
      <!-- #ifdef MP-WEIXIN -->
      <button class="login-btn" type="primary" @click="getUserInfo">微信用户一键登录</button>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <button class="login-btn" type="primary" @click="onAutoLogin">一键登录</button>
      <!-- #endif -->
    </block>
    <!-- 已登录 -->
    <block v-else>
      <image class="avatar avatar-img" :src="userInfo.avatarUrl" mode="scaleToFill" />
      <view class="login-desc">{{ userInfo.nickName }}</view>
      <button class="login-btn" type="default" @click="onLogoutClick">退出登录</button>
    </block>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'my-login',
  data() {
    return {};
  },
  computed: {
    ...mapState('user', ['token', 'userInfo'])
  },
  methods: {
    ...mapActions('user', ['login', 'logout']),
    /**
     * 获取用户信息
     */
    getUserInfo() {
      // 展示加载框
      uni.showLoading({
        title: '加载中'
      });
      uni.getUserProfile({
        desc: '登录后可同步数据',
        success: async (obj) => {
					console.log("aaa", obj);
          // 调用 action ，请求登录接口
          await this.login(obj);
          // 登录成功之后，发送事件
          this.$emit('onLoginSuccess');
        },
        fail: () => {
          uni.showToast({
            title: '授权已取消',
            icon: 'error',
            mask: true
          });
        },
        complete: () => {
          // 隐藏loading
          uni.hideLoading();
        }
      });
    },
    /**
     * 一键登录
     */
    async onAutoLogin() {
      // 展示加载框
      uni.showLoading({
        title: '加载中'
      });
      await this.login({
        encryptedData: 'BmGEMqpGI5w',
        errMsg: 'getUserProfile:ok',
        iv: 'c+NbINO4CuEWCBYGG2FxWw==',
        rawData:
          `{
						"nickName":"小慕同学",
						"gender":1,
						"language":"zh_CN",
						"city":"",
						"province":"",
						"country":"China",
						"avatarUrl":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png",
						}`,
        signature: '449a10f11998daf680fe546a5176e6e2973516ce',
        userInfo: { nickName: '小慕同学', gender: 1, language: 'zh_CN', city: '', province: '' }
      });
      this.$emit('onLoginSuccess');
      // 隐藏loading
      uni.hideLoading();
    },
    /**
     * 退出登录
     */
    onLogoutClick() {
      uni.showModal({
        title: '提示',
        content: '退出登录将无法同步数据哦~',
        success: ({ confirm, cancel }) => {
          if (confirm) {
            this.logout();
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25%;
  .avatar-img {
    width: 78px;
    height: 78px;
  }
  .login-desc {
    color: red;
    font-size: 35rpx;
    margin-top: 100rpx;
  }
  .login-btn {
    margin-top: 100rpx;
    width: 85%;
  }
}
</style>
