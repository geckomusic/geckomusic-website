<template>
    <section id="pageWrapper" class="outer-container posts">
        <loader v-if="loader"></loader>
        <div class="inner-container" id="posts">
            <article v-for="(post,index) in posts" class="post">
                <router-link
                        :to="{
                            name: 'Post',
                            params:{
                                slug: post.slug,
                            }
                        }" active-class="active">
                    <div class="img-container" v-if="initialLoad" v-html="post.img"></div>
                    <div class="img-container" v-else>
                        <template v-if="post._embedded['wp:featuredmedia']">
                            <img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url"
                                 alt="">
                        </template>
                    </div>
                    <div class="post-time">
                        <span class="date">
                            {{ new Date(post.date).toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}}
                        </span>
                        <span class="update" v-if="post.modified && checkDateVsModified(post.date, post.modified)">
                             &bull; {{checkDateVsModified(post.date, post.modified)}}
                        </span>
                    </div>
                    <h2 class="post-name" v-html="post.title.rendered"></h2>
                    <p v-html="post.excerpt.rendered" v-if="technomad.archives.blog.excerpt"></p>
                    <p v-html="post.content.rendered" v-else></p>
                </router-link>
            </article>
        </div>
    </section>
</template>
<script>

    import axios from "axios"
    import ajaxMixins from "~/mixins/ajaxMixins"
    import globalMainMixins from "~/mixins/globalMainMixins"
    import loader from "~/components/ui/loaders/Main"
    import paginationMixins from "~/mixins/paginationMixins";


    export default {
        name: 'Posts',
        props: {},
        data() {
            return {
                initialLoad: this.$store.getters.isInitialLoad,
                posts: true,
                post_id: "",
                content: "",
                title: "Blog",
                documentTitle: technomad.siteInfo.name,
                loader: true,
                totalPages: 0,
                totalPosts: 0,
                technomad: technomad
            }
        },
        mixins: [
            globalMainMixins,
            paginationMixins,
            ajaxMixins
        ],
        components: {
            loader
        },
        methods: {},
        mounted() {
            if (this.initialLoad) {
                this.initialStuff({
                    title:technomad.archives.blog.title
                });
            } else {
                this.loader = true;
                this.ajaxStatus = "pending";
                /**
                 * concatenating the ajax url
                 **/
                let host = technomad.host;
                let endpoint = "/wp-json/wp/v2/posts?";
                let postsPerPage = "per_page=" + technomad.archives.blog.postsPerPage;
                let path = host + endpoint + postsPerPage + "&_embed";
                axios.get(
                    path,
                    {
                        headers: {
                            'X-WP-Nonce': technomad.nonce
                        }
                    }).then(response => {
                    this.ajaxStuff({
                        response,
                        responseData: response.data,
                        title:technomad.archives.blog.title
                    })
                }).catch(error => {
                    console.log("error", error);
                });

            }
        },
        activated() {
            this.activatedStuff();
        },
    }
</script>
