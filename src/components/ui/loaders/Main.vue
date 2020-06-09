<template>
    <div v-bind:class="[loaderClasses, 'loader']">
        <div class="ball-scale-multiple">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LoaderBallWave',
        props: ["loaderClasses"]
    }
</script>
