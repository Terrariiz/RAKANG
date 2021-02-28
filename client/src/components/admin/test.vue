<template>
<div>
  
   <!-- ข่าวล่าสุด -->
    <div class="block latestPostBlock">
      <v-container>
        <h2 class="text-center">ข่าว</h2>
        <v-row>
          <v-col  cols="12" md="4">
            <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
     <v-img :src="news.src"></v-img>
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
           <v-col  cols="12" md="4">
            <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
     <v-img :src="news.src"></v-img>
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
           <v-col  cols="12" md="4">
            <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
     <v-img :src="news.src"></v-img>
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
    
 
</div>
</template>
<script>
// import a from "/RAKANG/client/src/assets/images/tenor.gif"
export default {
  
  data() {
    return {
     
      news: [
        {
          id: 1,
          name: "No.1",
          title: "Top western road trips",
          subtitle: "1,000 miles of wonder",
          description:
            "His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.",
          src: require("/RAKANG/client/src/assets/images/tenor.gif"),
        },
        {
          id: 2,
          name: "No.2",
          title: "Christmas tales to read",
          subtitle: "2,000 miles of wonder",
          description:
            "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
          src: require("/RAKANG/client/src/assets/images/tenor.gif"),
        },
        {
          id: 3,
          name: "No.3",
          title: "20 movies not to miss in 2020",
          subtitle: "3,000 miles of wonder",
          description:
            "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
          src: require("/RAKANG/client/src/assets/images/tenor.gif"),
        },
      ],
    };
  },
  
};
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