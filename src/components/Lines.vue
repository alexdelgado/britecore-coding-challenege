<template>
    <b-container fluid>
        <h1 class="page__title">Commercial Property - Add Field</h1>
        <b-form action="#submit" id="commercial-property" @submit.prevent="validateForm">
            <b-row class="field-types">
                <b-col sm="12" md="4" class="field-types__types">
                    <h2 class="field-types__heading">Field Types</h2>
                    <b-form-group id="filter-types-group"
                        class="field-types-filter"
                        label="Filter Types"
                        label-for="filter-types">
                        <input type="text"
                            class="form-control field-types-filter__input"
                            v-model="search"
                            @focus="showClearFilter = true">
                        <div class="field-types-filter__clear" v-if="showClearFilter" @click="clearSearch()">
                            <span class="fas fa-times"></span>
                        </div>
                    </b-form-group>
                    <fieldType
                        v-for="field in filteredFieldTypes"
                        v-bind="field"
                        :key="field.id"
                        :active="field.id == activeFieldType || $route.path == field.url"
                        @newActiveFieldType="activeFieldType = $event">
                    </fieldType>
                </b-col>
                <b-col sm="12" md="8" class="field-types__details">
                    <router-view></router-view>
                </b-col>
            </b-row>
            <b-row class="field-actions">
                <b-col class="field-actions__left" cols="12" sm="4">
                    <b-button type="submit" class="field-actions__save-btn" variant="primary">Save Chanages</b-button>
                </b-col>
                <b-col class="field-actions__right" cols="12" sm="8">
                    <b-button type="button" class="field-actions__cancel-btn" variant="default">Cancel Changes</b-button>
                    <div class="clearfix"></div>
                    <b-button type="button" class="field-actions__delete-btn" variant="danger">Delete Input</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
    import FieldType from '../components/FieldType.vue';

    const fieldTypes = [
        {
            id: 1,
            icon: 'fas fa-heading',
            heading: 'Text',
            definition: 'String of text',
            defaultDisplay: 'Free-form text input',
            url: '/lines/text'
        },
        {
            id: 2,
            icon: 'fas fa-hashtag',
            heading: 'Number',
            definition: 'Lorem ipsum dolor',
            defaultDisplay: 'Lorem ipsum dolor',
            url: '/lines/number'
        },
        {
            id: 3,
            icon: 'far fa-calendar-alt',
            heading: 'Date',
            definition: 'Standard ISO format date',
            defaultDisplay: 'Datepicker with configurable format',
            url: '/lines/date'
        },
        {
            id: 4,
            icon: 'fas fa-car',
            heading: 'Vin',
            definition: 'An integer representing a number',
            defaultDisplay: 'Number range input',
            url: '/lines/vin'
        },
    ];

    export default {
        name: 'lines',
        inject: ['$validator'],
        data () {
            return {
                fieldTypes,
                search: '',
                showClearFilter: false,
                activeFieldType: undefined,
            }
        },
        components: {
            fieldType: FieldType,
        },
        computed: {
            filteredFieldTypes: function() {
                var self = this;
                return this.fieldTypes.filter(function(field) {
                    return field.heading.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                });
            }
        },
        methods: {
            clearSearch() {
                this.search = '';
                this.showClearFilter = false;
            },
            validateForm() {
                this.$validator.validateAll().then((result) => {
                    console.log('validateForm', result);
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "~scss/_vars.scss";
    @import "~scss/_breakpoints.scss";

    body {
        background-color: $color-cyan-lightest;
    }

    .page {
        &__title {
            margin: 45px 0;
        }
    }

    .field-types-filter {
        position: relative;

        &__clear {
            color: $color-teal;
            cursor: pointer;
            position: absolute;
            right: 15px;
            top: 38px;
        }
    }

    .field-types {
        border: 1px solid $color-cyan;
        border-radius: 5px;
        margin: 0;

        @include media-breakpoint-up(md) {
            height: 700px;
        }

        &__heading {
            font-size: 24px;
            margin: 0 0 25px;
        }

        &__types {
            background-color: $color-cyan-ligher;
            border-right: 1px solid $color-cyan;
            height: 350px;
            overflow-y: scroll;
            padding: 30px;

            @include media-breakpoint-up(md) {
                height: auto;
            }
        }

        &__details {
            background-color: $color-white;
            padding: 30px;

            .text-muted {
                color: $color-teal !important;
            }
        }
    }

    .field-actions {
        padding: 40px 0;

        @include media-breakpoint-down(xs) {
            text-align: center;
        }

        &__right {
            @include media-breakpoint-up(sm) {
                text-align: right;
            }

            .clearfix {
                @include media-breakpoint-up(sm) {
                    display: none;
                }
            }
        }

        &__save-btn {
            background-color: $color-teal-darker;
            border-color: $color-teal-darkest;

            &:hover {
                background-color: $color-teal-lighter;
                border-color: $color-teal;
            }
        }

        &__cancel-btn {
            border: 1px solid $color-teal-lightest;
            background-color: $color-white;

            @include media-breakpoint-up(sm) {
                margin-right: 30px;
            }

            &:hover {
                background-color: $color-teal-darker;
                color: $color-white;
            }
        }

        .btn {
            margin-bottom: 20px;
        }
    }
</style>
