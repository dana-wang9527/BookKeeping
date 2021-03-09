<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <div>
        type: {{ type }}
        <br/>
        interval:{{ interval }}
      </div>
      <div>
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{ group.title }}</h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="recode">
                <span>{{ tagString(item.tags) }}</span>
                <span class="notes">{{ item.notes }}</span>
                <span>￥ {{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </Layout>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import typeList from '@/constants/typeList';


@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join();
  }

  get recodeList() {
    return (this.$store.state as RootStore).recodeList;
  }

  get result() {
    const {recodeList} = this;
    type HashTableValue = { title: string; items: RecodeList[] }
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recodeList.length; i++) {
      const [date] = recodeList[i].createdAt?.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recodeList[i]);
    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecodes');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }

}

::v-deep .interval-tabs-item {
  height: 48px;
}

%item {
  line-height: 24px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item
}

.recode {
  background: white;
  @extend %item
}

.notes {
  margin-Right: auto;
  margin-left: 16px;
  color: #999;
}
</style>