<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>

      <div class="chart-wrapper" ref="chartWrapper">
        <Chart class="chart" :options="x"/>
      </div>
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="recode">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>￥ {{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="no-Result">
        目前没有相关记录
      </div>
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
import Chart from '@/components/Chart.vue';
import _ from 'lodash';
import day from 'dayjs';


@Component({
  components: {Tabs, Chart},
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  mounted() {
    const div = this.$refs.chartWrapper;
    div.scrollLeft = div.scrollWidth;
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

  get y() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 30; i++) {
      const dateString = day(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.recodeList, {createdAt: dateString});
      array.push({date: dateString, value: found ? found.amount : 0});
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }


  get x() {

    const keys = this.y.map(item => item.date);
    const value = this.y.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          }
        },
        type: 'category',
        data: keys
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {
          borderWidth: 1,
          color: '#666',
          borderColor: '#666'
        },
        data: value,
        type: 'line'
      }],
      tooltip: {
        show: true,
        triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      }
    };
  }

  get recodeList() {
    return (this.$store.state as RootStore).recodeList;
  }

  get groupedList() {
    const {recodeList} = this;

    const newList = clone(recodeList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: recodeItem[] }[]
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
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
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
.echarts {
  max-width: 100%;
  height: 400px;
}

.no-Result {
  padding: 16px;
  text-align: center;
}

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

.chart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>