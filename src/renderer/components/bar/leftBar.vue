<template>
    <div class="leftBar">
        <ul class="list leftBar-list">
            <li v-for="(item, index) in mainRoute" :key="index">
                <!--                <i :class="item['icon']"></i>-->
                <el-button type="primary" icon="el-icon-edit" circle class="barButton"></el-button>
            </li>
        </ul>
        <ul class="helpBar">
            <li class="list">
                <el-button type="primary" icon="el-icon-edit" circle class="barButton"></el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mainRoute} from "../../router"

    export default {
        name: "leftBar",
        props: {},
        components: {},
        data: function () {
            return {
                arr: [{title: 1}, {title: 2}]
            }
        },
        computed: {
            mainRoute() {
                return mainRoute.filter(function (item) {
                    return item["leftBar"]
                })
            }
        },
        created() {
            console.log(this)
        },
        methods: {}
    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
    .leftBar {
        width: 80px;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: blueviolet;
        .list {
            text-align: center;
        }

        &-list {
            padding: 15px 0;
            flex: 1;
            li:nth-child(1) {
                margin-top: 0;
            }

            li {
                margin: 20px 0;
            }
        }
        .helpBar{
            padding-bottom: 20px;
        }
        .barButton {
            /*width: 60%;*/
            /*height: 0;*/
            /*padding-bottom: 60%;*/
        }
    }
</style>
