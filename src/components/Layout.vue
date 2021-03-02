<template>
  <div class="Layout-wrapper" :class="classPrefix&&`${classPrefix}-wrapper`" >
    <div class="content" :class="classPrefix&&`${classPrefix}-content`">
<!--      插槽：接受Layout传过来的东西-->
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  props:['classPrefix'],
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.Layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  overflow: auto;
  flex-grow: 1;
}
</style>