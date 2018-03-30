<template>
    <div class="row">
        <div class="col-sm-12">
            <h2 class="field-types__heading">Field Details</h2>
        </div>
        <div class="col-sm-12 col-lg-8">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <div class="form-group">
                        <label for="display-label">Display Label</label>
                        <input type="text" name="displayLabel" id="display-label" class="form-control" @keyup="generateReferenceName($event.target.value)" v-validate="'required'" :class="{'is-invalid': errors.has('displayLabel')}">
                        <span class="form-text text-muted">For display purposes, spaces allowed.</span>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6">
                    <div class="form-group">
                        <label for="reference-name">Reference Name</label>
                        <input type="text" name="referenceName" id="reference-name" class="form-control" v-model="referenceName" v-validate="'required|alpha_dash'" :class="{'is-invalid': errors.has('referenceName')}">
                        <span class="form-text text-muted">Used to reference in calculations, no spaces allowed.</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <div class="form-group">
                        <label for="default-value">Default Value</label>
                        <input type="text" name="defaultValue" id="default-value" class="form-control">
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6">&nbsp;</div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <div class="form-group">
                        <label for="custom-validation">Custom Validation</label>
                        <input type="text" name="customValidation" id="custom-validation" class="form-control" v-validate="'regex_exp'" :class="{'is-invalid': errors.has('customValidation')}">
                        <span class="form-text text-muted">Any regex pattern can be used for custom input validation.</span>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6">&nbsp;</div>
            </div>
            <div class="row field-types__tags field-type-tags">
                <div class="col-sm-12">
                    <h3 class="field-type-tags__heading">Tags</h3>
                </div>
                <div class="col-12 col-sm-6">
                    <div class="form-group">
                        <label for="field-types-tag">Tag Group</label>
                    </div>
                </div>
                <div class="col-12 col-sm-6">
                    <div class="form-group">
                        <label for="field-types-tags">Tags</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-lg-4 field-groups">
            <h3 class="field-groups__heading">Field Groups</h3>
            <p class="field-groups__byline">Choose a group for this input</p>
        </div>
    </div>
</template>

<script>
    import { Validator } from 'vee-validate';

    Validator.extend('regex_exp', {
        getMessage(field, args) {
            return 'Please enter a valid regular expression';
        },
        validate(value, args) {
            var isValid = true;

            try {
                new RegExp(value);
            } catch(e) {
                isValid = false;
            }

            return isValid;
        }
    });

    export default {
        name: 'textField',
        inject: ['$validator'],
        data () {
            return {
                name: '',
                displayLabel: '',
                referenceName: '',
            }
        },
        methods: {
            generateReferenceName(value) {
                this.referenceName = value.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-_]+/g, '');
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
