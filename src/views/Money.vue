<template>
  <Layout class-prefix="Layout"><!--    给组件传想要的类-->
    <NumberPads @submit="saveRecode" @update:value="updateNumber"/>
    <Tabs :data-source="typeList"
          :value.sync="recode.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="updateNotes"/>
    </div>
    <Tags/>
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
    tags: [], notes: '', type: '-', amount: 0
  };

  created() {
    this.$store.commit('fetchRecodes');
  }

  updateNotes(value: string) {
    this.recode.notes = value;
  }


  updateNumber(value: string) {
    this.recode.amount = parseFloat(value);
  }

  saveRecode() {
    this.$store.commit('createRecode', this.recode);
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


