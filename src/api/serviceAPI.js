const baseURL = 'https://www.easy-mock.com/mock/5b84cf91f7615d46c8184b1e/smailMall/'
const localURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: baseURL + 'productList',
  getGoodsInfo: baseURL + 'getGoodsInfo',
  getDetailGoodsInfo: localURL + 'goods/getDetailGoodsInfo',
  registerUser: localURL + 'user/register', // 用户注册接口
  loginUser: localURL + 'user/login', // 用户登录接口
  getCategoryList: localURL + 'goods/getCategoryList', // 得到大类信息
  getCategorySubList: localURL + 'goods/getCategorySubList', // 得到小类信息
  getGoodsListByCategorySubID: localURL + 'goods/getGoodsListByCategorySubID' // 根据业务分类ID查询商品
}
export default URL
