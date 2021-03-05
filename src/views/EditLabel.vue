<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" calss="leftIcon" @click.native="goBack"/>
      <span class="title">
      编辑标签
      </span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update"
                field-name="标签" placeholder="请输入标签"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListsModel from '@/models/tagList';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined;

  created() {
    const id = this.$route.params.id; //route获取信息
    tagListsModel.fetch();
    const tags = tagListsModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/404'); //router转发
    }
  }

  update(name: string) {
    if (this.tag) {
      tagListsModel.update(this.tag.id, name);
    }
  }

  remove() {
    if (this.tag) {
      if (tagListsModel.remove(this.tag.id)) {
        this.$router.back();
      }
    }

  }

  goBack() {
    this.$router.back();
  }
}
</script>


<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  position: relative;
  display: flex;
  align-content: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>