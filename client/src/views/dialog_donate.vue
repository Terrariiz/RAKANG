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
                                <v-card
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(50,'1')"
                                >
                                    <v-card-text id="1" style="height: 150px" class="borderCard font-weight-medium mt-12 text-center subtitle-1">
                                        <h5 class="amount">50 บาท</h5>
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                                <v-card
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(100,'2')"
                                >
                                    <v-card-text id="2" style="height: 150px" class="borderCard font-weight-medium mt-12 text-center subtitle-1">
                                        <h5 class="amount">100 บาท</h5>
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                                <v-card
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(300,'3')"
                                >
                                    <v-card-text id="3" style="height: 150px" class="borderCard font-weight-medium mt-12 text-center subtitle-1">
                                        <h5 class="amount">300 บาท</h5>
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                                <v-card
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(500,'4')"
                                >
                                    <v-card-text id="4" style="height: 150px" class="borderCard font-weight-medium mt-12 text-center subtitle-1">
                                        <h5 class="amount">500 บาท</h5>
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                                <v-card
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(1000,'5')"
                                >
                                    <v-card-text id="5" style="height: 150px" class="borderCard font-weight-medium mt-12 text-center subtitle-1">
                                        <h5 class="amount">1,000 บาท</h5>
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>

                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-item>
                                <v-card
                                    class="mx-auto"
                                    height="auto"
                                    max-width="350"
                                    @click="onClick(amounts2,'6')"
                                >
                                    <v-card-text id="6" style="height: 150px" class="borderCard font-weight-medium mt-12 text-center subtitle-1">
                                        <h5>ระบุจำนวน</h5>
                                        <v-text-field
                                            v-model="amounts2"
                                            type="number"
                                            onkeypress="return event.charCode >= 48"
                                            min="1"
                                            id="6"
                                            @keyup="onPress(amounts2,'6')"
                                            outlined
                                        ></v-text-field>
                                        <!-- onkeypress="return event.charCode >= 48" ทำให้พิมพ์ได้แค่ตัวที่มีค่าแอสกี้มากกว่าหรือเท่ากับ 48 -->
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-item-group>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="cancel"> ปิด </v-btn>
                <v-btn color="green darken-1" text type='submit' :disabled="!valid" @click="pay(amounts)"> ถัดไป </v-btn>
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
            beforeId: null,
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
        //cancel() เป็น ฟังก์ชั่นของปุ่มปิด
        //การทำงาน รีเซตค่าของตัวแปรทั้งหมดให้กลับเป็นเหมือนเดิม
        //ตรง if คือเช็คว่าถ้าเรากดเลือกราคาไว้ก่อนจะมากดปิดจะทำการลบคลาส selected ก่อนและเพิ่มคลาส borderCard ให้กับปุ่มราคาที่เคยถูกเลือก
        cancel(){
            if(this.beforeId == null){
                this.amounts = null
                this.amounts2 = null
                this.valid = false
                this.show = false
            } else{
                this.amounts = null
                this.amounts2 = null
                this.valid = false
                var element = document.getElementById(this.beforeId)
                element.classList.remove("selected")
                element.classList.add("borderCard")
                this.beforeId = null
                this.show = false
            }
        },
        //onClick() เป็น ฟังก์ชั่นเลือกราคา
        //เช็คก่อนว่าเคยเลือกราคามาก่อนหรือไม่ ถ้าเคยเลือกจะคืนค่าให้ช่องราคาที่เคยเลือกกลับเป็นเหมือนเดิม
        //และเปลี่ยนช่องราคาใหม่ที่เราเลือกเป็นรูปแบบที่เลือกแล้ว
        //ในฟังก์ชั่นนี้ยังมีการเช็คค่าของ amounts ด้วยว่าเป็นค่า null หรือ "" ถ้าเป็นจะไม่สามารถกดปุ่มถัดไปได้
        onClick(amount,elementId){
            var element = document.getElementById(elementId);
            if(this.beforeId == null){
                this.amounts = amount
                element.classList.remove("borderCard")
                element.classList.add("selected");
                this.beforeId = elementId
                if(this.amounts !== null){
                    this.valid = true
                } else {
                    this.valid = false
                }
            } else{
                this.amounts = amount
                var element2 = document.getElementById(this.beforeId)
                element2.classList.remove("selected");
                element2.classList.add("borderCard")
                element.classList.remove("borderCard")
                element.classList.add("selected");
                this.beforeId = elementId
                if(this.amounts !== null && this.amounts !== ""){
                    this.valid = true
                } else {
                    if(this.amounts == null || this.amounts == ""){
                        this.valid = false
                    }
                }
            }
        },
        //onPress() เป็น ฟังก์ชั่นเช็คจำนวนเงินในช่องระบุจำนวนเงิน
        //เช็คทุกครั้งที่พิมพ์จำนวนเงินจะทำฟังก์ชั่นนี้
        onPress(amount,elementId){
            if(amount == 0){
                this.valid = false
            } else {
                var element = document.getElementById(elementId)
                var element2 = document.getElementById(this.beforeId)
                element2.classList.remove("selected");
                element2.classList.add("borderCard")
                element.classList.remove("borderCard")
                element.classList.add("selected");
                this.afterId = elementId
                this.amounts = amount
                if(this.amounts !== null && this.amounts !== ""){
                    this.valid = true
                } else {
                    this.valid = false
                }
            }
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
<style scoped>
.selected{
    border-style: solid;
    border-color: #f58851;
    background-color: #f5885156;
    color: azure;
}
.borderCard{
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.253);
}
h5.amount{
    padding-top: 37%;
}
</style>