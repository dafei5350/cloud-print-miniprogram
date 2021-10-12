/**
 * 默认的全局配置
 */


export default {
  baseURL: 'https://xinweiliang.admin.it120.cc/xinweiliang',
  header: {},
  method: 'GET',
  dataType: 'json',
  // #ifndef MP-ALIPAY
  responseType: 'text',
  // #endif
  custom: {},
  // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
  timeout: 60000,
  // #endif
  // #ifdef APP-PLUS
  sslVerify: true,
  // #endif
  // #ifdef H5
  withCredentials: false,
  // #endif
  // #ifdef APP-PLUS
  firstIpv4: false,
  // #endif
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300
  }
}
