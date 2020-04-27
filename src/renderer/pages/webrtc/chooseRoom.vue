<template>
    <div class="chooseRoom">
        <el-form :form="form" ref="form" class="form">
            <label-filed>
                <label>roomId</label>
                <f-input></f-input>
            </label-filed>
        </el-form>
    </div>
</template>

<script>
    import {fInput, labelFiled} from "../../components/input";

    export default {
        name: "chooseRoom",
        components: {
            fInput,
            labelFiled
        },
        data: function () {
            return {
                form: {
                    roomId: null,
                    nickName: ''
                }
            }
        },
        methods: {},
        created() {

        },
        mounted() {

        }

    }
</script>

<style scoped lang="scss" type="text/scss" >
    .chooseRoom{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .form{
            background-color: red;
        }
    }
</style>
