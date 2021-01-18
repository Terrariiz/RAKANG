<template>
    <div class="EditCampaign" >
        <div>
            <Navbar></Navbar>
        </div>
         <v-form
         @submit.prevent="Editcampaign">
        <v-container id ='rounded' style="background-color: #F09C0B;">
            <center><h1>Edit Campaign</h1></center>
            <v-container class="my-5">
                <v-layout row wrap >
                    
                        <v-flex xs12 md6 >
                            <v-container v-model = "campaign.image"  >
                                <!-- <v-file-input v-model="doctrine.image" label="File input" filled prepend-icon="mdi-camera"></v-file-input> -->
                                <input type="file"  @change="onFileSelected">

                                <!-- <v-btn @click="reset" style="weihgt = 40%" color="red" dark>Clear</v-btn> -->
                                <p>*if don't submit new picture we just use previous picture</p>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                                <!-- <h1 style="color:black;">หัวข้อเรื่อง</h1> -->
                                <center><v-text-field v-model="campaign.name" style="width:70%; text-align: center;" label="ชื่อแคมเปญ"></v-text-field></center>
                                <br><br>
                                <center><v-text-field v-model="campaign.date" type="date" style="width:70%;" label="วันสิ้นสุดแคมเปญ"></v-text-field></center>
                                <br><br>
                                 <center><v-text-field v-model="campaign.amount" style="width:70%;" label="ยอดสุทธิ"></v-text-field></center>
                                <br><br>
                                <v-container id ="detailnews" style="background-color: white ; margin-right:3%;">
                                    <v-container fluid>
                                        <v-textarea v-model="campaign.content" name="input-7-1" filledlabel="Label" label="รายละเอียด" auto-grow></v-textarea>
                                    </v-container>
                                    <!-- <v-btn small style="text-align: right;" rounded color="primary" dark  >Add detailnews</v-btn> -->
                                
                                </v-container>
                                
                        </v-flex>
                    
                </v-layout>
            </v-container>
                <div id="grid-container">
                    <div></div>
                    <v-btn style="weihgt = 40%" color="primary" dark>cancle</v-btn>
                    <v-btn  type ='submit' color="primary" dark>submit</v-btn>
                    <div></div>  
                </div>

            <!-- <v-btn style="margin-right= 50%;" color="primary" dark>cancle</v-btn> 
                <v-btn style="margin-left= 50%;" color="primary" dark>submit</v-btn> -->
        </v-container>
        </v-form>      
    </div>
</template>

<style >
#detailnews{
    text-align: left;
    border-radius:30px;
    box-shadow: 7px 7px 4px ;
}
#picturenews{
    margin-top: 10%;
    margin-bottom: 10%;
    height:70% ;
    width: 70% ;
}
#rounded{
    border-radius:30px;
    
}
#grid-container{
    display: grid;
    /* background-color: white; */
    padding: 10px;
    grid-template-columns: auto 10% 10% auto;
    grid-column-gap: 10%;
}
</style>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert";
export default {
    name : "EditCampaign",

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },

    data(){
        return{
            campaign: {
                name: "",
                content: "",
                image: null,
                imagepath: "" ,
                newimage: null,
                oldimage: "",
                date: "",
                amount: "",
            },
            editorConfig: {
                    // The configuration of the editor.
                }
        }
    },
     components:{
            Navbar
        },
    mounted: function(){
        this.getData()
    },
    methods: {
    async Editcampaign(){
        try {
            var formData = new FormData();
            formData.append('name', this.campaign.title)
            formData.append('content', this.campaign.content)
            formData.append('date', this.campaign.date)
            formData.append('amount', this.campaign.amount)
            
            if(this.campaign.newimage == null){
                console.log('true')
                formData.append('imagepath', this.campaign.image)
                formData.append('oldimage', this.campaign.image)
                console.log('true')
            }else {
                console.log('else')
                formData.append('image', this.campaign.newimage)
                formData.append('imagepath', this.campaign.newimage.name)
                formData.append('oldimage', this.campaign.oldimage)
                console.log('else')
            }
            
            console.log('formData')
            console.log(formData)
            console.log(this.campaign.title)
            console.log(this.campaign.content)
            console.log(this.campaign.image)
            console.log(this.campaign.image.name)
            console.log(this.campaign.imagepath)
            await this.$http.put("/campaign/DetailCampaign/"+this.$route.params.id+"/edit/", formData)
            .then(() => {
                this.$router.push({ name: 'DetailCampaign' , params: {id : this.$route.params.id}})
            })
            .catch(function(err){
                console.log(err)
            })
           
            
        } catch (err) {
            let error = err.response;
            if (error.status == 409) {
            swal("Error", error.data.message, "error");
            console.log('success')
            } else {
            swal("Error", error.data.err.message, "error");
            console.log('error')
            }
        }
            },
    async onFileSelected(event){
            this.campaign.newimage = event.target.files[0]
        },
    async getData(){
        var that = this;
        await this.$http.get("/campaign/DetailCampaign/"+this.$route.params.id)
        .then((res) => {
        console.log(res.data)
        that.campaign = res.data;
        that.campaign.oldimage = res.data.image;
        console.log(that.campaign)
      })
        .catch(function(err){
        console.log(err)
        })
    },
    // reset(){
    //     this.$refs.myFileInput.value = null;
    //     this.doctrine.newimage = null;
    // }
    },
}
</script>
