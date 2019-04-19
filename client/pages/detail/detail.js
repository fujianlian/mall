// pages/detail/detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    // 缓存获取详情
    let productList = (wx.getStorageSync('productList') || [])
    this.setData({
      product: productList[id - 1]
    })
    // api获取详情
    // this.getProduct(id)
  },

  /**
   * api获取详情
   */
  getProduct(id) {
    let self = this
    wx.showLoading({
      title: '正在加载中...',
    })
    qcloud.request({
      url: config.service.productDetail + id,
      success: function(response) {
        wx.hideLoading()
        if (!response.data.code) {
          self.setData({
            product: response.data.data
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

  buy() {
    wx.showLoading({
      title: '商品购买中...',
    })

    let product = Object.assign({
      count: 1
    }, this.data.product)

    qcloud.request({
      url: config.service.addOrder,
      login: true,
      method: 'POST',
      data: {
        list: [product]
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '商品购买成功',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '商品购买失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '商品购买失败',
        })
      }
    })
  },

  addToTrolley(event) {
    let productId = event.currentTarget.dataset.id
    app.addToTrolley(this.data.product.id)
  },
})