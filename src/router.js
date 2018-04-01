import Vue from 'vue';
import Router from 'vue-router';

import Lines from './components/Lines.vue';
import DateField from './components/DateField.vue';
import NumberField from './components/NumberField.vue';
import TextField from './components/TextField.vue';
import VinField from './components/VinField.vue';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/lines',
            component: Lines,
            children: [
                {
                    path: 'date',
                    component: DateField
                },
                {
                    path: 'number',
                    component: NumberField
                },
                {
                    path: 'text',
                    component: TextField
                },
                {
                    path: 'vin',
                    component: VinField
                }
            ]
        }
    ]
})
