<template>
  <div class='addnews'>
    <div>
      <Navbar></Navbar>
    </div>
    <br><br>
    <div id ='headaddnews'>
        <div class="text-center">
          
            <v-btn rounded color="primary" dark to = "/admin/addnews">เพิ่มข่าวประชาสัมพันธ์</v-btn>
  
            <!-- <v-btn rounded color="primary"  to = "/addnews" >Add NEWS</v-btn> -->
        </div>
    </div>
    <v-container>
      <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                 
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Editor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr   @submit.prevent="editnews" v-for="news in news"  :key="news._id">
                <td><center><img :src="news.image" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover; margin:3%;" align="center"></center></td>
                <td>{{ news.title }}</td>
                <!-- <td v-html="news.content">{{ news.content }}</td> -->
                <td>
                  <!-- <router-link :to="`/admin/listdoctrine/${doctrine._id}`">detail</router-link> -->
                  <!-- <router-link :to="{name : 'DetailDoctrine', params: {id:doctrine._id}}">detail</router-link> -->
                  <v-btn style="margin-right:3%;" @click="ViewNews(news._id)">view</v-btn>
                  <v-btn style="margin-right:3%;" @click="EditNews(news._id)">Edit</v-btn>
                  <v-btn @click="DeleteNews(news._id)">Delete</v-btn>

                </td>
                <!-- <td>{{ item.name }}</td>
                <td>
                  
                    <v-btn style="margin-left:5%; margin-top:3%; margin-bottom:3%;" class="ma-2"  color="purple" to = "/admin/editnews"  dark><v-icon dark>mdi-wrench</v-icon></v-btn>
                    <v-btn style="margin-left:5%; margin-top:3%; margin-bottom:3%;"><v-icon>{{ icons.mdiDelete }}</v-icon></v-btn>
                  
                </td> -->
                <!-- <td>{{ item.calories }}</td> -->
              </tr>
            </tbody>
          </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert2";
import {
  } from '@mdi/js'

  export default {
    name : "Listnews",
    data (){
      return {
        news : []
        }
    },
    mounted: async function mounted(){
      await this.$http.get("/news/ShowListNews")
      .then((res) => {
        console.log(res.data)
        this.news = res.data;
        console.log(this.news)
      })
      .catch(function(err){
        console.log(err)

      })
    },
    components: {
      Navbar
    },
    methods: {
      // async ViewDoctrine(doctrineid){
      //   await this.$http.get("/DetailDoctrine/"+doctrineid)
      //   .then((res)=> {

      //   })
      // }
      ViewNews(newsid){
        this.$router.push({ name: 'DetailNews' , params: {id : newsid}})
        },
      EditNews(newsid){
        console.log(newsid);
        this.$router.push({ name: 'EditNews' , params: {id : newsid}})
      },
      Refresh(newsid){
        console.log('sdfsdfsddf')
        this.news = this.news.filter(function(c){
          return c._id !== newsid
        })
      },
      DeleteNews(newsid){
        const swalWithBootstrapButtons = swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.$http.delete("/news/DeleteNews/"+newsid)
            this.$router.push({ name: 'Listnews'})
            this.Refresh(newsid)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Delete News Success.',
              'success'
            )
          } 
        })
      },
    }
    
  }

</script>

<style>
    #table{
        text-align: left;
        
    }
    #headaddnews{
        margin: 3%;
    }
    
</style>
