<template>
    <div >
        <!-- <div>
            <Navbar></Navbar>
        </div> -->
        <!-- <h1>test</h1>
        <v-container class="con">
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name2</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
          <div class="image-box">
            <div class="contents">
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" width="250px" height="350px">
                <div class="content-txtx">
                  <h2>Name3</h2>
                  <h5> afffafsdadadawd</h5>
                </div>
            </div>
          </div>
        </v-container> -->
      <v-container>
        <v-row class="rows"  style="background-color:rgb(68,68,68,.4);">
          <v-col class="name-picture" cols="12" md="4" sm="12">
            <div class="image-profile">
              <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg">
            </div>
            <hr>
            <div class="name">
              <h3>pitpagon chinanupagon</h3>
              <div>แต้มบุญ: </div>
              <v-btn >แก้ไข</v-btn>
            </div>
             <div class="selectboxs">
              <div class="setting-proflie2">
                 <v-select
                 v-model="selected"
                :items="items"
                label="Solo field"
                solo
                @change="onChange()"
                ></v-select>
              </div>
              
            </div>
          </v-col>
          
          <v-col class="setting-proflie" cols="12" md="4" sm="12">
            <div class="selectboxs">
              <div>
                 <v-select
                 v-model="selected"
                :items="items"
                label="Solo field"
                solo
                @change="onChange()"
                ></v-select>
              </div>
              
            </div>
            
          </v-col>
          <!-- โปรไฟล์ -->
          <v-col  v-if="selected == 'โปรไฟล์'" class="details-profile" cols="12" md="8" sm="12">
            <v-container>
               <v-card-text><div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                          <h6 class="text-muted f-w-400">
                           dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">วัน/เดือน/ปีเกิด</p>
                          <h6 class="text-muted f-w-400">dd</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Point</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>

                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>

                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Rank</p>
                          <h6 class="text-muted f-w-400">
                            dd
                          </h6>
                        </div>
                        
                      </div></v-card-text>
            </v-container>
          </v-col>

          <!-- ประวัติการบริจาค -->
           <v-col v-else-if="selected == 'ประวัติการบริจาค'"  class="table-profile" cols="12" md="8" sm="12">
            <v-container>
               <table class="table">
                <thead>
                  <tr>
                    <th>ชื่อแคมเปญ</th>
                    <th>จำนวนเงิน(บาท)</th>
                    <th>วัน-เดือน-ปี</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="ชื่อแคมเปญ">name</td>
                    <td data-label="จำนวนเงิน(บาท)">name</td>
                    <td data-label="วัน-เดือน-ปี">name</td>
                  </tr>
                </tbody>
               </table>
            </v-container>
          </v-col>
          
          <!-- bookmark -->
          <v-col v-else-if="selected == 'บุ๊คมาค'"  class="table-profile" cols="12" md="8" sm="12">
            <v-container>
               <div class="block latestPostBlock">
      <v-container>
        <h2 class="text-center">ข่าว</h2>
        <v-row>
          <v-col v-for="news in news" :key="news.id" cols="12" md="4">
            <v-card
     
      max-width="344"
      outlined
    >
     <v-img  class="mx-auto" :src="news.src"></v-img>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
           {{ news.name }}
          </div>
          <v-list-item-title class="headline mb-1">
            {{news.subtitle}}
          </v-list-item-title>
          <v-list-item-subtitle>{{ news.description }}</v-list-item-subtitle>
        </v-list-item-content>
  
      
      </v-list-item>
  
            <v-card-actions>
                      <v-btn to="" color="primary" style="margin-left:auto;" text
                        >More</v-btn
                      >
                    </v-card-actions>
          </v-card>
                </v-col>
              </v-row>
              <router-link to='/news' style="float:right; margin-bottom:3%"
                >แสดงทั้งหมด <i class="fa fa-chevron-right" aria-hidden="true"></i
                ><i class="fa fa-chevron-right" aria-hidden="true"></i
              ></router-link>
            </v-container>
          </div>

          
            </v-container>
          </v-col>
          <!-- bookmark -->

        
           
            
          
          
          
        </v-row>
      
      </v-container>
    </div>
