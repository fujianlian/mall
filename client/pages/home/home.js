// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品列表
    productList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },

  /**
   * 获取商品列表
   */
  getList() {
    let self = this
    wx.showLoading({
      title: '正在加载中...',
    })
    qcloud.request({
      url: config.service.productList,
      success: function(response) {
        wx.hideLoading()
        if (!response.data.code) {
          wx.setStorageSync('productList', response.data.data)
          self.setData({
            productList: response.data.data
          })
        } else {
          wx.showToast({
            title: '加载数据失败',
          })
        }
      },
      fail: function(err) {
        wx.hideLoading()
        wx.showToast({
          title: '加载数据失败',
        })
      }
    });
  },

  addToTrolley(event) {
    let productId = event.currentTarget.dataset.id
    app.addToTrolley(productId)
  },
})