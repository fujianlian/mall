// pages/user/user.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  },

  onTapKf() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 同步授权状态
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({
        userInfo
      }) => {
        this.setData({
          userInfo
        })
      }
    })
  },

  onTapLogin: function() {
    app.login({
      success: ({
        userInfo
      }) => {
        this.setData({
          userInfo: userInfo
        })
      }
    })
  },
})