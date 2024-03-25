<template>
  <h1 class="front-title">你現在在前台頁面</h1>
  <nav>
    <RouterLink to="/">首頁</RouterLink> |
    <RouterLink to="/products">前台產品列表</RouterLink> |
    <RouterLink to="/cart">前台購物車列表</RouterLink> |
  </nav>
  <RouterView></RouterView>
</template>

<style lang="scss">

</style>
