<template>
  <Layout class-prefix="Layout"><!--    给组件传想要的类-->
    <NumberPads @submit="saveRecode" @update:value="updateNumber"/>
    <Tabs :data-source="typeList"
          :value.sync="recode.type"/>
    <div class="createdAt">
      <FormItem field-name="日期"
                type="date"
                placeholder="在这里输入日期"
                :value.sync="recode.createdAt"/>
    </div>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注"
                :value.sync="recode.notes"/>
    </div>
    <Tags @update:value="recode.tags=$event"/>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import NumberPads from '@/components/Money/NumberPads.vue';
import FormItem from '@/components/Money/FormItem.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';


@Component({
  components: {Tabs, FormItem, NumberPads, Tags},
})
export default class Money extends Vue {
  get recodeList() {
    return this.$store.state.recodeList;
  }

  typeList = typeList;

  recode: recodeItem = {
    tags: [], notes: '', type: '-', amount: 0,createdAt: new Date().toISOString()
  };

  created() {
    this.$store.commit('fetchRecodes');
  }



  updateNumber(value: string) {
    this.recode.amount = parseFloat(value);

  }

  saveRecode() {
    if (!this.recode.tags || this.recode.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecode', this.recode);
    if (this.$store.state.createRecodeError === null) {
      window.alert('已保存');
      this.recode.notes = '';
    }

  }

}
</script>

<style lang="scss" scoped>
::v-deep .Layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;

}

</style>


