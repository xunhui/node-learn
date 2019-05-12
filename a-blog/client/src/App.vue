<template>
    <div>
        {{ word }}
    </div>
</template>

<script>
export default {
    data () {
        return {
            word: 'I am root vue component'
        }
    }
}
</script>

<style>
    div {
        color: orange;
    }
</style>
