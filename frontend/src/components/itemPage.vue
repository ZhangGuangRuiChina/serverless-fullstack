<template>
  <div class="item-container">
    <el-form v-model="queryParams" size="mini" class="form-container">
      <el-form-item>
        <el-input style="width: 300px;" v-model="queryParams.keyword" @keyup.enter.native="getItemList"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getItemList" :disabled="!queryParams.keyword">查询</el-button>
        <el-button @click="nextPage" :disabled="!queryParams.keyword">下一页</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20" v-loading="loading">
      <el-col :span="3" v-for="(item, i) in itemList" :key="i">
        <el-card :data-id="item.id" style="text-align: left;">
          <el-image style="width: 150px; height: 150px" :src="item.url"/>
          <p>￥{{ item.price }}</p>
          <p class="p-name" v-html="item.title"></p>
          <p class="p-shop">{{ item.shopName }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '@/api/getData.js';
export default {
  props: {},
  data() {
    return {
      queryParams: {
        keyword: '',
        page: 1
      },
      itemList: [],
      loading: false
    }
  },
  mounted() {

  },
  methods: {
    getItemList() {
      this.loading = true;
      getData(this.queryParams)
        .then(res => {
          this.loading = false;
          this.itemList = res.data;
        })
    },
    nextPage() {
      this.queryParams.page++;
      this.getItemList();
    }
  }
}
</script>

<style>
.form-container {
  margin: 20px;
  text-align: center;
}
.p-name {
    height: 40px;
    margin-bottom: 8px;
    overflow: hidden;
    font-size: 14px;
}
.p-tag {
  padding: 0px 4px;
  color: #ffffff;
}
.p-shop {
  font-size: 12px;
}
</style>
