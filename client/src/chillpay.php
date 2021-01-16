<?php
$curl = curl_init();
curl_setopt_array($curl, array(
CURLOPT_URL => "https://sandbox-appsrv2.chillpay.co/api/v2/Payment/",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "POST",
CURLOPT_POSTFIELDS =>
"MerchantCode=M031001&ApiKey=Z5O4ARB0wikPpsSwpjXwmeuVCdD2zVV27Sdbti9gTvYWEOiBo7s7fB6S81LZAE3I&TransactionId=10078&CheckSum=9c1939c1fd2841fd7c2483df8f36be80",
CURLOPT_HTTPHEADER => array(
"cache-control: no-cache",
"content-type: application/x-www-form-urlencoded"
),
));
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
if ($err) {
echo "cURL Error #:" . $err;
} else {
echo $response;
}
?>