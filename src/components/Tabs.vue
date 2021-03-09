<template>
  <div>
    <ul class="tabs">
      <li v-for="item in dataSource" :key="item.value"
          :class="{[classPrefix+'-tabs-item']: classPrefix, selected: item.value===value}"
          @click="select(item)">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = {
  text: string; value: string;
}

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String) classPrefix?: string;
  @Prop(String) readonly value!: string;

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }

}
</script>


<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    //伪元素防止添加下划线影响整体
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>