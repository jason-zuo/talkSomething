<template>
    <div class="mainContainer">
        <left-bar></left-bar>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import leftBar from "../components/bar";
    export default {
        name: "mainContainer",
        components: {
            leftBar
        },
        created() {

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
    .mainContainer {
        width: 100%;
        height: 100%;
        display: flex;
        .main{
            flex: 1;
            position: relative;
            background-color: aliceblue;
        }
    }
</style>
