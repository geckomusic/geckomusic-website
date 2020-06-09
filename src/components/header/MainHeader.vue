<template>
    <header id="main_header">
        <component v-bind:is="navigationComponent"></component>
        <transition name="pageTitle">
            <h1 id="page_title" class="inner-container" v-html="pageTitle" v-if="pageTitle" :key="pageTitle"></h1>
        </transition>
    </header>
</template>
<script>


    export default {
        name: 'MainHeader',
        data() {
            return {
                title: "",
            }
        },
        computed: {
            pageTitle() {
                this.title = this.$store.getters.getPageTitle;
                if (this.title !== null) {
                    return this.$store.getters.getPageTitle;
                }

            },
            navigationComponent() {
                return this.$store.getters.getNavigationComponent;
            },
        }
    }
</script>
