<template>
    <footer>
        <footer-navigation></footer-navigation>
    </footer>
</template>
<script>
    import FooterNavigation from "~/components/nav/FooterNavigation"
    export default {
        name: 'Footer',
        components: {
            FooterNavigation
        },
    }
</script>

<style>
    footer {
        flex-shrink: 0;
    }
</style>
