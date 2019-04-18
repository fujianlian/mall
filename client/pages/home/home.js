// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
  }
})