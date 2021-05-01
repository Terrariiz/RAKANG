<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <v-container class="container-news">
      <section class="header">
        <h1>ข่าวประชาสัมพันธ์</h1>
        <!-- <h4>ชื่อหัวข้อเรื่อง</h4> -->
      </section>
      <hr>
      <v-chip-group
        v-model="selectedCategory"
        active-class="primary--text"
        mandatory
      >
        <h5 style="padding: 7px 0px 0px 0px;">หมวดหมู่ :</h5>
        <v-chip
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </v-chip>
       </v-chip-group>
      <div>
        <v-text-field
          class="search-doctrine"
          style="width:30%;"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          label="ค้นหาหัวข้อ"
        ></v-text-field>
      </div>
      <p class="notfound" v-if="filteredList.length == 0 && search !== ''">
        <br />ไม่พบ "{{ search.trim() }}"<br /><br /><br /><br /><br />
      </p>
      <p class="notfound" v-if="filteredList.length == 0 && search == ''">
        <br />ไม่มีเนื้อหาในส่วนนี้<br /><br /><br /><br /><br />
      </p>
      <!-- อันใหม่ -->
      <div class="containerx">
        <v-row>
          <v-col
            v-for="news in filteredList"
            :key="news.title"
            cols="12"
            md="4"
            sm="12"
          >
            <div @click="ViewNews(news._id)" class="cardx">
              <img :src="news.image" />
              <div class="panelx">
                <!-- ปุ่ม bookmark -->

                <v-list-item three-line class="title-font-size">
                  {{ news.title }}
                </v-list-item>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-subtitle v-html="news.content">
                      {{ news.content }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <span class="datex">{{ news.date }}</span>
                <p>
                  {{ news.categories }}
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-pagination
          v-if="pagination.lengthPages != 0"
          circle
          :total-visible="7"
          v-model="pagination.page"
          :length="pagination.lengthPages"
        ></v-pagination>
      </div>
      <!-- อันใหม่ -->
    </v-container>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import countapi from "countapi-js";
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import("@/components/navbar/navbar");
export default {
  name: "News",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      news: [],
      search: "",
      selectedCategory: "ทั้งหมด",
      categories: [
        "ทั้งหมด",
        "วัด",
        "โรงพยาบาล",
        "มูลนิธิ",
        "ประชาสัมพันธ์ของเว็บไซค์",
        "อื่นๆ",
      ],
      pagination: {
        data: null,
        rowsPerPage: 6,
        page: 1,
        lengthPages: null,
      },
    };
  },
  computed: {
    // ค้นหา
    filteredList() {
      var newlist = this.news.filter((news) => {
        var result;
        if (this.selectedCategory == "ทั้งหมด") {
          result = news.title
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(
              this.search
                .toLowerCase()
                .trim()
                .replace(/\s/g, "")
            );
          return result;
        } else {
          result = news.categories.includes(this.selectedCategory);
          if (this.search == "") {
            return result;
          } else {
            if (result == true) {
              result = news.title
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(
                  this.search
                    .toLowerCase()
                    .trim()
                    .replace(/\s/g, "")
                );
              return result;
            }
          }
        }
      });
      newlist = this.split_data(newlist);
      return newlist;
    },
  },
  mounted: async function mounted() {
    await this.$http.get("/news/ShowListNews")
      .then(async (res) => {
        console.log(res.data);
        this.news = res.data;
        this.news.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        var i = 0;
        for (this.news[i]; i<this.news.length; i++) {
          await countapi.get(this.news[i].count_api_namespace, this.news[i].count_api_key).then((result) => { 
              this.news[i]['view'] = result.value
          });
          if(moment(this.news[i].date).format('dddd') == 'Mondey'){
                this.news[i].date = moment(this.news[i].date).format(" วันจันทร์ DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Tuesday'){
                this.news[i].date = moment(this.news[i].date).format(" วันอังคาร DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Wednesday'){
                this.news[i].date = moment(this.news[i].date).format(" วันพุธ DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Thursday'){
                this.news[i].date = moment(this.news[i].date).format(" วันพฤหัสบดี DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Friday'){
                this.news[i].date = moment(this.news[i].date).format(" วันศุกร์ DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Saturday'){
                this.news[i].date = moment(this.news[i].date).format(" วันเสาร์ DD-MM-YY A");
              } else if(moment(this.news[i].date).format('dddd') == 'Sunday'){
                this.news[i].date = moment(this.news[i].date).format(" วันอาทิตย์ DD-MM-YY A");
              }
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    await this.onbeforeunload();
  },
  methods: {
    ViewNews(newsid,namespace,key){
      countapi.hit(namespace, key)
      this.$router.push({
        name: "UserDetailNews",
        params: { id: newsid },
      });
    },
    onbeforeunload() {
      window.scrollTo(0, 0);
    },
    // แบ่งหน้าแสดงข้อมูล
    split_data(data) {
      var firstIndex;
      if (this.pagination.page == 1) {
        firstIndex = 0;
      } else {
        firstIndex = (this.pagination.page - 1) * this.pagination.rowsPerPage;
      }
      console.log(firstIndex + " firstIndex");
      this.pagination.lengthPages = this.pagination.rowsPerPage
        ? Math.ceil(data.length / this.pagination.rowsPerPage)
        : 0;
      var showData = data.slice(
        firstIndex,
        firstIndex + this.pagination.rowsPerPage
      );
      console.log(showData);
      return showData;
    },
  },
  if(result) {
    console.log(result);
  },
  onbeforeunload() {
    window.scrollTo(0, 0);
  },
  // แบ่งหน้าแสดงข้อมูล
  split_data(data) {
    var firstIndex;
    if (this.pagination.page == 1) {
      firstIndex = 0;
    } else {
      firstIndex = (this.pagination.page - 1) * this.pagination.rowsPerPage;
    }
    console.log(firstIndex + " firstIndex");
    this.pagination.lengthPages = this.pagination.rowsPerPage
      ? Math.ceil(data.length / this.pagination.rowsPerPage)
      : 0;
    var showData = data.slice(
      firstIndex,
      firstIndex + this.pagination.rowsPerPage
    );
    console.log(showData);
    return showData;
  },
};
</script>

<style>
/* .notfound{
  padding: 25px 50px 240px;
} */
.title-font-size {
  font-size: 21px;
}
.btn-bookmark {
  position: absolute;
  right: 5%;
  top: 3%;
}
/* อันใหม่ */
.containerx {
  width: 80%;
  margin: 0 auto;
}
.titlex {
  text-align: center;
  margin: 50px 0;
}
.titlex h5 {
  color: var(--primary-color);
  text-transform: uppercase;
}
.column-cardx {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.cardx {
  cursor: pointer;
}
.cardx:hover {
  box-shadow: 0 0 20px 0px rgb(0, 0, 0, 0.2);
}
.cardx img {
  width: 100%;
  height: 300px;
}
.panelx {
  padding: 5%;
  box-shadow: 0px 6px 18px -8px rgba(118, 130, 183, 1);
  border-radius: 10px;
  height: 250px;
}
span.datex {
  font-weight: 700;
}
/* อันใหม่ */
/* .margin-card{
  margin-bottom:5%;
}
div{
  display: block;
}
.res-top {
  display: none;
}
v-img {
   
   width: 100%;
   
}

.img {
  width: 300px;

  background-size: cover;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.img-fluid{
  object-fit: cover;  
  margin:3%;
}
.btn-news {
  position: relative;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
.btn-doctrine {
  position: relative;
  width: 20%;
  left: 20%;
}


@media only screen and (max-width: 415px) {
  .res-top {
    display: initial;
  }
  .hide-res {
    display: none;
  }
}
@media only screen and (max-width: 415px) {
  .img {
    width: 100%;

    background-size: cover;
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  .btn-news {
    position: relative;

    width: 100%;
  }
  .container-news {
    padding: 0vh;
  }
  .btn-doctrine {
    position: relative;
    left: 0;
    width: 100%;
    margin: 3%;
  }
} */
</style>
