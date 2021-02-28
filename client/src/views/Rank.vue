<template>
  <div class="coin">
    <div>
      <Navbar></Navbar>
    </div>
    <h1>RANK</h1>
<v-container>
    <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="donatelog"
              :search="search"
            ></v-data-table>
          </v-card>
</v-container>
    
  </div>
</template>
<script>
const Navbar = () => import("@/components/navbar/navbar");
export default {
  components: {
    Navbar,
  }
}
</script>
<style>
</style>
