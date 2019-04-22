const DB = require("../utils/db.js")

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },
  detail: async ctx => {
    productId = +ctx.params.id
    if (!isNaN(productId)) {
      let product = (await DB.query('select * from product where product.id = ?', [productId]))[0]
      product.commentCount = (await DB.query('SELECT COUNT(id) AS comment_count FROM comment WHERE comment.product_id = ?', [productId]))[0].comment_count || 0
      product.firstComment = (await DB.query('SELECT * FROM comment WHERE comment.product_id = ? LIMIT 1 OFFSET 0', [productId]))[0] || null
      ctx.state.data = product
    } else {
      ctx.state.data = {}
    }
  }
}