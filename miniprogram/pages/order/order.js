// pages/order/order.js

const db = require('../../utils/db.js')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    orderList: [], // 订单列表
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
      this.getOrder()
    }).catch(err => {
      console.log('尚未通过身份验证');
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  getOrder() {
    let that = this
    if (this.data.orderList.length == 0)
      wx.showLoading({
        title: '刷新订单数据...',
      })
    db.getOrderList().then(result => {
      wx.hideLoading()
      that.setData({
        orderList: result.result
      })
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        title: '刷新订单数据失败',
      })
    })
  },

  goComment(event) {
    let product = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/add-comment/add-comment?data=' + JSON.stringify(product),
    })
  }

})