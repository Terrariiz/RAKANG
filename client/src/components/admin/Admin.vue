<template>
  <div class="admin">
    <h1>ADMIN SITE</h1>
    <!-- <v-container>
         <v-btn
          color="blue-grey"
          class="mr-4"
        >
          Campaign
        </v-btn>
        <v-btn
          color="success"
          class="mr-4"
        >
          บอร์ดหลักธรรม
        </v-btn>
        <v-btn
          color="success"
          class="mr-4"
        >
          บอร์ดประชาสัมพันธ์
        </v-btn>
        <v-btn
          color="success"
          class="mr-4"
        >
          Logout
        </v-btn>
    </v-container> -->
    <v-container >
                <div id="grid-container">
                    <v-btn style="margin:3%; background-color:#4895ef ;" color="success" to = "/admin/listcampaign">Campaign</v-btn>
                    <v-btn style="margin:3%; background-color:#4895ef ;" color="success" to = "/admin/listdoctrine">บอร์ดหลักธรรม</v-btn>
                    <v-btn style="margin:3%; background-color:#4895ef ;" color="primary" to = "/admin/listnews">บอร์ดประชาสัมพันธ์</v-btn>
                </div>

            <!-- <v-btn style="margin-right= 50%;" color="primary" dark>cancle</v-btn> 
                <v-btn style="margin-left= 50%;" color="primary" dark>submit</v-btn> -->
        </v-container>    


    
  </div>
</template>

<script>

export default {
  name: 'Admin'
}
</script>
