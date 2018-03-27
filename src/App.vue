<template>
    <div id="app" class="page">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import MainNav from './components/MainNav.vue';

    export default {
        name: 'app',
        data () {
            return {
                pageTitle: 'Commercial Property - Add Field',
                name: ''
            }
        },
        components: {
            navbar: MainNav,
        },
    }
</script>

<style lang="scss">
    @import "~scss/_vars.scss";

    body {
        background-color: $color-cyan-lightest;
    }

    .page {
        &__title {
            margin: 45px 0;
        }
    }
</style>
