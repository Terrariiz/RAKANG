<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <v-overlay :value="isloading">
        <v-progress-circular
         size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay>
    <v-container class="container-news">
      <section class="header">
        <h1>หลักธรรม</h1>
        <!-- <h4>ชื่อหัวข้อเรื่อง</h4> -->
      </section>
      <hr />
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
        <br />ไม่พบ "{{
          search.trim()
        }}"<br /><br /><br /><br /><br /><br />
      </p>
      <p class="notfound" v-if="filteredList.length == 0 && search == ''">
        <br />ไม่มีเนื้อหาในส่วนนี้<br /><br /><br /><br /><br /><br />
      </p>
      <!-- อันใหม่ -->
      <div class="containerx">
        <v-row>
          <v-col
            v-for="doctrine in filteredList"
            :key="doctrine.title"
            cols="12"
            md="4"
            sm="12"
          >
            <div class="cardx">
              <img
                @click="
                  ViewDoctrine(
                    doctrine._id,
                    doctrine.count_api_namespace,
                    doctrine.count_api_key
                  )
                "
                :src="doctrine.image"
              />
              <div
                @click="
                  ViewDoctrine(
                    doctrine._id,
                    doctrine.count_api_namespace,
                    doctrine.count_api_key
                  )
                "
                class="panelx"
              >
                <!-- ปุ่ม bookmark -->

                <h3>
                  {{ doctrine.title }}
                </h3>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-subtitle v-html="doctrine.content">
                      {{ doctrine.content }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <span class="datex">{{ doctrine.edittime }}</span>
                <p>
                  {{ doctrine.categories }}
                </p>
                <span class="icon-people" style="float: right;"
                      ><i class="fa fa-eye"></i> {{ doctrine.view }}</span
                    >
              </div>
              <div class="btn-bookmark" v-if="$store.getters.UserIsLoggedIn">
                <v-btn
                  icon
                  color="#ffb703"
                  v-if="doctrine.fav"
                  @click="clickBookmarks(doctrine)"
                >
                  <v-icon x-large>mdi-bookmark</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="white"
                  v-else
                  @click="clickBookmarks(doctrine)"
                >
                  <v-icon x-large>mdi-bookmark</v-icon>
                </v-btn>
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
    <component-to-re-render :key="componentKey" />
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
  name: "Doctrine",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      componentKey: 0,
      doctrines: [],
      token: null,
      search: "",
      selectedCategory: "ทั้งหมด",
      isloading:true,
      categories: [
        "ทั้งหมด",
        "บทสวดมนต์",
        "หลักธรรม คำสอน",
        "คติสอนใจ",
        "พุทธประวัติ",
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
    // filteredList() {
    //   var newlist = this.doctrines.filter(doctrine => {
    //     var result
    //     if(this.selectedCategory == 'ทั้งหมด'){
    //       result = doctrine.title.toLowerCase().replace(/\s/g, '').includes(this.search.toLowerCase().trim().replace(/\s/g, ''))
    //       return result
    //     } else{
    //       result = doctrine.categories.includes(this.selectedCategory)
    //       if(this.search == ''){
    //         return result
    //       } else{
    //         if(result == true){
    //           result = doctrine.title.toLowerCase().replace(/\s/g, '').includes(this.search.toLowerCase().trim().replace(/\s/g, ''))
    //           return result
    //         }
    //       }
    //     }
    //   })
    //   // this.checkfav(newlist)
    //   return newlist
    // },
    // เปลี่ยนหน้า
    // pages () {
    //         return this.pagination.rowsPerPage ? Math.ceil(this.doctrines.length / this.pagination.rowsPerPage) : 0
    //     },
    //     filteredListx() {
    //         var firstIndex;
    //         if (this.pagination.page == 1) {
    //             firstIndex = 0;
    //         } else{
    //             firstIndex = (this.pagination.page-1) * this.pagination.rowsPerPage;
    //         }
    //         console.log(firstIndex + " firstIndex");
    //         var showData = this.doctrines.slice(firstIndex, firstIndex + this.pagination.rowsPerPage);
    //         console.log(showData);
    //         return showData
    //     },
    filteredList() {
      var newlist = this.doctrines.filter((doctrine) => {
        var result;
        if (this.selectedCategory == "ทั้งหมด") {
          result = doctrine.title
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
          result = doctrine.categories.includes(this.selectedCategory);
          if (this.search == "") {
            return result;
          } else {
            if (result == true) {
              result = doctrine.title
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
  created: async function created() {
    var IsFav;
    this.token = localStorage.getItem("user_token");
    if (this.$store.getters.UserIsLoggedIn) {
      var id = localStorage.getItem("user_id");
    }
    await this.$http
      .get("/doctrine/ShowListDoctrine")
      .then(async (res) => {
        this.doctrines = res.data;
        this.isloading = false
        var i = 0;
        var doc;

        for (i; i < this.doctrines.length; i++) {
          await countapi
            .get(
              this.doctrines[i].count_api_namespace,
              this.doctrines[i].count_api_key
            )
            .then((result) => {
              this.doctrines[i]["view"] = result.value;
              console.log(result.value);
            });

          doc = this.doctrines[i]._id;
          if (moment(this.doctrines[i].edittime).format("dddd") == "Mondey") {
            this.doctrines[i].edittime = moment(
              this.doctrines[i].edittime
            ).format(" วันจันทร์ DD-MM-YY A");
          } else if (
            moment(this.doctrines[i].edittime).format("dddd") == "Tuesday"
          ) {
            this.doctrines[i].edittime = moment(
              this.doctrines[i].edittime
            ).format(" วันอังคาร DD-MM-YY A");
          } else if (
            moment(this.doctrines[i].edittime).format("dddd") == "Wednesday"
          ) {
            this.doctrines[i].edittime = moment(
              this.doctrines[i].edittime
            ).format(" วันพุธ DD-MM-YY A");
          } else if (
            moment(this.doctrines[i].edittime).format("dddd") == "Thursday"
          ) {
            this.doctrines[i].edittime = moment(
              this.doctrines[i].edittime
            ).format(" วันพฤหัสบดี DD-MM-YY A");
          } else if (
            moment(this.doctrines[i].edittime).format("dddd") == "Friday"
          ) {
            this.doctrines[i].edittime = moment(
              this.doctrines[i].edittime
            ).format(" วันศุกร์ DD-MM-YY A");
          } else if (
            moment(this.doctrines[i].edittime).format("dddd") == "Saturday"
          ) {
            this.doctrines[i].edittime = moment(
              this.doctrines[i].edittime
            ).format(" วันเสาร์ DD-MM-YY A");
          } else if (
            moment(this.doctrines[i].edittime).format("dddd") == "Sunday"
          ) {
            this.doctrines[i].edittime = moment(
              this.doctrines[i].edittime
            ).format(" วันอาทิตย์ DD-MM-YY A");
          }
          //bookmarks เก็บไอดีของหลักธรรมและค่าbookmark ว่าหลักธรรมนี้ user ได้เซฟเก็บไว้ไหม
          // console.log(doc)
          if (this.$store.getters.UserIsLoggedIn) {
            IsFav = await this.$http
              .get("/user/" + id + "/CheckFav/" + doc)
              .then((res) => {
                // console.log(res.data.result)
                // IsFav = res.data.result
                return res.data.result;
              });
            this.doctrines[i]["fav"] = IsFav;
            this.forceRerender();
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      });

    await this.onbeforeunload();
  },
  methods: {
    ViewDoctrine(doctrineid, namespace, key) {
      countapi.hit(namespace, key);
      this.$router.push({
        name: "UserDetailDoctrine",
        params: { id: doctrineid },
      });
    },
    forceRerender() {
      this.componentKey += 1;
    },
    //เปลี่ยน value ใน bookmark
    clickBookmarks(doctrine) {
      console.log(doctrine);
      if (localStorage.getItem("user_id")) {
        var id = localStorage.getItem("user_id");
        var index = -1;
        if (doctrine.fav == false) {
          this.$http.post(
            "/user/" + id + "/AddFavouriteDoctrine/" + doctrine._id
          );
          this.doctrines.find(function(item, i) {
            if (item._id === doctrine._id) {
              index = i;
              return i;
            }
          });
          console.log(index);
          this.doctrines[index].fav = true;
          this.forceRerender();
        } else {
          this.$http.post(
            "/user/" + id + "/RemoveFavouriteDoctrine/" + doctrine._id
          );
          this.doctrines.find(function(item, i) {
            if (item._id === doctrine._id) {
              index = i;
              return i;
            }
          });
          console.log(index);
          this.doctrines[index].fav = false;
          this.forceRerender();
        }
      } else {
        console.log("hiuhui");
      }
    },
    onbeforeunload() {
      window.scrollTo(0, 0);
    },
    // แบ่งหน้าแสดงข้อมูล
    split_data(data) {
      console.log(data);
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
};
</script>

<style>
.header {
  text-align: center;
  margin-top: 3%;
}
.header h1 {
  font-weight: bold;
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
.notfound {
  text-align: center;
  font-size: 2.5em;
  font-weight: bolder;
  color: #4d4d4d;
}
.v-slide-group__content {
  justify-content: center;
}
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
