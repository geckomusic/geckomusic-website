<template>
    <section id="footer_nav" :class="footer_nav_class + ' outer-container'">
        <div class="inner-container">
            <template v-for="(footerNav, index) in footerNavs">
                <nav :id="index" v-if="index.includes('footer')" class="column">
                    <template v-for="nav_item in footerNav">
                        <div :id="nav_item.slug.replace(new RegExp('/', 'g'), '')" class="link">
                            <router-link :to="nav_item.slug" active-class="active" exact v-if="internal(nav_item.slug)">{{nav_item.title}}</router-link>
                            <a :href="nav_item.slug" target="_blank" v-else>{{nav_item.title}}</a>
                        </div>
                    </template>
                </nav>
            </template>
        </div>
    </section>
</template>
<script>


    export default {
        name: "Footer", //template tag name
        data() {
            return {
                footerNavs: technomad.menus,
                copyrightYear: new Date().getFullYear(),
                siteInfo: technomad.siteInfo
            }
        },
        components: {},
        mixins: [],
        methods: {

            internal(slug){
                if(slug.indexOf("http") === 0){
                    return false;
                }else{
                    return true;
                }
            },
            getFooterMenuLength() {
                var size = 0, key;
                for (key in technomad.menus) {
                    if (technomad.menus.hasOwnProperty(key) && key.includes("footer")) size++;
                }
                return size;
            }
        },
        mounted() {


        },
        computed: {
            footer_nav_class() {
                let length = this.getFooterMenuLength();
                if (length === 1) {
                    return "one-column";
                } else if (length === 2) {
                    return "two-columns";
                } else if (length === 3) {
                    return "three-columns";
                } else if (length === 4) {
                    return "four-columns";
                } else {
                    return "";
                }
            }
        },
        watch: {
            "$route"(to, from) {
            }
        },
        created() {
        }
    }
</script>
