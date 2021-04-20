<template>
    <div>   
      <!-- tablist -->
    <div class="tab-section">
      <v-container style="width:75%">
         <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab>Beginner</v-tab>
      <v-tab>Bronze</v-tab>
      <v-tab>Silver</v-tab>
      <v-tab>Gold</v-tab>
      <v-tab>Platinum</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <v-card-text >aatgwfawfwfwa</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    
        
      </v-container>
  </div>
    </div>
</template>


<script>
export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            filterable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
  }
</script>
<style scoped>
.date-news{
  color: #a9a9a9;
  font-size: 13px;
}
.header{
  text-align: center;
  margin-top:3% ;
  margin-bottom: 2%;
}
h1{
  font-size: 50px;
}
h2,h4,h5{
  font-weight: 100;
}
hr{
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
}
.content-container{
  display: grid;
  grid-template-areas:'left-content right-content' ;
  width: 60%;
  margin: auto;
  grid-gap:50px;
  text-align: left;
}
.featured-article, .another-article{
  margin-top: 2%;
  margin-bottom: 2%;

}
.another-article h3, p{
  margin-bottom:10px ;
}
img{
  height:400px;
  width: 700px;
}
.read-more-btn{
  background-color: black;
  border: none;
  color: white;
  float: right;
  padding: 10px 20px 10px 20px;
}
.read-more-btn:hover{
  background-color: #a9a9a9;
}
.right-content img{
  height: 200px;
  width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
}
.topics{
  margin-bottom: 20%;
}
.topics h5{
  background-color: black;
  color: white;
  padding: 10px;
  text-align: center;
  margin-bottom: 2%;
}
@media(max-width:1299px){
  .content-container{
    grid-template-areas:'left-content''right-content' ;
    width: 70%;
    margin: auto;

  }
  hr{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2%;
  }

}
</style>