<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "App",
        created() {
            this.$router.push('/')
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
    html,body{
        height: 100%;
    }
    #app{
        height: 100%;
    }
</style>
