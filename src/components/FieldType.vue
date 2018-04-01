<template>
    <div class="field-type" :class="{'field-type--active': active}" @click.stop="setActive(url)">
        <h3 class="field-type__heading" slot="fieldHeading">
            <span class="field-type__icon" v-bind:class="icon"></span> {{ heading }}
        </h3>
        <div class="field-type__property">
            <div class="field-type__property-label">Definition</div>
            <div class="field-type__property-value">{{ definition }}</div>
        </div>
        <div class="field-type__property">
            <div class="field-type__property-label">Default Display</div>
            <div class="field-type__property-value">{{ defaultDisplay }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fieldType',
        props: [
            'active',
            'id',
            'name',
            'icon',
            'heading',
            'definition',
            'defaultDisplay',
            'url'
        ],
        methods: {
            getCurrentFieldType() {
                return {
                    id: this.id,
                    name: this.name,
                    icon: this.icon,
                    heading: this.heading,
                    definition: this.definition,
                    defaultDisplay: this.defaultDisplay,
                    url: this.url
                };
            },
            setActive(url) {

                // generate a new FieldType instance
                var self = this.getCurrentFieldType;

                // let parent know active field type has changed
                this.$emit('newActiveFieldType', self);

                // go to specified route
                this.$router.push(url);
            }
        }
    }
</script>

<style lang="scss">
    @import "~scss/_vars.scss";

    .field-type {
        background-color: $color-white;
        border: 1px solid $color-teal-lightest;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 30px;
        padding: 15px;

        &--active {
            background-color: $color-teal-darker;
            color: $color-white;

            .field-type {
                &__icon {
                    color: $color-sky-blue;
                }

                &__property-label {
                    color: $color-sky-blue;
                }
            }
        }

        &__icon {
            margin-right: 5px;
        }

        &__heading {
            font-size: 18px;
        }

        &__property {
            margin: 15px 0;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &__property-label {
            color: $color-teal;
            font-size: 12px;
        }

        &__property-value {
            font-size: 14px;
        }
    }
</style>
