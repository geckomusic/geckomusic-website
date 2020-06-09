<template>
    <main id="main_container">
        <loader-main v-bind:loader-classes="loaderClasses" v-if="loader"></loader-main>
        <transition name="fade">
            <keep-alive>
                <router-view :key="$route.fullPath"></router-view>
            </keep-alive>
        </transition>
    </main>
</template>
<script>

    import LoaderMain from '~/components/ui/loaders/Main'
    import globalMainMixins from "~/mixins/globalMainMixins"

    export default {
        name: 'MainVue',
        data(){
          return{
              loaderClasses: "loader",
          }
        },
        beforeMount() {
            if (this.$route.name) {
                document.body.setAttribute("data-page-slug", this.$route.name);
            }

        },
        mixins:[
            globalMainMixins,
        ],
        components: {
            LoaderMain,
        },
        computed:{
          loader(){
              return this.$store.getters.getLoaderState;
          }
        },
        mounted() {
        },
        created() {

        },
        updated() {

        },
        beforeCreate() {
        },

    }
</script>
