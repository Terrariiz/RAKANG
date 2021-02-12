<template class="body">
  <div  >
      <!-- <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <div class="campaign-content">
                      <h1>ชื่อแคมเปญ</h1>
                  </div>
                    <div class="col-md-8 col-sm-7">
                        <div class="campaign-content">
                            <img class="image -fullwidth img-responsive" src="" alt="">
                            <p class="lead">dwadadwdadadadadadawdadawd</p>
                            <p class="details">
                                <span class="duration">ระยะเวลา</span>
                                <span class="location">พื้นที่ดำเนินโครงการ</span>
                            </p>
                        </div>
                    </div> -->
                    <!-- ยอดบริจาค -->
                    <!-- <div class="col-md-4 col-sm-5">
                        <div class="fund-raising affix-top" style="position:relative;">
                            <div class="body">
                                <div class="amount-raised">
                                    <h3 class="title">ยอดบริจาค</h3>
                                    <span class="value">600000 บาท</span>
                                </div>
                                <div class="funding-goal">
                                    <h3 class="title">เป้าหมาย</h3>
                                    <span class="value">600000 บาท</span>
                                </div>
                                <div class="process-bar">
                                    <span class="percent">
                                        <span class="hide-txt">ดำเนินการไปแล้ว</span>
                                    </span>
                                    <span class="bar" style="width:84%"></span>
                            </div>
                            <span class="timeleft"> 100 วัน </span>
                            <span class="people">
                                <span class="hide-txt">จำนวนคนที่บริจาค</span>
                            </span>
                        </div>
                        <div class="action">
                            <a class="btn-donate js-btn-anchor-donate"></a>
                        </div>
                    </div>
              </div>
              
          </div>
      </div>
  </div> -->
  <v-container>
      <v-row>
          <h1>title</h1>
          <br>
      </v-row>
      <v-row>
          <v-col  cols="12" md="8" sm="12">
              <div class="project-content">
                  <img>
                  <p class="lead">ทำอย่่างนู้นอย่างนี้บลาๆ</p>
                  <p class="details">
                      <span class="duration">ระยะเวลา </span>
                      <span class="location">สถานที่</span>
                  </p>
              </div>
          </v-col>
          <v-col  cols="12" md="4" sm="12">
            <div class="fund-raising affix-top">
                <div class="body">
                    <div class="amount-raised">
                        <h3 class="title">ยอดบริจาคขณะนี้</h3>
                        <span class="value">100000 บาท</span>
                    </div>
                    <div class="funding-goal">
                        <h3 class="title">เป้าหมาย</h3>
                        <span class="value">5000000 บาท</span>
                    </div>
                    <div class="progress-bar">
                        <span class="percent">
                            <span class="hide-txt">ดำเนินการไปแล้ว</span>
                            80%
                        </span>
                        <span class="bar" style="width:80%"></span>
                    </div>
                    <span class="timeleft">365 วัน</span>
                    <span class="people">
                        <span class="hide-txt">จำนวนคนที่บริจาค</span>
                        <span class="icon-people">43</span>
                    </span>
                </div>

            <div class="action">
                <a><v-btn block></v-btn></a>
                
            </div>

            </div>
          </v-col>
      </v-row>
      
  </v-container>
  <!-- tablist -->
  <div class="tab-section">
      <v-container>
         <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
        
      </v-container>
  </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        tab: null,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
//  import x from "../../../public/image/2.jpg"
</script>

<style>
.project-content{
    padding-right: 40px;
}
.fund-raising{
    border-radius: 6px;
    background-clip: padding-box;
    color: #666;
    border: 1px solid #f3d9ab;
    background-color: #fff;
    z-index: 999;
}
.fund-raising .body{
   padding: 30px 25px 0  25px;
}
.fund-raising .action{
   padding: 30px 25px 30px 25px;
}
</style>