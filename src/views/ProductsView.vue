<template>
  <h1 class='front-title'>This is 產品列表頁面</h1>
  <LoadingRay :active='isLoading' />
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td style="width: 200px">
          <div
            style='
              height: 100px;
              background-size: cover;
              background-position: center;
            '
            :style='{ backgroundImage: `url(${item.imageUrl})` }'
          ></div>
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>
          <div class='h5' v-if='!item.price'>{{ item.origin_price }} 元</div>
          <del class='h6' v-if='item.price'
            >原價 {{ item.origin_price }} 元</del
          >
          <div class='h5' v-if="item.price">現在只要 {{ item.price }} 元</div>
        </td>
        <td>
          <div class='btn-group btn-group-sm'>
            <button
              type='button'
              class='btn btn-outline-secondary'
              @click='getProduct(item.id)'
              :disabled='loadingStatus === item.id'
            >
              <i
                class='fas fa-spinner fa-pulse'
                v-if='loadingStatus === item.id'
              ></i>
              查看更多
            </button>
            <button
              type='button'
              class='btn btn-outline-danger'
              @click='addToCart(item.id)'
              :disabled='loadingStatus === item.id'
            >
              <i
                class='fas fa-spinner fa-pulse'
                v-if="loadingStatus === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <product-modal ref='productModal' :product='product'></product-modal>
</template>

<script>
import ProductModal from '../components/ProductModal.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      loadingStatus: '',
      products: [],
      product: {}
    }
  },
  components: {
    ProductModal
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    getProduct (id) {
      this.isLoading = true
      this.loadingStatus = id
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`
      this.$http
        .get(url)
        .then((res) => {
          console.log(res)
          console.log('id', id)
          this.product = res.data.product
          this.loadingStatus = ''
          console.log('product', this.product)
          this.$refs.productModal.openModal()
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    addToCart (id, qty = 1) {
      this.isLoading = true
      this.loadingStatus = id
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.$http
        .post(url, { data: cart })
        .then((res) => {
          alert(res.data.message)
          this.loadingStatus = ''
          this.$refs.productModal.hideModal()
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style scoped></style>
