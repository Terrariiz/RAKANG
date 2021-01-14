<template>
  <div class='addnews'>
    <div>
      <Navbar></Navbar>
    </div>
    <h1>This is addnews page.</h1>
    <div id ='headaddnews'>
        <div class="text-center">
          
            <v-btn rounded color="primary" dark to = "/admin/addnews">Add NEWS</v-btn>
  
            <!-- <v-btn rounded color="primary"  to = "/addnews" >Add NEWS</v-btn> -->
        </div>
    </div>
    <v-container>
      <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Editor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr   @submit.prevent="editnews" v-for="news in doctrines"  :key="news._id">
                <td><center><img :src="'http://localhost:4000/uploads/' + news.image" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover; margin:3%;" align="center"></center></td>
                <td>{{ news.title }}</td>
                <td>{{ news.content }}</td>
                <td>
                  <!-- <router-link :to="`/admin/listdoctrine/${doctrine._id}`">detail</router-link> -->
                  <!-- <router-link :to="{name : 'DetailDoctrine', params: {id:doctrine._id}}">detail</router-link> -->
                  <button @click="ViewDoctrine(news._id)">view</button>
                  
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
const Navbar = () => import('@/components/navbar/admin_navbar')
import {
  } from '@mdi/js'

  export default {
    name : "Listnews",
    data (){
      return {
        doctrines : []
        }
    },
    mounted: async function mounted(){
      await this.$http.get("/news/ShowListNews")
      .then((res) => {
        console.log(res.data)
        this.doctrines = res.data;
        console.log(this.doctrines)
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
      ViewDoctrine(doctrineid){
        this.$router.push({ name: 'DetailNews' , params: {id : doctrineid}})
          
        }
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
