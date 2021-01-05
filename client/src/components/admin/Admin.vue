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
    <!-- <v-container >
                <div id="grid-container">
                    <v-btn style="margin:3%; background-color:#4895ef ;" color="success" to = "/admin/listcampaign">Campaign</v-btn>
                    <v-btn style="margin:3%; background-color:#4895ef ;" color="success" to = "/admin/listnews">บอร์ดหลักธรรม</v-btn>
                    <v-btn style="margin:3%; background-color:#4895ef ;" color="primary" to = "/admin/listdoctrine">บอร์ดประชาสัมพันธ์</v-btn>
                </div>

           >
        </v-container>    -->

    <v-container>
      <v-row>
        <v-col cols="12" sm="2"  >
            
        </v-col>
      
        <v-col cols="12"   sm="12" md="2">
          <v-btn style="margin:3%; background-color:#4895ef ;" color="success" to = "/admin/listcampaign">Campaign</v-btn>    
        </v-col>
      
        <v-col cols="12" sm="12" md="2">
          <v-btn style="margin:3%; background-color:#4895ef ;" color="success" to = "/admin/listnews">บอร์ดหลักธรรม</v-btn>
        </v-col>
      
        <v-col cols="12"   sm="12" md="2">
          <v-btn style="margin:3%; background-color:#4895ef ;" color="primary" to = "/admin/listdoctrine">บอร์ดประชาสัมพันธ์</v-btn>
        </v-col>

        <v-col cols="12"   sm="12" md="2">
          <v-btn style="margin:3%; background-color:red ;" color="primary" to = "/loginadmin">Logout</v-btn>
        </v-col>

        
            
        

      </v-row>
      
    </v-container> 


    
  </div>
</template>

<script>

export default {
  name: 'Admin'
}
</script>
