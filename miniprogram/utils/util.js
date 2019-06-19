module.exports = {
  // make price with 2 digits
  formatPrice(price) {
    return parseFloat(Math.round(price * 100) / 100).toFixed(2)
  }
}