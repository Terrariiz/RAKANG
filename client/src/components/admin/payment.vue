<template>
  <div>
    <v-container>
      <form
        id="payment-form"
        action="https://sandbox-cdnv3.chillpay.co/Payment/"
        method="post"
        role="form"
        class="form-horizontal"
      >
        <modernpay:widget
          id="modernpay-widget-container"
          data-merchantid="M031001"
          :data-amount="top"
          data-orderno="00000001"
          :data-customerid="id"  
          data-mobileno="0889999999"
          data-clientip="124.120.153.53"
          data-routeno="1"
          data-currency="764"
          data-description="บริจาคผ่านเว็บระฆังธรรม"
          data-apikey="Z5O4ARB0wikPpsSwpjXwmeuVCdD2zVV27Sdbti9gTvYWEOiBo7s7fB6S81LZAE3I"
        >
        </modernpay:widget>
      </form>
    </v-container>
    <div>
      <center><v-btn href="/home">back to homepage</v-btn></center>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: localStorage.getItem("user_id")+"#"+localStorage.getItem("donate-campaign"),
      top: localStorage.getItem("top-up-amount"),
    };
  },
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      'https://sandbox-cdnv3.chillpay.co/js/widgets.js?v=1.00" charset="utf-8"'
    );
    document.head.appendChild(recaptchaScript);
  },
};
</script>

<style>
</style>