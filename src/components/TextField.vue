<template>
    <b-row>
        <b-col sm="12">
            <h2 class="field-types__heading">Field Details</h2>
        </b-col>
        <b-col sm="12" lg="8">
            <b-row>
                <b-col sm="12" lg="6">
                    <b-form-group id="display-label-group"
                        description="For display purposes, spaces allowed"
                        label="Display Label"
                        label-for="display-label">
                        <input type="text" id="display-label"
                            class="form-control"
                            @keyup="generateReferenceName($event.target.value)">
                    </b-form-group>
                </b-col>
                <b-col sm="12" lg="6">
                    <b-form-group id="reference-name-group"
                        description="Used to reference in calculations, no spaces allowed"
                        label="Reference Name"
                        label-for="reference-name">
                        <b-form-input id="reference-name" v-model="referenceName"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" lg="6">
                    <b-form-group id="default-value-group"
                        description=""
                        label="Default Value"
                        label-for="default-value">
                        <b-form-input id="default-value"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col sm="12" lg="6">&nbsp;</b-col>
            </b-row>
            <b-row>
                <b-col sm="12" lg="6">
                    <b-form-group id="custom-validation-group"
                        description="Any regex pattern can be used for custom input validation"
                        label="Custom Validation"
                        label-for="custom-validation">
                        <b-form-input id="custom-validation"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col sm="12" lg="6">&nbsp;</b-col>
            </b-row>
            <b-row class="field-types__tags field-type-tags">
                <b-col sm="12">
                    <h3 class="field-type-tags__heading">Tags</h3>
                </b-col>
                <b-col sm="12" lg="6">
                    <b-form-group id="field-types-tag-group"
                        description=""
                        label="Tag Group"
                        label-for="field-types-tag">
                    </b-form-group>
                </b-col>
                <b-col sm="12" lg="6">
                    <b-form-group id="field-types-tags-group"
                        description="Select a tag group to see individual tags"
                        label="Tags"
                        label-for="field-types-tags">
                    </b-form-group>
                </b-col>
            </b-row>
        </b-col>
        <b-col sm="12" lg="4" class="field-groups">
            <h3 class="field-groups__heading">Field Groups</h3>
            <p class="field-groups__byline">Choose a group for this input</p>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: 'textField',
        data () {
            return {
                name: '',
                displayLabel: '',
                referenceName: '',
            }
        },
        methods: {
            generateReferenceName(value) {
                this.referenceName = value.replace(/\s/g, '-');
            }
        }
    }
</script>

<style lang="scss">
    @import "~scss/_vars.scss";

    .field-groups {
        background-color: $color-cyan-ligher;
        border: 1px solid $color-cyan;
        border-radius: 5px;
        padding: 15px;

        &__heading {
            font-size: 16px;
        }

        &__byline {
            color: $color-teal;
            font-size: 12px;
        }
    }

    .field-type-tags {
        margin-top: 50px;

        &__heading {
            font-size: 18px;
            margin-bottom: 30px;
        }
    }
</style>
