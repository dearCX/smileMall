<template>
  <div class="floor">
    <div class="floor-title">
      <span>{{floorNum}}F</span>{{floorTitle}}
    </div>
    <div class="floor-anomaly">
      <div class="floor-one">
        <img :src="floor_0.image" width="100%" />
      </div>
      <div>
        <div class="floor-two">
          <img :src="floor_1.image" width="100%" />
        </div>
        <div>
          <img :src="floor_2.image" width="100%" />
        </div>
      </div>
    </div>
    <div class="floor-rule">
      <div v-for="(item ,index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'floorComponent',
  props: ['floorData', 'floorTitle', 'floorNum'],
  data () {
    return {
      floor_0: '',
      floor_1: '',
      floor_2: ''
    }
  },
  methods: {
    name () {
    }
  },
  watch: {
    floorData: function (val) {
      this.floor_0 = this.floorData[0]
      this.floor_1 = this.floorData[1]
      this.floor_2 = this.floorData[2]
    }
  }
}
</script>
<style lang="less" scoped>
  .floor-title{
    text-align: center;
    padding: 8px 0;
    color: rgb(222,61,33);
    font-size: 12px;
  }
  .floor-title span{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    text-align: center;
    border-radius: 50%;
    background-color: rgb(222,61,33);
    color: #fff;
  }
  .floor-anomaly{
    display: flex;
    flex-direction:row;
    background-color: #fff;
    border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
    width:10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .floor-one{
    border-right:1px solid #ddd;
  }
  .floor-two{
    border-bottom:1px solid #ddd;
  }
  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    background-color: #fff;
  }
  .floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:10rem;
    border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
  }
</style>
