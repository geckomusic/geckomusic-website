<template>
    <section id="pageWrapper" class="outer-container single-post blog">
        <loader v-if="loader"></loader>
        <div class="post-time inner-container text-center" v-if="post.datePublished">
            <span class="date-published">
                {{ new Date(post.datePublished).toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}}
            </span>
            <span class="data-modified" v-if="post.dateModified && checkDateVsModified(post.datePublished, post.dateModified)">
                <br>{{checkDateVsModified(post.datePublished, post.dateModified)}}
            </span>
        </div>
        <div id="single-post" class="blog-post post inner-container" v-html="post.content"></div>
    </section>
</template>
<script>
    import axios from "axios"
    import ajaxMixins from "~/mixins/ajaxMixins"
    import globalMainMixins from "~/mixins/globalMainMixins"
    import loader from "~/components/ui/loaders/Main"

    export default {
        name: 'Post',
        data() {
            return {
                postPromise: null,
                initialLoad: this.$store.getters.isInitialLoad,
                loader: true,
                title: null,
                post: {
                    title: null,
                    content: "",
                    datePublished: null,
                    dateModified: null,
                },
                documentTitle: technomad.siteInfo.name,
            }
        },
        components: {
            loader
        },
        mixins: [
            globalMainMixins,
            ajaxMixins
        ],
        methods: {},
        computed: {
            slug() {
                return this.$route.params.slug;
            },

        },
        watch: {},
        beforeMount() {
        },
        mounted() {
            if (this.initialLoad) {
                this.initialStuff();
            } else {
                this.loader = true;
                this.ajaxStatus = "pending";
                var host = technomad.host;
                var path = host + "/wp-json/wp/v2/posts?slug=" + this.$route.params.slug;
                axios.get(path)
                    .then(response => {
                        this.ajaxStuff({
                            response,
                            responseData: response.data[0]});
                    })
                    .catch(error => {
                        console.log("error", error);
                        this.$store.dispatch('setLoaderFalse');
                    });

            }
        },
        activated() {
            this.activatedStuff();
        }
    }
</script>
