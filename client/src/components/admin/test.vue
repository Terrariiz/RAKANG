<template>
  <div  class='test'>
     <div>
      <Navbar></Navbar>
    </div>
    <h1 style="text-align:center;">This is test page.</h1>
    <!-- <div class="base-image-input">
    <span class="placeholder">Choose an Image</span>
    <input type="file">
  </div> -->

  <div
    class="base-image-input"
    :style="{ 'background-image': `url(${imageData})` }"
    @click="chooseImage"
  >
    <span
      v-if="!imageData"
      class="placeholder"
    >
      Choose an Image
    </span>
    <input
      class="file-input"
      ref="fileInput"
      type="file"
      @input="onSelectFile"
    >
  </div>
    
    
  </div>
</template>

<script>


const Navbar = () => import('@/components/navbar/visitor_navbar')
export default {
    

    // data: () => ({
    //     valid: true,
    //     name: '',
    //     nameRules: [
    //       v => !!v || 'Name is required',
    //       v => (v && v.length <= 12) || 'Name must be less than 12 characters',
    //     ],
    //     password: '',
    //     passwordRules: [
    //       v => !!v || 'Password is required',
    //       v => (v && v.length <= 12) || 'Password must be less than 12 characters',
    //     ],
    //     checkbox: false,
    // }),
    data() {
    return {
        imageData:null,
          }

  },
  components:{
        Navbar
    },

    methods: {

    chooseImage () {
        this.$refs.fileInput.click()
    },
    onSelectFile () {
        const input = this.$refs.fileInput
  const files = input.files
  if (files && files[0]) {
    const reader = new FileReader
    reader.onload = e => {
      this.imageData = e.target.result
    }
    reader.readAsDataURL(files[0])
    this.$emit('input', files[0])
  }
    },
    }
    
}


</script>

<style>
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
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
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #E0E0E0;
}
.file-input {
  display: none;
}
</style>