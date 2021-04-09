<template>
    <div>   
      <div class="containerx">
        <v-row>
          <v-col cols="12" md="4" sm="12">
            <div class="cardx">
              <img src="https://github.com/sonangrai/designWEB/blob/master/Components/Cards/blogcard/img/b1.png?raw=true">
              <div class="panelx">
                <span class="datex">26th</span>
                <p>
                  I enjoy turning complex problems into simple, beautiful and intuitive designs.
                </p>
                <span class="breakerx"></span>
                <h3>
                  Lorem ipsum dolor sit amet
                </h3>
                <a href="#!">Know <i class="fa fa-long-arrow-right"></i></a>
              </div>
            </div>
          </v-col>
          
        </v-row>
      </div>
    </div>
</template>


<script>

</script>
<style scoped>

.containerx{
	width: 80%;
	margin: 0 auto;
}
.titlex {
    text-align: center;
    margin: 50px 0;
}
.titlex h5{
	color: var(--primary-color);
	text-transform: uppercase;
}
.column-cardx{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
/* .cardx{
	width: 30%;
} */
.cardx img{
    width: 100%;
}
.panelx{
	padding: 5%;
	box-shadow: 0px 6px 18px -8px rgba(118,130,183,1);
	border-radius: 10px;
}
</style>