.<template>
  <form id="payment-form" action="https://sandbox-cdnv3.chillpay.co/Payment/" method="post" role="form" class="form-horizontal">
<modernpay:widget id="modernpay-widget-container" 
data-merchantid="M031001" data-amount="10000" data-orderno="00000001" data-customerid="123456" 
data-mobileno="0889999999" data-clientip="171.96.224.18" data-routeno="1" data-currency="764" 
data-description="Test Payment" data-apikey="SPYzCOFx0rDm5ZvEwG0O1T8jDZtBqq1H45pw5PUZsHopwn5vc4ThhFwMQrjQVPzz">
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