// pages/comment/comment.js

const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [], // 评论列表
    product: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product = this.data.product
    product = JSON.parse(options.data)
    this.setData({
      product
    })
    this.getCommentList(product._id)
  },

  getCommentList(productId) {
    db.getComments(productId).then(result => {
      const data = result.data
      console.log(result)
      if (data.length) {
        this.setData({
          commentList: data.map(review => {
            review.createTime = util.formatTime(review.createTime, 'yyyy/MM/dd')
            review.images = review.images ? review.images.split(';') : []
            return review
          })
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },

  previewImg(event) {
    let target = event.currentTarget
    let current = target.dataset.current
    let urls = target.dataset.urls
    wx.previewImage({
      current: current,
      urls: urls
    })
  }
})