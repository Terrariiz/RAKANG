<template>
  <div class="termuse">
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br /><br /><br />
    <div style="margin-left: 10%; margin-right: 10%">
      <h1>วิธีการใช้งานเว็บไซต์</h1>
      <v-row>
        <v-col cols="12" md="8" sm="8">
          <div class="textgroup" id="1">
            <h3>การบริจาคเงินให้แคมเปญ</h3>
            <p>
              ผู้ใช้งานสามารถบริจาคเงินให้แคมเปญได้
              โดยต้องสมัครสมาชิกและเข้าสู่ระบบเป็นสมาชิกของระบบก่อน
              ผู้ใช้งานสามารถเลือกแคมเปญที่ต้องการจะบริจาคได้ที่หน้า'แคมเปญ'
              โดยสามารถบริจาคเป็นจำนวนเงิน 50 บาท, 100 บาท, 300 บาท, 500 บาท,
              1000 บาท หรือจะกำหนดเองก็ได้ หลังจากเลือกจำนวนเงินเสร็จสิ้น
              ระบบจะเข้าสู่หน้าการทำธุรกรรมทางการเงินของทาง Chillpay
              โดยสามารถใช้ข้อมูลทางการเงินได้ดังนี้
            </p>
            <p>
              Visa Card Number : 4444-4444-4444-4444 Expired Date : 09/2022 CVV2
              : 123
            </p>
            <p>
              Master Card Card Number : 3333-3333-3333-3333 Expired Date :
              09/2022 CVV2 : 123
            </p>
            <p>
              JCB Card Number : 2222-2222-2222-2222 Expired Date : 09/2022 CVV2
              : 123
            </p>
          </div>
          <div class="textgroup" id="2">
            <h3>การใช้แต้มสะสมแลกของรางวัล</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor
              sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
          <div class="textgroup" id="3">
            <h3>วิธีการบันทึกหลักธรรมที่สนใจ(บุ๊คมาค)</h3>
            <p>
              ผู้ใช้งานสามารถบันทึกหลักธรรมที่สนใจ(บุ๊คมาค)ได้โดนคลิกที่สัญลักษณ์รูปธง<v-icon>mdi-bookmark</v-icon>
              โดยเมื่อบันทึกหลักธรรมไว้แล้วหลักธรรมนั้นๆจะถูกบันทึกไว้ที่หน้าโปรไฟล์เพื่อให้กลับมาอ่านอีกครั้งได้ง่ายขึ้น
              หลักธรรมที่บันทึกแล้วจะมีสัญลักษณ์รูปธงสีเหลือง<v-icon color="#ffb703">mdi-bookmark</v-icon>
              และสามารถคลิกทีสัญลักษณ์รูปธงสีเหลืองเพื่อยกเลิกการบันทึกหลักธรรมได้
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
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
h1 {
  font-weight: bold;
}
h3 {
  font-weight: bold;
}
.textgroup {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
