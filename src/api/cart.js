import request from '@/utils/request'

// 加入购物车
// goodsId => 商品 Id
// goodsSkuId => 商品规格 Id 红色ihone8  粉色的 iphone8
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const delSelect = (cartIds) => {
  return request.post('cart/clear', {
    cartIds
  })
}
