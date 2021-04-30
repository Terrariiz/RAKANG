<template>
    <div>
        <h1>Dashboard</h1>
        <v-row>
            <v-col cols="12" md="6" sm="12">
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-card-title>ปู่ลูฟี่</v-card-title>
                    <apexchart  type="bar" :options="options" :series="series"></apexchart>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-card-title>ปู่ลูฟี่</v-card-title>
                    <apexchart  type="bar" :options="options" :series="series"></apexchart>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-card-title>ปู่ลูฟี่</v-card-title>
                    <apexchart  type="line" :options="options" :series="series"></apexchart>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-card-title>ปู่ลูฟี่</v-card-title>
                    <apexchart  type="line" :options="options" :series="series"></apexchart>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    title:{
                        text:'ปี'
                    },
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                },
                yaxis: {
                    title:{
                        text:'ยอดขาย(ล้านบาท)'
                    },
                }
            },
            series: [{
                name: 'ยอดขาย(ล้านบาท)',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }]
        }
    },
}
</script>

<style>

</style>