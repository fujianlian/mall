// pages/detail/detail.js

const db = require('../../utils/db.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.getProduct(id)
  },

  getProduct(id) {
    let self = this
    wx.showLoading({
      title: '正在加载中...',
    })

    db.getProductDetail(id).then(result => {
      wx.hideLoading()
      const data = result.result
      // get 2 digits price
      data.price = util.formatPrice(data.price)
      self.setData({
        product: data
      })
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },

  buy() {
    wx.showLoading({
      title: '商品购买中...',
    })

    const productToBuy = Object.assign({
      count: 1
    }, this.data.product)
    productToBuy.productId = productToBuy._id
    console.log(productToBuy)
    db.addOrder({
      list: [productToBuy]
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      console.log(data)
      if (data) {
        wx.showToast({
          title: '商品购买成功'
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '商品购买失败',
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '商品购买失败',
      })
    })
  },

  addToTrolley(event) {
    let productId = event.currentTarget.dataset.id
    //app.addToTrolley(this.data.product.id)
  },

  onTapCommentEntry() {
    let product = this.data.product
    if (product.commentCount) {
      wx.navigateTo({
        url: `/pages/comment/comment?data=${JSON.stringify(this.data.product)}`
      })
    }
  }
})