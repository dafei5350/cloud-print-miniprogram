import { login } from '../../api/user.js';
const STORAGE_KEY = 'user-info';
const TOKEN_KEY = 'token';
export default {
  namespaced: true,
  state: () => {
    return {
      // 用户 token
      token: uni.getStorageSync(TOKEN_KEY) || '',
      // 用户信息
      userInfo: uni.getStorageSync(STORAGE_KEY) || {}
    };
  },
  mutations: {
    /**
     * 保存 token 到 vuex
     */
    setToken(state, token) {
      state.token = token;
      this.commit('user/saveToken');
    },
    /**
     * 保存 token 到 本地存储
     */
    saveToken(state) {
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token
      });
    },
    /**
     * 删除 token
     */
    removeToken(state) {
      state.token = '';
      this.commit('user/saveToken');
    },
    /**
     * 保存 用户信息 到 vuex
     */
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit('user/saveUserInfo');
    },
    /**
     * 保存 用户信息 到 本地存储
     */
    saveUserInfo(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userInfo
      });
    },
    /**
     * 删除用户信息
     */
    removeUserInfo(state) {
      state.userInfo = {};
      this.commit('user/saveUserInfo');
    }
  },
  actions: {
    /**
     * 完成登录
     */
    async login(context, userProfile) {
      // 用户数据
      const rawData = JSON.parse(userProfile.rawData);
      const { data: res } = await login({
        signature: userProfile.signature,
        iv: userProfile.iv,
        nickName: rawData.nickName,
        gender: rawData.gender,
        city: rawData.city,
        province: rawData.province,
        avatarUrl: rawData.avatarUrl
      });
      // 登录逻辑
      this.commit('user/setToken', res.token);
      this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
    },
    /**
     * 退出登录
     */
    logout(context) {
      this.commit('user/removeToken');
      this.commit('user/removeUserInfo');
    },
    /**
     * 进行登录判定
     */
    async isLogin(context) {
      if (context.state.token) return true;
      // 如果用户未登录，则引导用户进入登录页面
      const [error, res] = await uni.showModal({
        title: '登录之后才可以进行后续操作',
        content: '立即跳转到登录页面？（登录后回自动返回当前页面哦~~~）'
      });
      const { cancel, confirm } = res;
      if (confirm) {
        uni.navigateTo({
          url: '/subpkg/pages/login-page/login-page'
        });
      }
      return false;
    }
  }
};
