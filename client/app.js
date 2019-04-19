//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

let userInfo

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

App({

  data: {
    locationAuthType: UNPROMPTED
  },

  onLaunch: function() {
    qcloud.setLoginUrl(config.service.loginUrl)
  },

  login({
    success,
    error
  }) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {
          this.data.locationAuthType = UNAUTHORIZED
          // 已拒绝授权
          wx.showModal({
            title: '提示',
            content: '请授权我们获取您的用户信息',
            showCancel: false
          })
        } else {
          this.data.locationAuthType = AUTHORIZED
          this.doQcloudLogin({
            success,
            error
          })
        }
      }
    })
  },

  doQcloudLogin({
    success,
    error
  }) {
    // 调用 qcloud 登陆接口
    qcloud.login({
      success: result => {
        if (result) {
          let userInfo = result
          success && success({
            userInfo
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          this.getUserInfo({
            success,
            error
          })
        }
      },
      fail: () => {
        error && error()
        console.log(error)
      }
    })
  },

  checkSession({
    success,
    error
  }) {
    wx.checkSession({
      success: () => {
        this.getUserInfo({
          success,
          error
        })
      },
      fail: () => {
        error && error()
      }
    })
  },

  getUserInfo({
    success,
    error
  }) {
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success: result => {
        let data = result.data
        if (!data.code) {
          let userInfo = data.data
          success && success({
            userInfo
          })
        } else {
          error && error()
        }
      },
      fail: () => {
        error && error()
      }
    })
  },

  /**
   * 添加商品至购物车
   */
  addToTrolley(productId) {
    wx.showLoading({
      title: '正在添加到购物车...',
    })
    qcloud.request({
      url: config.service.addTrolley,
      login: true,
      method: 'PUT',
      data: {
        id: productId
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '已添加到购物车',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '添加到购物车失败',
          })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '添加到购物车失败',
        })
      }
    })
  },
})