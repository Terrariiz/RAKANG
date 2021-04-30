<template>
    <div>   
      <div>
      <Navbar></Navbar>
    </div>
    <br><br>
    <div id ='headaddnews'>
        <div class="text-center">
            <v-btn rounded color="primary" dark to = "/admin/additems">เพิ่มของรางวัล</v-btn>
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
                 Date
                </th>
                <th class="text-left">
                 Amount
                </th>
                <th class="text-left">
                  Editor
                </th>
              </tr>
            </thead>
            <tbody>
                <tr  v-for="item in items"  :key="item._id">  
                <!-- :src="'http://localhost:4000/image/campaign/' + campaign.image" -->
                <td><center><img  class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;  margin:3%;" align="center"></center></td> 
                <td>
                    <!-- {{ campaign.name }} -->
                </td>
                <td>
                    <!-- {{ campaign.date }} -->
                </td>
                <td>
                    <!-- {{ campaign.amount }} -->
                </td>
                
                <td>
                  <v-btn style="margin-right:3%;" @click="Viewitem(item._id)">view</v-btn>
                  <v-btn style="margin-right:3%;" @click="ViewLogitem(item._id)">Log</v-btn>
                  <v-btn style="margin-right:3%;" @click="Edititem(item._id)">Edit</v-btn>
                  <v-btn @click="Deleteitem(item._id)">Delete</v-btn>
                </td>
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
export default {
    name : "Listitems",
     data (){
      return {
        items : []
        }
    },
     mounted: async function mounted(){
      await this.$http.get("/exchangeitem/ShowListItem")
      .then((res) => {
      this.items = res.data;
       })
      .catch(function(err){
        console.log(err)
      })
    },
    components: {
      Navbar
    },
    methods: {
      Viewitem(itemsid){
        this.$router.push({ name: 'Detailitems' , params: {id : itemsid}})
        },
        // ViewLogitem(itemsid){
        // this.$router.push({ name: 'LogDonate' , params: {id : itemsid}})
        // },
        Edititem(itemsid){
        this.$router.push({ name: 'Edititems' , params: {id : itemsid}})
      },
      Deleteitem(itemsid){
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
            this.$http.delete("/exchangeitem/DeleteItem"+itemsid)
            console.log("delete")
            this.$router.push({ name: 'Listitems'})
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Delete Campaign Success.',
              'success'
            )
          } 
        })
      },
      }
}
</script>
<style scoped>
  #table{
        text-align: left;
        
    }
    #headaddnews{
        margin: 3%;
    }
    
</style>