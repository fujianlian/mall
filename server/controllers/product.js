const DB = require("../utils/db.js")

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },
  detail: async ctx => {
    productId = +ctx.params.id
    if (!isNaN(productId)) {
      ctx.state.data = (await DB.query('select * from product where product.id = ?', [productId]))[0]
    } else {
      ctx.state.data = {}
    }
  }
}