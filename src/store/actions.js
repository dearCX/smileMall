import { http } from '@/api/http.js'

export default {
  // 商品列表
  getProductList ({ commit, state }) {
    return http.get(`/productList`).then(res => res)
  }
}
