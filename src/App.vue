<template>
    <div id="app_container" class="flex flexColumn">
        <component v-bind:is="header"></component>
        <main-vue></main-vue>
        <footer-vue></footer-vue>
    </div>
</template>
<script>
    import MainVue from '~/components/main/Main'
    import FooterVue from '~/components/footer/Footer'

    export default {
        name: 'App',
        components: {
            MainVue,
            FooterVue,
        },
        computed: {
            header() {
                return this.$store.getters.getHeader;
            },
            title() {
                return this.$store.state.header.appTitle;
            },
            loader() {
                return this.$store.getters.getLoaderState;
            }
        },
        watch: {
            "$route"(to, from) {
                document.body.setAttribute("data-page-slug", to.name);
            },
        },
        beforeCreate() {

        },
        beforeMount() {
            this.title;

        },
        mounted() {
            this.title;
        },


    }
</script>
