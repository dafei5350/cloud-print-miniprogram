import request from '../utils/request.js'

/**
 * 用户登入
 */
export function login(data) {
	console.log(data)
	return request({
		url: '/user/wxapp/login',
		method: 'POST',
		data
	})
}


/**
 * 
 */