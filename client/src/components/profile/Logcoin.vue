<template>
  
      <!-- <div>
        <Navbar></Navbar>
      </div> -->
    
      <v-dialog v-model="show" max-width="600px">
         
          <v-card>
            <v-card-title>
              <h2>logcoin</h2>
               <hr>
            </v-card-title>
            <v-card-text>
              <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                
                <th class="text-left">
                  ชื่อแคมเปญ
                </th>
                <th class="text-left">
                 วันที่บริจาค
                </th>
                <th class="text-left">
                 ยอดบริจาค
                </th>
               
              </tr>
            </thead>
            <tbody>
              <tr   @submit.prevent="editcampaign" v-for="campaign in campaigns"  :key="campaign._id">
                
                <td>name</td>
                <td>date</td>
                <td>amount</td>
                

              </tr>
            </tbody>
          </template>
      </v-simple-table>
            </v-card-text>
          </v-card>
      </v-dialog>
  
</template>

<script>
// const Navbar = () => import('@/components/navbar/navbar')
export default {
    data(){
      return{
        log:[]
      }
    },
    mounted: function mounted() {
      this.getCoinLog()
    },
    name:'LogCoin',
    props: ['visible'],
    components:{
        // Navbar
    },
    computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },

}
</script>

<style>

</style>