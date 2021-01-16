<template>

<form id="payment-form" action="https://sandbox-cdnv3.chillpay.co/Payment/" method="post" role="form" class="form-horizontal">
<modernpay:widget id="modernpay-widget-container" 
data-merchantid="M031001" data-amount="10000" data-orderno="00000001" data-customerid="123456" 
data-mobileno="0889999999" data-clientip="124.120.153.53" data-routeno="1" data-currency="764" 
data-description="Test Payment" data-apikey="Z5O4ARB0wikPpsSwpjXwmeuVCdD2zVV27Sdbti9gTvYWEOiBo7s7fB6S81LZAE3I">
</modernpay:widget>
<button type="submit" id="btnSubmit" value="Submit" class="btn">Payment</button>
</form>

</template>

<script>
export default {

mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://sandbox-cdnv3.chillpay.co/js/widgets.js?v=1.00" charset="utf-8"')
      document.head.appendChild(recaptchaScript)
    },

}
</script>

<style>

</style>