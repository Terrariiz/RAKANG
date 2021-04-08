<template>
  <div class="text-xs-center">
    <v-pagination
      v-model="page"
      :length="lastPage"
      :total-visible="8"
      circle
    ></v-pagination>
  </div>
</template>

<script>
export default {
    data(){
        return {
            page: 1
        }
    },
    computed: {
        lastPage:{
            get(){
                return Math.round(this.$store.getters.banana.length/4);
            }
        },
    },
}
</script>

<style>

</style>