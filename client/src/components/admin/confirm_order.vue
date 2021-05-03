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
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                 
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                 Amount
                </th>
                <th class="text-left">
                  Editor
                </th>
              </tr>
            </thead>
            <tbody>
                <tr >  
                <td><center><img src="" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;  margin:3%;" align="center"></center></td> 
                <td>
                    ชื่อสินค้า
                </td>
                <td>
                    จำนวนสินค้า
                </td>
                <td>
                  
                </td>
              </tr>
            </tbody>
          </template>
      </v-simple-table>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          
        </v-col>
      </v-row>
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
    await this.$http.get("/exchangeitem/ShowOrder")
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