</template>

<script>
// const Navbar = () => import('@/components/navbar/navbar')

export default {
    name : "test",
   
    components:{
        // Navbar,
        
    },
    methods: {
      onChange() {
        console.log(this.selected);
      }
    },
    
      data: () => ({
      items: ['โปรไฟล์', 'ประวัติการบริจาค', 'บุ๊คมาค', 'Buzz'],
      selected: 'โปรไฟล์',
      news: [
        {
          id: 1,
          name: "No.1",
          title: "Top western road trips",
          subtitle: "1,000 miles of wonder",
          description:
            "His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.",
          src: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
        },
        {
          id: 2,
          name: "No.2",
          title: "Christmas tales to read",
          subtitle: "2,000 miles of wonder",
          description:
            "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
          src: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
        },
        {
          id: 3,
          name: "No.3",
          title: "20 movies not to miss in 2020",
          subtitle: "3,000 miles of wonder",
          description:
            "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
          src: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
        },
      ],
      
    }),
    };
 


</script>

<style scoped>
  /* *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  } */
/* .con{
  
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  width: 1000px;
}
.image-box{
  position: relative;
  display: inline-block;
  width: 250px;
  height: 350px;
  margin: 15px;
  border-radius: 40px;
  box-shadow: 5px 5px 5px rgba(68, 68, 68,.6),
              5px 5px 5px 3px rgba(68, 68, 68,.6);
}
.image-box::before{
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 251, 251, 0.4);
  transform: skew(-35deg);
  transform-origin: top left;
  transform: translate(350px,0);
  transition: 3s linear;
  z-index: 3;
}
.image-box:hover::before{
  transform: translate(-350px,0);
}
.image-box:hover img{
  transform: scale(1.3);
  overflow: hidden;
}
.contents .content-textx{
  position: absolute;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100px;
  background: rgb(220, 20, 60);
  padding-top: 10px;
  text-align: center;
  color: white;
  transition: .3s cubic-bezier(.52,-0.30,.45,1.6);
  text-transform: uppercase;
  z-index: 4;
}
.image-box:hover .contents .content-textx{
  height: 65%;
}
.contents img{
  position: relative;
  display: inline;
  transition: 2s ease;
  z-index: -1;
} */

.image-profile{
  
  /* padding: 100px 200px; */
  /* height: 100px;
  width: 200px; */
  display: flex;
  align-items: center;
}
.name-picture{
  background-color: cornflowerblue;
  align-items: center;
  justify-content: center;
  border: black solid 0.8px;
  padding: 50px 50px;
  height: 80vh; 
  
}
.setting-proflie{
  display: none;
  margin-top: 3%;
  /* border: black solid 0.8px; */
}
.details-profile{
  /* border: black solid 0.8px; */
  height: 80vh;
  overflow-y: scroll;
}


/* ประวัติการบริจาค */
.table{
  width: 100%;
  border-collapse: collapse;
}
.table thead{
  background-color: #ee2828;
}
.table thead tr th{
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.35px;
  color:#ffffff;
  opacity: 1;
  padding: 12px;
  vertical-align: top;
  border:1px solid #dee2e685;
}
.table tbody tr td{
  font-size: 14px;
  letter-spacing: 0.35px;
  font-weight: normal;
  color: #f1f1f1;
  background-color: #3c3f44;
  padding: 8px;
  text-align: left;
  border: 1px solid #dee2e685;
}
.mx-auto{
      height:200px;

}
@media (max-width:768px){
  .details-profile{
  
  max-height:auto;
  
}
.setting-proflie2{
  display: none;
}
  .setting-proflie{
  display: block;
  margin-top: 3%;
  
}
  .table thead{
    display: none;
  }
  .table, .table tbody,.table tr,.table td{
    display: block;
    width: 100%;
  }
  .table tr{
    margin-bottom:15px;
  }
  .table tbody tr td{
    text-align: right;
    padding-left: 50%;
    position: relative;
  }
  .table td:before{
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: 600;
    font-size: 14px;
    text-align: left;
  }
}
/* ประวัติการบริจาค */
</style>
