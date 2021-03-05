<template>
  <Layout>
    <div>
      <Icon name="left"/>
      <span>
      编辑标签
      </span>
    </div>
<Notes field-name="标签" placeholder="请输入标签"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListsModel from '@/models/tagList';
import Notes from '@/components/Money/Notes.vue';
@Component({
  components: {Notes}
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id; //route获取信息
    tagListsModel.fetch();
    const tags = tagListsModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404'); //router转发
    }

  }
}
</script>


<style lang="scss" scoped>

</style>