<template>
  <div class="demo1">
      <div>
        color
      </div>
  </div>
</template>
<script>
export default {
  
}
</script>
 <style scoped lang="scss">

.demo1{
  display: flex;
  box-sizing: border-box;
  div{
    color: red;
  }
}
.demo1::placeholder{
  color: red;
}
</style>
