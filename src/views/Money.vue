<template>
  <Layout class-prefix="Layout"><!--    给组件传想要的类-->
    <NumberPads @submit="saveRecode" @update:value="updateNumber"/>
    <Types :type.sync="recode.type"/>
    <Notes @update:value="updateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import {Component, Watch} from 'vue-property-decorator';
import tagListsModel from '@/models/tagList';
import recodeListModel from '@/models/RecodeListModel';


const recodeList = recodeListModel.fetch();
const tagLists = tagListsModel.fetch();

@Component({
  components: {Notes, Types, NumberPads, Tags},
})
export default class Money extends Vue {
  tags = tagLists;
  recodeList: recodeItem[] = recodeList;
  recode: recodeItem = {
    tags: [], notes: '', type: '-', amount: 0
  };


  onUpdateTags(value: string[]) {
    this.recode.tags = value;
  }

  updateNotes(value: string) {
    this.recode.notes = value;
  }


  updateNumber(value: string) {
    this.recode.amount = parseFloat(value);
  }

  saveRecode() {
    const recode2: recodeItem = recodeListModel.clone(this.recode);
    recode2.createdAt = new Date();
    this.recodeList.push(recode2);


  }

  @Watch('recodeList')
  onRecodeListChanged() {
    recodeListModel.save(this.recodeList);
  }

}
</script>

<style lang="scss">
.Layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>


