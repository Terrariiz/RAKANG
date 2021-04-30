<template>
    <div>
        <div>
        <Navbar></Navbar>
        </div>
        <!-- <h1>News</h1>
        <h1>Doctrine</h1>        -->
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
       <p class="notfound" v-if="filteredList.length == 0 && search !== ''">ไม่พบ "{{search.trim()}}"</p>
       <p class="notfound" v-if="filteredList.length == 0 && search == ''">ไม่มีเนื้อหาในส่วนนี้</p>
        <!-- อันใหม่ -->
          <div class="containerx">
            <v-row >
              <v-col v-for="(news) in filteredListx " :key="news.title" cols="12" md="4" sm="12">
                <div @click="ViewNews(news._id)" class="cardx">
                  
                  <img  :src="'http://localhost:4000/image/new/' + news.image">
                  <div class="panelx">
                     <!-- ปุ่ม bookmark -->
            
                    <v-list-item three-line class="title-font-size">
                      
                        
                     {{ news.title }}
                    
                      
                    </v-list-item>
                     <v-list-item three-line>
                      <v-list-item-content  >
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
            <v-pagination circle :total-visible="7"  v-model="pagination.page" :length="pages"></v-pagination>
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
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import('@/components/navbar/navbar')
export default {
    name:'News',
    components:{
        Navbar,
        Footer
    },
    data() {
    return {
      news : [],
      search: '',
      selectedCategory: 'ทั้งหมด',
      categories:['ทั้งหมด','วัด','โรงพยาบาล','มูลนิธิ','ประชาสัมพันธ์ของเว็บไซค์','อื่นๆ'],
      pagination:{
                data: null,
                rowsPerPage: 6,
                page: 1,
            },
    };
  },
  computed: {
    filteredList() {
      return this.news.filter(news => {
        var result
        if(this.selectedCategory == 'ทั้งหมด'){
          result = news.title.toLowerCase().replace(/\s/g, '').includes(this.search.toLowerCase().trim().replace(/\s/g, ''))
          return result
        } else{
          result = news.categories.includes(this.selectedCategory)
          if(this.search == ''){
            return result
          } else{
            if(result == true){
              result = news.title.toLowerCase().replace(/\s/g, '').includes(this.search.toLowerCase().trim().replace(/\s/g, ''))
              return result
            }
          }
        }
      })
    },
    // เปลี่ยนหน้า 
    pages () {
            return this.pagination.rowsPerPage ? Math.ceil(this.news.length / this.pagination.rowsPerPage) : 0
        },
        filteredListx() {
            var firstIndex;
            if (this.pagination.page == 1) {
                firstIndex = 0;
            } else{
                firstIndex = (this.pagination.page-1) * this.pagination.rowsPerPage;
            }
            console.log(firstIndex + " firstIndex");
            var showData = this.news.slice(firstIndex, firstIndex + this.pagination.rowsPerPage);
            console.log(showData);
            return showData
        },
        // เปลี่ยนหน้า 
  },
  mounted: async function mounted() {
    await this.$http.get("/news/ShowListNews")
      .then((res) => {
        console.log(res.data);
        this.news = res.data;
        this.news.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });
        var i = 0;
        for (this.news[i]; i<this.news.length; i++) {
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
      await this.onbeforeunload()
  },
  methods: {
    ViewNews(newsid){
      this.$router.push({
        name: "UserDetailNews",
        params: {id:newsid}
      })
    }
  },
  if(result){
    console.log(result)
  },
  onbeforeunload() {
  window.scrollTo(0, 0);
  }
}
</script>

<style>
.title-font-size{
  font-size: 21px;
}
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