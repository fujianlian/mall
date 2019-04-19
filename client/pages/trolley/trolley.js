// pages/trolley/trolley.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    trolleyList: [], // 购物车商品列表
    trolleyCheckMap: [], // 购物车中选中的id哈希表
    trolleyAccount: 45, // 购物车结算总价
    isTrolleyEdit: false, // 购物车是否处于编辑状态
    isTrolleyTotalCheck: true, // 购物车中商品是否全选
  },

  onTapLogin: function() {
    app.login({
      success: ({
        userInfo
      }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
        this.getList()
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
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
        this.getList()
      }
    })
  },

  /**
   * 获取购物车列表
   */
  getList() {
    let self = this
    wx.showLoading({
      title: '刷新购物车数据...',
    })
    qcloud.request({
      url: config.service.trolleyList,
      login: true,
      success: function(response) {
        wx.hideLoading()
        console.log(response)
        if (!response.data.code) {
          self.setData({
            trolleyList: response.data.data
          })
        } else {
          wx.showToast({
            title: '刷新数据失败',
          })
        }
      },
      fail: function(err) {
        wx.hideLoading()
        wx.showToast({
          title: '刷新数据失败',
        })
      }
    });
  },
})