<template>

<form id="payment-form" action="https://sandbox-cdnv3.chillpay.co/Payment/" method="post" role="form" class="form-horizontal">
<input id="test" name="CustomerId" type="hidden" value="555" >
<!-- <input id="test2" name="Amount" type="hidden" value="20000">
<input id="test3" name="MerchantCode" type="hidden" value="M031001">
<input id="test4" name="OrderNo" type="hidden" value="100">
<input id="test5" name="Currency" type="hidden" value="764">
<input id="test6" name="RouteNo" type="hidden" value="1">
<input id="test7" name="IPAddress " type="hidden" value="124.120.153.53">
<input id="test8" name="ApiKey" type="hidden" value="Z5O4ARB0wikPpsSwpjXwmeuVCdD2zVV27Sdbti9gTvYWEOiBo7s7fB6S81LZAE3I">
<input id="test7" name="ChanelCode " type="hidden" value="creditcode"> -->



<modernpay:widget id="modernpay-widget-container" 
data-merchantid="M031001" :data-amount=top data-orderno="00000001" data-customerid
data-mobileno="0889999999" data-clientip="124.120.153.53" data-routeno="1" data-currency="764" 
data-description="Test Payment" data-apikey="Z5O4ARB0wikPpsSwpjXwmeuVCdD2zVV27Sdbti9gTvYWEOiBo7s7fB6S81LZAE3I">
</modernpay:widget>
<button type="submit" id="btnSubmit" value="Submit" class="btn">Payment</button>
<button @click="shit">shit</button>
</form>



</template>

<script>
export default {
data(){
  return{
    iddd : '123',
    top : '20000'
  }
},
mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://sandbox-cdnv3.chillpay.co/js/widgets.js?v=1.00" charset="utf-8"')
      document.head.appendChild(recaptchaScript)
      const iddd = localStorage.getItem('user_id')
      // const topup = localStorage.getItem('top-up-amount')

      console.log(iddd)
      // console.log(topup*100)
      document.getElementById("test").value =  iddd;
      // document.getElementById("test2").value =  topup;

      
    },
    methods: {
      // shit(){
      //   const formData = new FormData();
      //   formData.append('MerchantCode', "M031001")
      //   formData.append('TransactionId', '27365')
      //   formData.append('CheckSum', '5470a678c7bec9493e2848e590e5dda2')
      //   // formData.append('OrderNo', this.title)
      //   // formData.append('CustomerId', this.title)
      //   // formData.append('Amount', this.title)
      //   // formData.append('PhoneNumber', this.title)
      //   // formData.append('Description', this.title)
      //   // formData.append('Currency', this.title)
      //   // formData.append('RouteNo', this.title)
      //   // formData.append('IPAddress', this.title)
      //   formData.append('APIKey', 'Z5O4ARB0wikPpsSwpjXwmeuVCdD2zVV27Sdbti9gTvYWEOiBo7s7fB6S81LZAE3I')
        
      //   let script =  this.$http.post("https://sandbox-cdnv3.chillpay.co/Payment/",formData);
      //   console.log(script)

      }
      
    }
    



</script>

<style>

</style>