// pages/home/home.js

const db = require('../../utils/db.js')
const util = require('../../utils/util.js')

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

    db.getProductList().then(result => {
      wx.hideLoading()

      const productList = result.data
      // get 2 digits price
      productList.forEach(product => product.price = util.formatPrice(product.price))

      if (productList.length) {
        this.setData({
          productList
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
      })
      Ï
    })
  },

  addToTrolley(event) {
    //let productId = event.currentTarget.dataset.id
    //app.addToTrolley(productId)
  },
})