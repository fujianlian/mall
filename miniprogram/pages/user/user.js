// pages/user/user.js
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    }).catch(err => {
      console.log('请先登录');
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  },

  onTapService() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  }
})