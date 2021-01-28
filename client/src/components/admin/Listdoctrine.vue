<template>
  <div class='Listdoctrine'>
    <div>
      <Navbar></Navbar>
    </div>
    <br>
    <div id ='headaddnews'>
        <div class="text-center">
          
            <v-btn rounded color="primary" dark to = "/admin/Adddoctrine">เพิ่มหลักธรรม</v-btn>
  
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
              <tr  @submit.prevent="editdoctrine" v-for="doctrine in doctrines"  :key="doctrine._id">
                
                <td><center><img :src="'http://localhost:4000/uploads/' + doctrine.image" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;  margin:3%;" align="center"></center></td>
                <td>{{ doctrine.title }}</td>
                <!-- <td v-html="doctrine.content">{{ doctrine.content }}</td> -->
                <td>
                  <!-- <router-link :to="`/admin/listdoctrine/${doctrine._id}`">detail</router-link> -->
                  <!-- <router-link :to="{name : 'DetailDoctrine', params: {id:doctrine._id}}">detail</router-link> -->
                  <v-btn color="succes" @click="ViewDoctrine(doctrine._id)">View</v-btn>
                  
                  <!-- <button @click="EditDoctrine(doctrine._id)">Edit</button>
                  <button @click="DeleteDoctrine(doctrine._id)">Delete</button> -->
                  
                </td>
                <!-- <td>
                    <v-btn style="margin-left:5%;" class="ma-2"  color="purple" to = "/admin/editnews"  dark><v-icon dark>mdi-wrench</v-icon></v-btn>
                    <v-btn style="margin-left:5%;"><v-icon>{{ icons.mdiDelete }}</v-icon></v-btn>
                  dddd=dddddd`fsหหdddssss
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
  export default {
    name : "Listdoctrine",
    data (){
      return {
        doctrines : []
        }
    },
    components:{
      Navbar
    },
    mounted: async function mounted(){
      await this.$http.get("/doctrine/ShowListDoctrine")
      .then((res) => {
        console.log(res.data)
        this.doctrines = res.data;
        console.log(this.doctrines)
      })
      .catch(function(err){
        console.log(err)
      })
    },
    methods: {
      ViewDoctrine(doctrineid){
        this.$router.push({ name: 'DetailDoctrine' , params: {id : doctrineid}})
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
