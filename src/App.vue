<template>
  <RouterView />
</template>

<script>
export default {}
</script>

<style lang="scss">
.front-title {
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 30px;
  a {
    font-size: 18px;
    font-weight: 700;
    color: #2c3e50;
  }
  .active {
    color: #42b983;
  }
}

.home {
  text-align: center;
}
</style>
