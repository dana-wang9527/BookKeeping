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


@Component({
  components: {Tabs, Chart},
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  mounted() {
    this.$refs.chartWrapper.scrollLeft = 9999;
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

  get x() {
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        type: 'category',
        data: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        ]
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
        data: [
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320, 1, 2
        ],
        type: 'line'
      }],
      tooltip: {
        show: true,
        triggerOn: 'click',
        position:'top',
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