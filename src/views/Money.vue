<template>
  <Layout class-prefix="Layout"> <!--    给组件传想要的类-->
   <NumberPads/>
    <Types :xxx=" '帅哥' "/>
    <Notes/>
   <Tags/>
  </Layout>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
export default {
  name: 'Money',
  components: {Notes, Types, NumberPads, Tags},
};
</script>

<style lang="scss">
.Layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>


