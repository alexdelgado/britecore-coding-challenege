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
                        <label>Tag Group</label>
                    </div>
                    <button type="button" class="btn btn-cyan" v-for="tag in tagGroups" v-bind="tag" :key="tag.id" @click.stop="generateTags(tag)">{{ tag.label }}</button>
                </div>
                <div class="col-12 col-sm-6">
                    <div class="form-group">
                        <label>Tags</label>
                    </div>
                    <div class="form-text text-muted font-italic" v-if="!tags.tags">Select a tag group to see individual tags</div>
                    <button type="button" class="btn btn-cyan" v-for="tag in tags.tags" v-bind="tag" :key="tag.id">{{ tag.label }}</button>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-lg-4 field-groups">
            <h3 class="field-groups__heading">Field Groups</h3>
            <p class="field-groups__byline">Choose a group for this input</p>
            <button class="btn btn-white field-groups__group field-group" v-for="group in fieldGroups" v-bind="group" :key="group.id" @click.prevent="addGroupField(group)">
                <p class="field-group__label">{{ group.label }}</p>
                <p class="field-group__count">{{ group.inputs.length }} other inputs</p>
            </button>
            <div class="field-groups__footer">
                <b-btn v-b-modal.addgroup variant="default" class="btn btn-white">Add A New Group</b-btn>
                <!-- Modal Component -->
                <b-modal id="addgroup" title="Create a New Field Group" ref="addgroup" @ok="catchOk">
                    <form @submit.stop.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="form-group-name">Group Name</label>
                            <input type="text" name="formGroupName" id="form-group-name" class="form-control" v-model="formGroupName" @keyup="validateGroupName" :class="{'is-invalid': formGroupNameExists}">
                            <span class="invalid-feedback" v-if="formGroupNameExists">A group with this name already exists</span>
                        </div>
                    </form>
                </b-modal>
            </div>
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

    const tagGroups = [
        {
            id: 1,
            name: 'vinmaster',
            label: 'Vinmaster',
            tags: [
                {
                    id: 1,
                    name: 'make',
                    label: 'Vehicle Make',
                    type: 'text'
                },
                {
                    id: 2,
                    name: 'model',
                    label: 'Vehicle Model',
                    type: 'text'
                },
                {
                    id: 3,
                    name: 'year',
                    label: 'Year Built',
                    type: 'text'
                }
            ]
        },
        {
            id: 2,
            name: 'dmvorg',
            label: 'DMV.org',
            tags: [
                {
                    id: 1,
                    name: 'city',
                    label: 'City',
                    type: 'text'
                },
                {
                    id: 2,
                    name: 'state',
                    label: 'State',
                    type: 'text'
                },
                {
                    id: 3,
                    name: 'zip',
                    label: 'Zip Code',
                    type: 'text'
                }
            ]
        }
    ];

    const fieldGroups = [
        {
            id: 1,
            name: 'rental-vehicle-coverage-package',
            label: 'Rental Vehicle Coverage Package',
            inputs: [
                {
                    id: 1,
                    fieldType: 'multiple'
                },
                {
                    id: 2,
                    fieldType: 'date',
                },
                {
                    id: 3,
                    fieldType: 'vin',
                },
                {
                    id: 4,
                    fieldType: 'number',
                },
                {
                    id: 5,
                    fieldType: 'building',
                },
                {
                    id: 6,
                    fieldType: 'currency',
                },
                {
                    id: 7,
                    fieldType: 'asset',
                }
            ]
        }
    ]

    export default {
        name: 'textField',
        inject: ['$validator'],
        props: ['activeFieldType'],
        data () {
            return {
                name: '',
                displayLabel: '',
                referenceName: '',
                fieldGroups,
                tagGroups,
                tags: {},
                formGroupName: '',
                formGroupNameExists: false
            }
        },
        methods: {
            generateReferenceName(value) {
                this.referenceName = value.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-_]+/g, '');
            },
            generateTags(tag) {
                if(undefined != this.tags.groupId && tag.id == this.tags.groupId) {
                    this.tags = {}
                } else {
                    this.tags = {
                        groupId: tag.id,
                        tags: tag.tags
                    }
                }
            },
            addGroupField(group) {
                var activeFieldType = this.$parent.activeFieldType;

                // check if current field type already exists in given group
                var inGroup = group.inputs.findIndex(function(el) {
                    return el.fieldType == activeFieldType.name;
                });

                // don't add to group if already exists
                if(inGroup < 0) {

                    // confirm add to group
                    var dialog = confirm('Add ' + activeFieldType.heading + ' to ' + group.label + '?');

                    if(dialog) {

                        // find group index in field groups array
                        var groupIndex = this.fieldGroups.findIndex(function(el) {
                            return el.id == group.id;
                        });

                        // add current field type to field groups array
                        this.fieldGroups[groupIndex].inputs.push({
                            id: this.fieldGroups[groupIndex].inputs.length + 1,
                            fieldType: activeFieldType.name
                        })
                    }

                } else {
                    alert(group.label + ' already contains this field.');
                }
            },
            validateGroupName() {

                if(this.formGroupNameExists && this.formGroupName.length > 0) {

                    var name = this.formGroupName.replace(/\s/g, '-').replace(/\W+/, '');

                    // check if group already exists in field groups array
                    var groupIndex = this.fieldGroups.findIndex(function(el) {
                        return el.name == name;
                    });

                    this.formGroupNameExists = (groupIndex >= 0);
                }
            },
            catchOk(e) {
                e.preventDefault();

                if (!this.formGroupName) {
                    alert('Please enter a valid group name');
                } else {
                    this.handleSubmit()
                }
            },
            handleSubmit() {

                var group = {
                    id: this.fieldGroups.length + 1,
                    name: this.formGroupName.replace(/\s/g, '-').replace(/\W+/, ''),
                    label: this.formGroupName,
                    inputs: [{
                        id: this.$parent.activeFieldType.id,
                        fieldType: this.$parent.activeFieldType.name
                    }]
                };

                // check if group already exists in field groups array
                var groupIndex = this.fieldGroups.findIndex(function(el) {
                    return el.name == group.name;
                });

                if(groupIndex < 0) {
                    this.formGroupNameExists = false;
                    this.fieldGroups.push(group);
                    this.formGroupName = '';
                    this.$refs.addgroup.hide();
                } else {
                    this.formGroupNameExists = true;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~scss/_vars.scss";
    @import "~scss/_buttons.scss";

    .field-groups {
        background-color: $color-cyan-ligher;
        border: 1px solid $color-cyan;
        border-radius: 5px;
        height: 535px;
        padding: 15px;

        &__heading {
            font-size: 16px;
        }

        &__byline {
            color: $color-teal;
            font-size: 12px;
        }

        &__footer {
            bottom: 15px;
            padding-right: 30px;
            position: absolute;
            width: 100%;

            .btn-white {
                width: 100%;
            }
        }
    }

    .field-group {
        margin-bottom: 10px;
        padding: 15px;
        text-align: left;
        width: 100%;

        &__label {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        &__count {
            color: $color-teal;
            font-size: 12px;
            margin: 0;
        }
    }

    .field-type-tags {
        margin-top: 50px;

        &__heading {
            font-size: 18px;
            margin-bottom: 30px;
        }

        .btn {
            font-size: 12px;
            font-weight: bold;
            margin: 0 10px 10px 0;
            padding: 8px 10px;
        }
    }
</style>
