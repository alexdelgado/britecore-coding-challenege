<template>
    <div class="container-fluid">
        <h1 class="page__title">Commercial Property - Add Field</h1>
        <form action="#submit" @submit.prevent="validateForm">
            <div class="row field-types">
                <div class="col-sm-12 col-md-4 field-types__types">
                    <h2 class="field-types__heading">Field Types</h2>
                    <div class="form-group field-types-filter">
                        <label for="filter-types" class="col-form-label">Filter Types</label>
                        <input type="text" class="form-control field-types-filter__input" v-model="search" @focus="showClearFilter = true">
                        <div class="field-types-filter__clear" v-if="showClearFilter" @click="clearSearch()">
                            <span class="fas fa-times"></span>
                        </div>
                    </div>
                    <fieldType v-for="field in filteredFieldTypes" v-bind="field" :key="field.id" :active="isActiveFieldType(field)" @newActiveFieldType="setActiveFieldType($event)" @click="setActiveFieldType(field)"></fieldType>
                </div>
                <div class="col-sm-12 col-md-8 field-types__details">
                    <router-view></router-view>
                </div>
            </div>
            <div class="row field-actions">
                <div class="col-12 col-sm-4 field-actions__left">
                    <button type="submit" class="btn btn-teal field-actions__save-btn">Save Chanages</button>
                </div>
                <div class="col-12 col-sm-8 field-actions__right">
                    <button type="button" class="btn btn-white field-actions__cancel-btn" @click="confirmCancel">Cancel Changes</button>
                    <div class="clearfix"></div>
                    <button type="button" class="btn btn-danger field-actions__delete-btn" @click="confirmDelete">Delete Input</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import FieldType from '../components/FieldType.vue';

    const fieldTypes = [
        {
            id: 1,
            name: 'text',
            icon: 'fas fa-heading',
            heading: 'Text',
            definition: 'String of text',
            defaultDisplay: 'Free-form text input',
            url: '/lines/text'
        },
        {
            id: 2,
            name: 'number',
            icon: 'fas fa-hashtag',
            heading: 'Number',
            definition: 'Lorem ipsum dolor',
            defaultDisplay: 'Lorem ipsum dolor',
            url: '/lines/number'
        },
        {
            id: 3,
            name: 'date',
            icon: 'far fa-calendar-alt',
            heading: 'Date',
            definition: 'Standard ISO format date',
            defaultDisplay: 'Datepicker with configurable format',
            url: '/lines/date'
        },
        {
            id: 4,
            name: 'vin',
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
            isActiveFieldType(fieldType) {

                if(undefined === this.activeFieldType) {
                    return false;
                }

                return this.$route.path == fieldType.url;
            },
            setActiveFieldType(fieldType) {
                this.activeFieldType = fieldType;
            },
            validateForm() {
                this.$validator.validateAll().then((result) => {
                    console.log('validateForm', result);
                });
            },
            confirmCancel() {
                var dialog = confirm("Are you sure you want to leave, your changes won't be saved.");

                if(dialog) {
                    window.location.reload();
                }
            },
            confirmDelete() {
                var dialog = confirm("Are you sure you want to delete this item?");

                if(dialog) {
                    window.location.reload();
                }
            }
        },
        data() {
            return {
                fieldTypes,
                search: '',
                showClearFilter: false,
                activeFieldType: {},
            }
        },
    }
</script>

<style lang="scss">
    @import "~scss/_vars.scss";
    @import "~scss/_breakpoints.scss";
    @import "~scss/_buttons.scss";

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
            top: 45px;
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
                font-size: 12px;
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

        &__cancel-btn {
            @include media-breakpoint-up(sm) {
                margin-right: 30px;
            }
        }

        .btn {
            margin-bottom: 20px;
        }
    }
</style>
