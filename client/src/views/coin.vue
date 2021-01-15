<template>
    <div class="coin">
        <div>
        <Navbar></Navbar>
    </div>
        <!-- <h1>coin</h1> -->
        <v-container style="background-color:green; margin-top:3%;">
            <h1 style="text-align:center;">Coin</h1>
            <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <v-hover
        v-slot="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
          to = "/detailcoin"
        >
          <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
            50 บาท
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-hover
        v-slot="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
          to = "/detailcoin"
        >
          <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
            100 บาท
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-hover
        v-slot="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
          to = "/detailcoin"
        >
          <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
            150 บาท
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-hover
        v-slot="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
          to = "/detailcoin"
        >
          <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
           300 บาท
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-hover
        v-slot="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
          to = "/detailcoin"
        >
          <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
            500 บาท
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-hover
        v-slot="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
          to = "/detailcoin"
        >
          <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
            1000 บาท
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  
        </v-container>
    </div>
</template>
<script>
const Navbar = () => import('@/components/navbar/user_navbar')
export default {
    
    
    components:{
        Navbar
    },
    data: () => ({
      icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
      items: [
        {
          title: 'New Releases',
          text: `It's New Release Friday`,
          subtext: 'Newly released songs. Updated daily.',
          img: 'http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg',
        },
        {
          title: 'Rock',
          text: 'Greatest Rock Hits',
          subtext: 'Lose yourself in rock tunes.',
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        },
        {
          title: 'Mellow Moods',
          text: 'Ambient Bass',
          subtext: 'Chill beats to mellow you out.',
          img: 'http://lorempixel.com/output/abstract-q-c-640-480-6.jpg',
        },
      ],
      transparent: 'rgba(255, 255, 255, 0)',
    }),
}
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>