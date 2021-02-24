<template>
<div>
  
   <div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-link">Link</button>
</div>

<div class="buttons">
  <button class="button is-info">Info</button>
  <button class="button is-success">Success</button>
  <button class="button is-warning">Warning</button>
  <button class="button is-danger">Danger</button>
</div>
    
 
</div>
</template>
<script>

import moment from "moment";
export default {
    name:'Campaign',
    components:{
        
    },
    data (){
      return {
        campaign: null,
        tab: null,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
    mounted: function(){
      this.getData()
    },
    
    methods: {
        getData(){
            var that = this;
            this.$http.get("/campaign/DetailCampaign/"+this.$route.params.id)
            .then((res) => {
              console.log(res.data)
              that.campaign = res.data;
              console.log(that.campaign)
              that.campaign.date = moment(that.campaign.date).format(" dddd DD-MM-YY  A");
            })
            .catch(function(err){
              console.log(err)
            })
        },
    }
}
</script>

<style>
.project-header{
  background-color: #fff8ec;
}
.project-content{
    padding-right: 40px;
    
}
.image .-fullwidth{
  width: 100%;
}
.image{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}
.img-responsive{
  display: block;
  max-width: 100%;
  height: auto;
}
img{
  vertical-align: middle;
  border: 0;
}
.fund-raising{
    border-radius: 6px;
    background-clip: padding-box;
    color: #666;
    border: 1px solid #f3d9ab;
    background-color: #fff;
    z-index: 999;
}
.fund-raising .body{
   padding: 30px 25px 0  25px;
}
.fund-raising .action{
   padding: 30px 25px 30px 25px;
}

#picturenews{
    /* margin-top: 10%; */
    /* margin-bottom: 10%; */
    height:70% ;
    width: 70% ;
}

/* previewsimage */

 .base-image-input {
  display: block;
  width: 300px;
  height: 300px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 20px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #E0E0E0;
}
.file-input {
  display: none;
}
#grid-container{
    display: grid;
    /* background-color: white; */
    padding: 10px;
    grid-template-columns: auto 10% 10% auto;
    grid-column-gap: 10%;
}
.headname{
  width:30%;
 
}
.details{
  width:40%;
}
@media(max-width: 767px){
    .project-content {
    padding-right: 0;
  }
 
}
@media(max-width: 321px){
    
 .base-image-input {
  
  width: 100px;
  height: 100px;
  }
  .placeholder{
    font-size: 10px;
  }
  .headname{
  width:100%;
  margin-left: auto;
  margin-right: auto;
}
.details{
  width:100%;
}
}


</style>