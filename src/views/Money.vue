<template>
  <Layout class-prefix="Layout"><!--    给组件传想要的类-->
    <NumberPads @submit="saveRecode" @update:value="updateNumber"/>
    <Types :type.sync="recode.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="updateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index2';

@Component({
  components: {FormItem, Types, NumberPads, Tags},
})
export default class Money extends Vue {
  tags = store.tagList;
  recodeList = store.recodeList;
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
    store.createRecode(this.recode);
  }

}
</script>

<style lang="scss">
.Layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}

</style>


