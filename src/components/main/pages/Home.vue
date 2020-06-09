<template>
    <div id="pageWrapper">
        <loader v-if="loader"></loader>
        <section v-if="post.content" class="outer-container text-center">
            <img id="homePageLogo" :src="technomad.siteInfo.logo" alt="">
            <h1 id="homePageTitle" class="title">
                <span v-html="appTitle"></span><br><span v-html="subTitle"></span>
            </h1>
            <div class="inner-container" v-html="post.content"></div>
        </section>
    </div>
</template>
<script>

    import axios from "axios";
    import ajaxMixins from "~/mixins/ajaxMixins"
    import globalMainMixins from "~/mixins/globalMainMixins"
    import loader from "~/components/ui/loaders/Main"

    export default {
        name: 'Homepage',
        data: function () {
            return {
                initialLoad: this.$store.getters.isInitialLoad,
                documentTitle: technomad.siteInfo.name,
                loader: true,
                post: {
                    title: null,
                    content: null,
                    datePublished: null,
                    dateModified: null,
                },
                technomad: technomad
            }
        },
        components: {
            loader,
        },
        mixins: [
            globalMainMixins,
            ajaxMixins,
        ],
        computed: {
            appTitle() {
                return this.$store.getters.getAppTitle.name;
            },
            subTitle() {
                return this.$store.getters.getAppTitle.description;
            }
        },
        mounted() {
            if (this.initialLoad) {
                this.initialStuff({pageTitle: false});
            } else {
                this.loader = true;
                this.ajaxStatus = "pending";
                var path = technomad.host + "/wp-json/wp/v2/pages/" + technomad.homepage.id;
                axios.get(path)
                    .then(response => {
                        this.ajaxStuff({
                            response,
                            responseData: response.data,
                            pageTitle: false,
                        });
                    })
                    .catch(error => {
                        this.$store.dispatch('setLoaderFalse');
                        console.log("error", error);
                    });
            }
        },
        activated() {
            this.activatedStuff({pageTitle: false});
        },

    }
</script>
