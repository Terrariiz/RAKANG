<template>
  <div class="admin">
    <h1>ADMIN SITE</h1>
    <v-container>
         <v-btn
          color="success"
          class="mr-4"
          @click="validate"
        >
          Campaign
        </v-btn>
        <v-btn
          color="success"
          class="mr-4"
          @click="validate"
        >
          บอร์ดหลักธรรม
        </v-btn>
        <v-btn
          color="success"
          class="mr-4"
          @click="validate"
        >
          บอร์ดประชาสัมพันธ์
        </v-btn>
        <v-btn
          color="success"
          class="mr-4"
          @click="validate"
        >
          Logout
        </v-btn>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Admin'
}
</script>
