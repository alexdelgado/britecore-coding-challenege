<template>
    <nav class="navbar navbar-expand-lg">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav_collapse" aria-controls="nav_collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a href="/#/" class="navbar-brand" >BriteCore</a>
        <div id="nav_collapse" class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-for="navLink in navLinks" v-bind="navLink" :key="navLink.id">
                    <router-link class="nav-link" :to="navLink.url">
                        <span class="nav-link__icon" v-bind:class="navLink.icon"></span>
                        {{ navLink.label }}
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    const navLinks = [
        {
            id: 1,
            label: 'Policies',
            url: '/policies',
            icon: 'fa fa-umbrella'
        },
        {
            id: 2,
            label: 'Claims',
            url: '/claims',
            icon: 'fa fa-bolt'
        },
        {
            id: 3,
            label: 'Contacts',
            url: '/contacts',
            icon: 'fa fa-user'
        },
        {
            id: 4,
            label: 'Data',
            url: '/data',
            icon: 'fa fa-chart-bar'
        },
        {
            id: 5,
            label: 'Lines',
            url: '/lines',
            icon: 'fa fa-book'
        },
        {
            id: 6,
            label: 'All Modules',
            url: '/all-modules',
            icon: 'fa fa-crosshairs'
        }
    ]

    export default {
        name: 'mainNav',
        data () {
            return {
                navLinks,
                activeNavItem: undefined,
            }
        }
    }
</script>

<style lang="scss">
    @import "~scss/_vars.scss";

    .navbar {
        background-color: $color-teal;
    }

    .navbar-brand {
        color: $color-white;

        &:hover {
            color: $color-white;
        }
    }

    .navbar-nav {
        .nav-link {
            border-radius: 5px;
            color: $color-white;
            margin: 0 15px;
            padding: 5px 10px;

            &:hover {
                background-color: $color-teal-lighter;
                color: $color-white;
            }

            &.router-link-active {
                background-color: $color-teal-lightest;
                color: $color-white;
            }

            &__icon {
                margin-right: 5px;
            }
        }
    }
</style>
