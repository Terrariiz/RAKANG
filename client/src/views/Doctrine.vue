<template>

    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <!-- <h1>Doctrine</h1>        -->
        <br>
     <v-container class="container-news">
       <v-chip-group
        v-model="selectedCategory"
        active-class="primary--text"
        mandatory>
        <h5 style="padding: 7px 0px 0px 0px;">หมวดหมู่ : </h5>
        <v-chip 
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </v-chip>
       </v-chip-group>
       <div>
         <v-text-field class="search-doctrine" style="width:30%;" prepend-inner-icon="mdi-magnify" v-model="search" label="ค้นหาหัวข้อ"></v-text-field>
       </div>
       <p class="notfound" v-if="filteredList.length == 0 && search !== ''">ไม่พบ "{{search}}"</p>
       <p class="notfound" v-if="filteredList.length == 0 && search == ''">ไม่มีเนื้อหาในส่วนนี้</p>
        <!-- อันใหม่ -->
          <div class="containerx">
            <v-row >
              <v-col v-for="(doctrine) in filteredList " :key="doctrine.title" cols="12" md="4" sm="12">
                <div  class="cardx">
                  
                  <img @click="ViewDoctrine(doctrine._id)"  :src="'http://localhost:4000/image/doctrine/' + doctrine.image">
                  <div @click="ViewDoctrine(doctrine._id)" class="panelx">
                     <!-- ปุ่ม bookmark -->
           
                    <h3>
                     {{ doctrine.title }}
                    </h3>
                    <v-list-item three-line>
                      <v-list-item-content  >
                        <v-list-item-subtitle v-html="doctrine.content">
                        {{ doctrine.content }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <span class="datex">{{ doctrine.edittime }}</span>
                    <p>
                     {{ doctrine.categories }}
                    </p>
                    
                    
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
          </div>
       <!-- อันใหม่ -->
        <!-- <v-card class="margin-card" v-for="(doctrine) in filteredList " :key="doctrine.title" elevation="5" outlined shaped >
        <v-row class="row-news">
          <v-col cols="12" md="6">
            
            <v-img
            :src="'http://localhost:4000/image/doctrine/' + doctrine.image"
            class="img-fluid"
            style=""
            align="center"
          >
          </v-img>
          </v-col>
          <v-col class="cols-detail-campaign" cols="12" md="6">
            ปุ่ม bookmark
            <div v-if="$store.getters.UserIsLoggedIn">
            <v-btn
              icon
              color="pink"
              v-if="doctrine.fav"
              @click="clickBookmarks(doctrine)"
            >
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
            <v-btn
              icon
              v-else
              @click="clickBookmarks(doctrine)"
              
            >
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
            </div>
            <v-container>
                <h1>{{ doctrine.title }}  </h1>
              <div>{{doctrines.content}}</div>
              <div >
                <v-row>
                  <v-col style="text-align:left;" cols="12" md="6">
                    <div>วันที่โพสต์ {{ doctrine.edittime }}</div>
                    <div>หมวดหมู่ {{ doctrine.categories }}</div>
                  </v-col>
                </v-row>
              </div>
              <div class="btn-news">
                <v-btn block style="background-color: #ffdd94; color:#455054;" 
                @click="ViewDoctrines(doctrine._id)"
                elevation="3">
                ดูเนื้อหา</v-btn>
              </div>
            </v-container>
          </v-col>
        </v-row>
        </v-card> -->
      </v-container>
      <component-to-re-render :key="componentKey" />
      <div>
        <Footer></Footer>
      </div>
    </div>
    
</template>

<script>
import moment from "moment";
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'Doctrine',
    components:{
        Navbar,
        Footer
    },
    data() {
    return {
      componentKey: 0,
      doctrines : [],
      token: null,
      search: '',
      selectedCategory: 'ทั้งหมด',
      categories:['ทั้งหมด','บทสวดมนต์','หลักธรรม คำสอน','คติสอนใจ','พุทธประวัติ','อื่นๆ']
    };
  },
  computed: {
    filteredList() {
      var newlist = this.doctrines.filter(doctrine => {
        var result
        if(this.selectedCategory == 'ทั้งหมด'){
          result = doctrine.title.toLowerCase().includes(this.search.toLowerCase())
          return result
        } else{
          result = doctrine.categories.includes(this.selectedCategory)
          if(this.search == ''){
            return result
          } else{
            if(result == true){
              result = doctrine.title.toLowerCase().includes(this.search.toLowerCase())
              return result
            }
          }
        }
      })
      // this.checkfav(newlist)
      return newlist
    }
  },
  created: async function created() {
    var IsFav
    this.token = localStorage.getItem("user_token")
    if(this.$store.getters.UserIsLoggedIn){
      var id = localStorage.getItem("user_id")
    }
    await this.$http.get("/doctrine/ShowListDoctrine")
      .then(async (res) => {
        console.log(res.data);
        this.doctrines = res.data;
        // this.doctrines.sort(function(a, b){
        //     return new Date(b.edittime) - new Date(a.edittime);
        // });
        var i = 0;
        var doc
        for (i; i<this.doctrines.length; i++) {
          doc = this.doctrines[i]._id
          if(moment(this.doctrines[i].edittime).format('dddd') == 'Mondey'){
                this.doctrines[i].edittime = moment(this.doctrines[i].edittime).format(" วันจันทร์ DD-MM-YY A");
              } else if(moment(this.doctrines[i].edittime).format('dddd') == 'Tuesday'){
                this.doctrines[i].edittime = moment(this.doctrines[i].edittime).format(" วันอังคาร DD-MM-YY A");
              } else if(moment(this.doctrines[i].edittime).format('dddd') == 'Wednesday'){
                this.doctrines[i].edittime = moment(this.doctrines[i].edittime).format(" วันพุธ DD-MM-YY A");
              } else if(moment(this.doctrines[i].edittime).format('dddd') == 'Thursday'){
                this.doctrines[i].edittime = moment(this.doctrines[i].edittime).format(" วันพฤหัสบดี DD-MM-YY A");
              } else if(moment(this.doctrines[i].edittime).format('dddd') == 'Friday'){
                this.doctrines[i].edittime = moment(this.doctrines[i].edittime).format(" วันศุกร์ DD-MM-YY A");
              } else if(moment(this.doctrines[i].edittime).format('dddd') == 'Saturday'){
                this.doctrines[i].edittime = moment(this.doctrines[i].edittime).format(" วันเสาร์ DD-MM-YY A");
              } else if(moment(this.doctrines[i].edittime).format('dddd') == 'Sunday'){
                this.doctrines[i].edittime = moment(this.doctrines[i].edittime).format(" วันอาทิตย์ DD-MM-YY A");
              }
          //bookmarks เก็บไอดีของหลักธรรมและค่าbookmark ว่าหลักธรรมนี้ user ได้เซฟเก็บไว้ไหม
          console.log(doc)
          if(this.$store.getters.UserIsLoggedIn){
            IsFav = await this.$http.get("/user/"+id+"/CheckFav/"+doc).then((res) => {
              console.log(res.data.result)
              // IsFav = res.data.result
              return res.data.result
            })
            this.doctrines[i]["fav"] = IsFav;
            this.forceRerender()
          } 
          
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    ViewDoctrine(doctrineid){
      this.$router.push({
        name: "UserDetailDoctrine",
        params: {id:doctrineid}
      })
    },
    forceRerender() {
      this.componentKey += 1;
    },
    //เปลี่ยน value ใน bookmark
    clickBookmarks(doctrine){
      console.log(doctrine)
      if(localStorage.getItem("user_id")){
        var id = localStorage.getItem("user_id")
        var index = -1
          if(doctrine.fav == false){
            this.$http.post("/user/"+id+"/AddFavouriteDoctrine/"+doctrine._id)
            this.doctrines.find(function(item, i){
            if(item._id === doctrine._id){
              index = i;
              return i;
            }
            });
            console.log(index)
            this.doctrines[index].fav = true
            this.forceRerender()
          } else{
            this.$http.post("/user/"+id+"/RemoveFavouriteDoctrine/"+doctrine._id)
            this.doctrines.find(function(item, i){
            if(item._id === doctrine._id){
              index = i;
              return i;
            }
            });
            console.log(index)
            this.doctrines[index].fav = false
            this.forceRerender()
        }
      } else {
        console.log("hiuhui")
      }
    }
  },
  
 
}
</script>

<style >
.btn-bookmark{
  position: absolute;
  right: 5%;
  top:3%;
}
/* อันใหม่ */
.containerx{
	width: 80%;
	margin: 0 auto;
}
.titlex {
    text-align: center;
    margin: 50px 0;
}
.titlex h5{
	color: var(--primary-color);
	text-transform: uppercase;
}
.column-cardx{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.cardx{
  cursor: pointer;

}
.cardx:hover{
	box-shadow: 0 0 20px 0px rgb(0,0,0,0.2);
}
.cardx img{
    width: 100%;
    height: 300px;
}
.panelx{
	padding: 5%;
	box-shadow: 0px 6px 18px -8px rgba(118,130,183,1);
	border-radius: 10px;
  height: 250px;
  
}
span.datex {
    font-weight: 700;
}
/* อันใหม่ */
.notfound{
  text-align: center;
  font-size: 2.5em;
  font-weight: bolder;
  color: #4d4d4d;
}
.v-slide-group__content{
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