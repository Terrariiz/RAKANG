<template>
    <v-dialog v-model="show" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">จำนวนเงิน</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-item-group v-model="amounts" mandatory>
                    <v-row>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                            <v-hover
                                v-slot="{ hover }"
                                close-delay="200"
                            >
                                <v-card
                                    :elevation="hover ? 16 : 2"
                                    :class="{ 'on-hover': hover }"
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(50)"
                                >
                                    <v-card-text  class="font-weight-medium mt-12 text-center subtitle-1">
                                        50 บาท
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                            <v-hover
                                v-slot="{ hover }"
                                close-delay="200"
                            >
                                <v-card
                                    :elevation="hover ? 16 : 2"
                                    :class="{ 'on-hover': hover }"
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(100)"
                                >
                                    <v-card-text  class="font-weight-medium mt-12 text-center subtitle-1">
                                        100 บาท
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                            <v-hover
                                v-slot="{ hover }"
                                close-delay="200"
                            >
                                <v-card
                                    :elevation="hover ? 16 : 2"
                                    :class="{ 'on-hover': hover }"
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(300)"
                                >
                                    <v-card-text   class="font-weight-medium mt-12 text-center subtitle-1">
                                        300 บาท
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                            <v-hover
                                v-slot="{ hover }"
                                close-delay="200"
                            >
                                <v-card
                                    :elevation="hover ? 16 : 2"
                                    :class="{ 'on-hover': hover }"
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(500)"
                                >
                                    <v-card-text   class="font-weight-medium mt-12 text-center subtitle-1">
                                        500 บาท
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                            <v-hover
                                v-slot="{ hover }"
                                close-delay="200"
                            >
                                <v-card
                                    :elevation="hover ? 16 : 2"
                                    :class="{ 'on-hover': hover }"
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(1000)"
                                >
                                    <v-card-text   class="font-weight-medium mt-12 text-center subtitle-1">
                                        1,000 บาท
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                            <v-hover
                                v-slot="{ hover }"
                                close-delay="200"
                            >
                                <v-card
                                    :elevation="hover ? 16 : 2"
                                    :class="{ 'on-hover': hover }"
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(amounts2)"
                                >
                                    <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
                                        <h5>ระบุจำนวน</h5>
                                        <v-text-field
                                            v-model="amounts2"
                                            type="number"
                                            min="1"
                                            @keyup="onClick2(amounts2)"
                                            :rules="amountsRules"
                                            outlined
                                        ></v-text-field>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-item-group>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="cancel"> ปิด </v-btn>
                <v-btn color="green darken-1" text :disabled="!valid" @click="pay"> ถัดไป </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "dialogDonate",
    props: ['visible'],
    data(){
        return {
            amounts: null,
            amounts2: null,
            valid: false,
            amountsRules:[
                v => v >= 0
            ],
        }
    },
    computed: {
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            },
        }
    },
    methods: {
        pay(){
            console.log(this.amounts)
            localStorage.setItem("top-up-amount", this.amounts*100);
            var t = localStorage.getItem("top-up-amount")
            t = t/100
            console.log(t)
            // this.$router.push({ name: 'payment' })
        },
        cancel(){
            this.amounts = null
            this.amounts2 = null
            this.valid = false
            this.show = false
        },
        onClick(v){
            console.log("v : " + v)
            this.amounts = v
            console.log("this.amounts : " + this.amounts)
            if(this.valid == false){
                this.valid = !this.valid
            }
        },
        onClick2(v){
            this.amounts = v
        },
    },
}
</script>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>