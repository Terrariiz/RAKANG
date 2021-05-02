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
                 Amount
                </th>
                <th class="text-left">
                  Editor
                </th>
              </tr>
            </thead>
            <tbody>
                <tr  v-for="item in items"  :key="item._id">  
                <td><center><img :src="item.galleryimage[0].image" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;  margin:3%;" align="center"></center></td> 
                <td>
                    {{ item.name }}
                </td>
                <td>
                    {{ item.remain }}
                </td>
                <td>
                  <v-row>
                      <v-col class="ml-auto" md="12" sm="6" >
                        <div>
                          <span>
                            <v-btn style="margin:3%;position: relative;" @click="Viewitem(item._id)">view</v-btn>
                          </span>
                          <span>
                            <!-- <a :href="'/admin/Detailitems/'+item._id" class="notification">
                              <span>ORDER</span>
                              <span v-if="item.waitingorder.length > 0" class="badge">{{item.waitingorder.length}}</span>
                            </a> -->
                            <v-btn class="noti" style="margin:3%;" @click="ViewLogitem(item._id)">order <span v-if="item.waitingorder.length > 0" class="badge">{{item.waitingorder.length}}</span></v-btn>
                          </span>
                          <span>
                            <v-btn style="margin:3%;" @click="Edititem(item._id)">Edit</v-btn>
                          </span>
                          <span>
                            <v-btn @click="Deleteitem(item._id)">Delete</v-btn>
                          </span>
                        </div>
                      </v-col>
                  </v-row>
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
        ViewLogitem(itemsid){
        this.$router.push({ name: 'Detailitems' , params: {id : itemsid}})
        },
        Edititem(itemsid){
        this.$router.push({ name: 'Edititems' , params: {id : itemsid}})
      },
      Refresh(itemsid){
        console.log('sdfsdfsddf')
        this.items = this.items.filter(function(c){
          return c._id !== itemsid
        })
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
            this.$http.delete("/exchangeitem/DeleteItem/"+itemsid)
            console.log("delete")
            this.$router.push({ name: 'Listitems'})
            this.Refresh(itemsid)
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
.notification {
  background-color: white;
  color: #555;
  text-decoration: none;
  padding: 8px 20px;
  position: relative;
  display: inline-block;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.notification:hover {
  background: rgba(133, 133, 133, 0.233);
}

.notification .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  color: white;
}
.noti .badge {
  position: absolute;
  top: -15px;
  right: -25px;
  padding: 5px 5px;
  border-radius: 50%;
  background: red;
  color: white;
}
.noti {
  display: relative;
}
  #table{
        text-align: left;
        
    }
    #headaddnews{
        margin: 3%;
    }
    
</style>