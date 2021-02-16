<template>
    <v-dialog v-model="show" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">จำนวนเงิน</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-item-group>
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
                                    @click="amounts=50"
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
                                    @click="amounts=100"
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
                                    @click="amounts=300"
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
                                    @click="amounts=500"
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
                                    @click="amounts=1000"
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
                                    @click="amounts=amounts2"
                                >
                                    <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
                                        <h5>ระบุจำนวน</h5>
                                        <v-text-field
                                            v-model="amounts2"
                                            type="number"
                                            min="1"
                                            @keyup="amounts=amounts2"
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
                <v-btn color="green darken-1" text type='submit' @click="pay(amounts)"> ถัดไป </v-btn>
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
        pay(amount){
            localStorage.setItem("top-up-amount", amount*100);
            localStorage.setItem("donate-campaign", this.$route.params.id);
            this.$router.push({ name: 'payment' })
        },
        cancel(){
            this.amounts = null
            this.amounts2 = null
            this.show = false
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