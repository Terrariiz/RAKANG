<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <h1>Campaign</h1>
        <v-container>
            <v-row>
                <v-col>
                    <div style="margin:3%; font-size:30px;">Name</div>
                    <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="300"
                    max-width="500"
                    src="https://picsum.photos/id/11/500/300">
                    </v-img>
                </v-col>
                <v-col>
                    <v-container  rounded-xl style="background-color:white; box-shadow:5px 6px 5px #888888; ">  
               <div style="margin:5%"></div>
              </v-container>
              <v-contianer >
                  <div style="float:right; margin-top:5%;">ยอดบริจาค 20000 บาท</div>
                  <v-progress-linear   v-model="power"  color="amber" width="400"  height="25"><strong>{{ Math.ceil(power) }}%</strong></v-progress-linear>
                  <v-btn color="success" elevation="3" style="margin:3%; float:right;">donate</v-btn>
              </v-contianer>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'Campaign',
    components:{
        Navbar
    },
    data: () => ({
      
      power: 78,
    }),
}
</script>

<style>

</style>