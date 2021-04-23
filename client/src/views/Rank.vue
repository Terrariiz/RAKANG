<template>
  <div class="Rank">
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br /><br />
    <h1 style="text-align:center;">Ranking Board</h1>
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
        <v-data-table :headers="headers" :items="User" :search="search">
          <template User.fullname="{ User }"
            >{{ User.firstname }} {{ User.lastname }}</template
          >
        </v-data-table>
      </v-card>
    </v-container>
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import("@/components/navbar/navbar");
export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      User: [],
      search: "",

      headers: [
        { text: "ลำดับ", value: "Rank" },
        { text: "ชื่อผู้บริจาค", value: "firstname" },
        { text: "Point", value: "point" },
      ],
    };
  },
  mounted: async function mounted() {
    await this.$http
      .get("/user/RankList")
      .then((res) => {
        this.User = res.data;
        console.log(res.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
};
</script>
