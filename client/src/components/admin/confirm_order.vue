<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br />
    <h1>ยืนยันคำสั่งการแลกของ</h1>
    <div class="container">
      <v-btn class="back-btn" @click="$router.back()">
        <i
          style="float: left"
          class="fa fa-arrow-left fa-lg"
          aria-hidden="true"
        ></i
      ></v-btn>
      <div class="small-container single-product">
        <div class="row">
          <div class="col-2">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left"></th>
                    <th class="text-left">ชื่อผู้แลก</th>
                    <th class="text-left">ชื่อสินค้า</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item._id">
                    <td>
                      <center>
                        <img
                          :src="item.galleryimage[0].image"
                          class="img-fluid"
                          style="
                            width: 100px;
                            height: 100px;
                            object-fit: cover;
                            margin: 3%;
                          "
                          align="center"
                        />
                      </center>
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.remain }}
                    </td>
                    <td>
                      <v-btn
                        style="margin-right: 3%"
                        >ยืนยัน</v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div class="col-2">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left"></th>
                    <th class="text-left">ชื่อผู้แลก</th>
                    <th class="text-left">ชื่อสินค้า</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item._id">
                    <td>
                      <center>
                        <img
                          :src="item.galleryimage[0].image"
                          class="img-fluid"
                          style="
                            width: 100px;
                            height: 100px;
                            object-fit: cover;
                            margin: 3%;
                          "
                          align="center"
                        />
                      </center>
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.remain }}
                    </td>
                    <td>
                      <v-btn
                        style="margin-right: 3%"
                        >ยืนยัน</v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
const Navbar = () => import("@/components/navbar/navbar");
export default {
  components: {
    Navbar,
  },
  data(){
    return {
      logs:[]
    }
  },
  created: async function created() {
    await this.$http.get("/exchangeitem/DetailItem/ShowOrder")
    .then((res) => {
      this.logs = res.data
      console.log(this.logs)
    }).catch(function(err){
        console.log(err)
    })
  },
};
</script>

<style>
</style>