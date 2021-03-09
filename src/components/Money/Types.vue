<template>
  <div>
    <ul class="types">
      <li :class="{[classPrefix+'-item']: classPrefix ,selected: value==='-',}"
          @click="selectorType('-')">支出
      </li>
      <li :class="{[classPrefix+'-item']: classPrefix ,selected: value==='+',}"
          @click="selectorType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop(String) classPrefix?: string;
  @Prop(String) readonly value!: string; //！表示不用管我有没有初始值
  //Prop告诉vue xxx不是data是props
  // String告诉vue type是运行时String
  //xxx属性名
  //string | undefined告诉TS xxx的类型
  selectorType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);
  }
}

</script>

<style lang="scss" scoped>
.types {
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