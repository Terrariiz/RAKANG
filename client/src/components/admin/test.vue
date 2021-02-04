<template class="body">
  <div  >
      <div class="container">
          <div class="box">
              <div class="imgBx">
                <img src="https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/31f075317ea34da3812c31a3f124bbc9_Large.jpg">
              </div>
              <div class="content">
                  <h2>John Doe</h2>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

//  import x from "../../../public/image/2.jpg"
</script>

<style>
.body{
    /* display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100vh; */
    background-color: black;
}

.container{
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

}
.container .box{
    position: relative;
    width: 300px;
    height: 300px;
    /* display: flex; */
    margin: 40px;

}
.container .box .imgBx{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.5s ease-in-out;
    z-index: 2;
}
.container .box:hover .imgBx{
    transform:translate(-35px,-35px);
}
.container .box .imgBx img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.container .box .content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 15px;
    transition: 0.5s ease-in-out
}
.container .box:hover .content{
    transform:translate(35px,35px);
}
.container .box .content h2{
    font-size: 20px;
    color: #111;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 1px;
    text-align: center;

}

</style>