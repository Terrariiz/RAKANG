<template class="body">
  <div  >
    <!-- ข่าวล่าสุด -->
    <div class="block latestPostBlock">
      <v-container>
        <h2 class="text-center">ข่าว</h2>
        <v-row>
          <v-col v-for="news in news" :key="news.id" cols="12" md="4">
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
                <v-btn color="primary" style="margin-left:auto;" text
                  >More</v-btn
                >
              </v-card-actions>
    </v-card>
          </v-col>
        </v-row>
        <a href="/home" style="float:right; margin-bottom:3%"
          >แสดงทั้งหมด <i class="fa fa-chevron-right" aria-hidden="true"></i
          ><i class="fa fa-chevron-right" aria-hidden="true"></i
        ></a>
      </v-container>
    </div>

    <!-- text -->
     <!-- <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
     <v-img src="../../../public/image/2.jpg"></v-img>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            OVERLINE
          </div>
          <v-list-item-title class="headline mb-1">
            Headline 5
          </v-list-item-title>
          <v-list-item-subtitle>Greyjgkgkkjhkhkhkjhound divisely heกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกllo coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>
  
      
      </v-list-item>
  
      <v-card-actions>
                <v-btn color="primary" style="margin-left:auto;" text
                  >More</v-btn
                >
              </v-card-actions>
    </v-card> -->

  </div>
</template>

<script>

//  import x from "../../../public/image/2.jpg"


export default {
  name: "Home",
  data() {
    return {
      // items: [
      //   {
      //     src: require("../assets/images/tenor2.gif"),
      //   },
      //   {
      //     src: require("../assets/images/tenor3.gif"),
      //   },
      //   {
      //     src: require("../assets/images/tenor4.gif"),
      //   },
      // ],

      show: false,
      news: [
        {
          id: 1,
          name: "No.1",
          title: "Top western road trips",
          subtitle: "1,000 miles of wonder",
          description:
            "His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.",
          // src: require("../assets/images/tenor.gif"),
        },
        {
          id: 2,
          name: "No.2",
          title: "Christmas tales to read",
          subtitle: "2,000 miles of wonder",
          description:
            "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
          // src: require("../assets/images/tenor.gif"),
        },
        {
          id: 3,
          name: "No.3",
          title: "20 movies not to miss in 2020",
          subtitle: "3,000 miles of wonder",
          description:
            "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
          // src: require("../assets/images/tenor.gif"),
        },
      ],
    };
  },
  components: {
   
  },
};
  
</script>

<style>

</style>