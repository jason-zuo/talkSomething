<template>
    <input
            class="fInput"
            v-model="value"
            :type="type"
            @focus="onFocus"
            @blur="onBlur"/>
</template>

<script>
    export default {
        name: "fInput",
        props: {
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            }
        },
        data: function () {
            return {}
        },
        methods: {
            onFocus: function() {

            },
            onBlur: function() {

            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
    .fInput{

    }
</style>
