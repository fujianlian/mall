// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'mall-7vt8m',
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const productId = event._id

  const cartRes = await db.collection('trolley').where({
    productId,
    user,
  }).get()
  const cartList = cartRes.data

  if (!cartList.length) {
    await db.collection('trolley').add({
      data: {
        productId,
        count: 1,
        user,
        image: event.image,
        name: event.name,
        price: event.price,
      },
    })
  } else {
    const count = cartList[0].count + 1
    await db.collection('trolley').doc(cartList[0]._id).update({
      data: {
        count,
      },
    })
  }

  return {}
}