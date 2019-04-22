// pages/add-comment/add-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    commentValue: '',
    commentImages: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let product = this.data.product
    product = JSON.parse(options.data)
    this.setData({
      product
    })
  },

  onInput(event) {
    this.setData({
      commentValue: event.detail.value.trim()
    })
  },

  addComment(event) {
    let content = this.data.commentValue;
    if (!content) return

    wx.showLoading({
      title: '正在发表评论'
    })
    let productId = this.data.product.product_id
    this.uploadImage(images => {
      qcloud.request({
        url: config.service.addComment,
        login: true,
        method: 'PUT',
        data: {
          images,
          content,
          productId
        },
        success: result => {
          wx.hideLoading()
          let data = result.data
          if (!data.code) {
            wx.showToast({
              title: '发表评论成功'
            })

            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          } else {
            wx.showToast({
              icon: 'none',
              title: '发表评论失败'
            })
          }
        },
        fail: (err) => {
          console.log(err)
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '发表评论失败'
          });
        }
      })
    })
  },

  chooseImage() {
    let currentImages = this.data.commentImages
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        currentImages = currentImages.concat(res.tempFilePaths)
        let end = currentImages.length
        let begin = Math.max(end - 3, 0)
        currentImages = currentImages.slice(begin, end)
        this.setData({
          commentImages: currentImages
        });
      },
    })
  },

  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src

    wx.previewImage({
      current: src,
      urls: this.data.commentImages
    })
  },

  uploadImage(cb) {
    let commentImages = this.data.commentImages
    let images = []
    if (commentImages.length) {
      let length = commentImages.length
      for (let i = 0; i < length; i++) {
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: commentImages[i],
          name: 'file',
          success: res => {
            let data = JSON.parse(res.data)
            length--

            if (!data.code) {
              images.push(data.data.imgUrl)
            }

            if (length <= 0) {
              cb && cb(images)
            }
          },
          fail: () => {
            length--
          }
        })
      }
    } else {
      cb && cb(images)
    }
  },
})