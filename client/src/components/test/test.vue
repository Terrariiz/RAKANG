<template>
  <div class="home">
    <!-- <h1>HOMEPAGE</h1> -->
  <div>
      <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      fade
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">

       <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ><v-btn style="margin:1%;" xsmall href="">Detail</v-btn><br><v-btn style="margin:1%;" xsmall href="">Donate</v-btn></b-carousel-slide>

       <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1><v-btn style="margin:1%;" xsmall href="">Detail</v-btn><br><v-btn style="margin:1%;" xsmall href="">Donate</v-btn>
      </b-carousel-slide>
      
       <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <!-- <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >

          
        </template>
      </b-carousel-slide> -->
      <!-- <v-btn style="background-color:red; margin-top:40%;">xaXxXAX</v-btn> -->

      
      
      
    </b-carousel>
    
  </div>


  <v-container>
            <h1 style="text-align:center;">ข่าว</h1>
        <v-container>
          <a  style=" color:blue; float:right;   margin-right:3%;" href="/login">แสดงทั้งหมด>>>></a>
           <v-container class="fill-height"  fluid  style="min-height: 434px; "  >
             
             
              <v-fade-transition mode="out-in">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-card>
                      <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="title">
                        งานวัด 1
                      </v-card-title>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card>
                      <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="title">
                        งานวัด 2
                      </v-card-title>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card>
                      <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="title">
                        งานวัด 3
                      </v-card-title>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card>
                      <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="title">
                        งานวัด 4
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-container>    
           
               
        </v-container>  
        
  </v-container>



  <v-container>
            <h1 style="text-align:center;">หลักธรรม</h1>
        <v-container>
          <a  style=" color:blue; float:right;   margin-right:3%;" href="/login">แสดงทั้งหมด>>>></a>
           <v-container class="fill-height"  fluid  style="min-height: 434px; "  >
             
             
              <v-fade-transition mode="out-in">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-card>
                      <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="title">
                        ศีล 5
                      </v-card-title>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card>
                      <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="title">
                        ศีล 6
                      </v-card-title>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card>
                      <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="title">
                        ศีล 7
                      </v-card-title>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card>
                      <v-img
                        src="https://picsum.photos/350/165?random"
                        max-height="125"
                        class="grey darken-4"
                      ></v-img>
                      <v-card-title class="title">
                        ศีล 8
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-container>    
           
               
        </v-container>  
        
  </v-container>


      

  </div>

  


  
</template>

<script>

export default {
  name: 'Home',

  

}


</script>
