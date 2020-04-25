<template>
    <div class="mainContainer">
        <left-bar></left-bar>
        <div>
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
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
    .mainContainer {
        width: 100%;
        height: 100%;
    }
</style>
