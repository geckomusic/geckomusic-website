<template>
    <section id="header_nav" class="outer-container">
        <nav class="nav navbar navbar-expand-sm bg-dark inner-container justify-content-center">
            <template v-for="nav_item in nav_items">
                <div :id="nav_item.slug.replace(new RegExp('/', 'g'), '')" class=" link nav-link">
                    <router-link
                            :to="nav_item.slug"
                            :class="nav_item.title === 'Home' ? 'homeLink' : '' "
                            active-class="active"
                            :exact="nav_item.classes.includes('exact') ? true : false"
                            v-if="internal(nav_item.slug)">
                        {{nav_item.title}}
                    </router-link>
                    <a :href="nav_item.slug" v-else>
                        {{nav_item.title}}
                    </a>
                </div>
            </template>
        </nav>
    </section>
</template>
<script>

    export default {
        name: "HeaderNavigation", //template tag name
        data: function () {
            return {
                nav_items: technomad.menus["header-menu"],
            }
        },
        methods: {
            internal(slug) {
                if (slug.indexOf("http") === 0) {
                    return false;
                } else {
                    return true;
                }
            },
        },
        mounted: function () {


        },
        computed: {
            home() {
                if (this.$route.name === "Homepage") {
                    return true;
                } else {
                    return false;
                }
            },
            initialLoad() {
                return this.$store.getters.isInitialLoad;
            }
        },
        watch: {
            "$route"(to, from) {
            }
        },
        created() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        activated() {
        },
        deactivated() {
        }
    }
</script>
