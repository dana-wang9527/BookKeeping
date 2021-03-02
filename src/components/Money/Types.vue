<template>
  <div>
    <ul class="types">
      <li :class="type==='-'&&'selected'"
          @click="selectorType('-')">支出
      </li>
      <li :class="type==='+'&&'selected'"
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
  type = '-';//       type: '-' //当是‘-’表示支出，当是‘+’表示收入
  @Prop([String, Boolean]) xxx: string | boolean | undefined;
//Prop告诉vue xxx不是data是props
  // String,  Boolean告诉vue xxx是运行时String,  Boolean
  //xxx属性名
  //string | boolean | undefined告诉TS xxx的类型
  selectorType(type) {
    if (type !== '-' && type !== '+') { //type只能是‘-’或者‘+’
      throw new Error('type is unknown');
    }
    this.type = type;
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