<template>
  <div class="contact">
    <br /><br />
    <div>
      <Navbar></Navbar>
    </div>
    <v-parallax class="bg" src="../../public/image/rocket.png" height="auto">
      <div class="container" id="team">
        <section class="header textname">
          <h1>OUR TEAM</h1>
          <p>หนองน้ำเต็มบึง/Lagoon full swamp</p>
          <hr />
        </section>

        <v-row justify="center">
          <br />
          <v-col cols="12" md="3" sm="12">
            <div class="member">
              <a href="https://www.facebook.com/profile.php?id=100001200256778"
                ><img
                  class="memberimg"
                  src="../../public/image/sky.png"
                  alt="Project Manager"
                />
              </a>
              <div class="textname">
                <h3>สกาย ไรด้าาาาา</h3>
                <h5>Project Manager</h5>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <br />
          <v-col cols="12" md="3" sm="12">
            <div class="member">
              <a href="https://www.facebook.com/nattapon.tongta"
                ><img
                  class="memberimg"
                  src="../../public/image/kluay.png"
                  alt="Business Analyst"
                />
              </a>
              <div class="textname">
                <h3>กล้วยหอม จอมซน</h3>
                <h5>Business Analyst</h5>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="3" sm="12">
            <div class="member">
              <a href="https://www.facebook.com/profile.php?id=100002353314345">
                <img
                  class="memberimg"
                  src="../../public/image/aiem.jpg"
                  alt="Developer"
              /></a>
              <div class="textname">
                <h3>กรดล ห้าสอง</h3>
                <h5>Developer</h5>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="3" sm="12">
            <div class="member">
              <a href="https://www.facebook.com/pitpagon.chinanupagon">
                <img
                  class="memberimg"
                  src="../../public/image/fluke.png"
                  alt="UX/UI"
              /></a>
              <div class="textname">
                <h3>พิชพาก้อน ป้อนแมงโก้</h3>
                <h5>UX/UI</h5>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="3" sm="12">
            <div class="member">
              <a href="https://www.facebook.com/ImZekai">
                <img
                  class="memberimg"
                  src="../../public/image/eartdy.jpg"
                  alt="Tester"
              /></a>
              <div class="textname">
                <h3>เอิ้ทดี้ ผีน่ารัก</h3>
                <h5>Tester</h5>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <br /><br />
    </v-parallax>

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
    Footer,
  },
  mounted: async function mounted() {
    await this.onbeforeunload();
  },
  methods: {
    onbeforeunload() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
}
.header h1 {
  font-weight: bold;
}
.container {
  margin: auto;
  padding: 10px;
}
.member {
  padding: 10px;
  text-align: center;
}
.memberimg:hover {
  transition: 0.5s ease;
  transform: translateY(-5px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
}
.textname {
  color: #000;
  margin-top: 3%;
  text-shadow: 2px 2px 5px gray;
}
img {
  width: 200px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>
