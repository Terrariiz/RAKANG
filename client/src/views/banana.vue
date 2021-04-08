<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="filteredList"
            :items-per-page="pagination.rowsPerPage" 
            hide-default-footer
            class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
            </template>
        </v-data-table>
        <v-pagination circle :total-visible="7" v-model="pagination.page" :length="pages"></v-pagination>
    </div>
</template>

<script>

export default {
    data(){
        return{
            pagination:{
                data: this.$store.getters.banana,
                rowsPerPage: 4,
                page: 1,
                previous_firstIndex: 0
            },
            totalNumberOfItems: this.$store.getters.banana.length,
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
            ]
        }
    },
    computed: {
        pages () {
            return this.pagination.rowsPerPage ? Math.round(this.pagination.data.length / this.pagination.rowsPerPage) : 0
        },
        filteredList() {
            var firstIndex;
            if (this.pagination.page == 1) {
                firstIndex = 0;
            } else{
                firstIndex = this.pagination.previous_firstIndex + this.pagination.rowsPerPage;
            }
            console.log(firstIndex + " firstIndex");
            this.addPreviousIndex(firstIndex);
            var showData = this.pagination.data.slice(firstIndex, firstIndex + this.pagination.rowsPerPage);
            console.log(showData);
            return showData
        }
    },
    methods: {
        addPreviousIndex(index){
            this.pagination.previous_firstIndex = index
        }
        // fetchData(){
        //     var index;
        //     this.totalNumberOfItems = this.dataset.length;
        //     if (this.pagination.page == 1) {
        //         index = 0;
        //     } else{
        //         index = this.pagination.page * this.pagination.rowsPerPage;
        //     }
        //     console.log(index + " index");
        //     this.showData = this.dataset.slice(index, index + this.pagination.rowsPerPage);
        //     console.log(this.showData);
        // },
    },
    // filters: {
    //     paginate: function(){
    //         var index;
    //         this.totalNumberOfItems = this.pagination.data.length;
    //         if (this.pagination.page == 1) {
    //             index = 0;
    //         } else{
    //             index = this.pagination.page * this.pagination.rowsPerPage;
    //         }
    //         console.log(index + " index");
    //         return this.pagination.data.slice(index, index + this.pagination.rowsPerPage);
    //     }
    // }
}
</script>

<style>

</style>