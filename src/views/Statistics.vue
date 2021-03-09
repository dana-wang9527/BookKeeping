<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
        <ol>
          <li v-for="(group,index) in groupedList" :key="index">
            <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="recode">
                <span>{{ tagString(item.tags) }}</span>
                <span class="notes">{{ item.notes }}</span>
                <span>￥ {{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
    </Layout>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';


@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  beautify(string: string) {
    const now = dayjs();
    if (dayjs(string).isSame(now, 'day')) {
      return '今天';
    } else if (dayjs(string).isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (dayjs(string).isSame(now, 'year')) {
      return dayjs(string).format('M月D日');
    } else {
      return dayjs(string).format('YYYY年M月D日');
    }
  }

  get recodeList() {
    return (this.$store.state as RootStore).recodeList;
  }

  get groupedList() {
    const {recodeList} = this;
    if (recodeList.length === 0) return [];

    const newList = clone(recodeList).filter(r=>r.type===this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    type Result={title: string;total?: number;items: recodeItem[]}
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    const x=result.map(group=>{
      group.total=group.items.reduce((sum,item)=>sum+item.amount,0)
    })
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecodes');
  }

  type = '-';
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: #c4c4c4;

  &.selected {

    background: white;

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