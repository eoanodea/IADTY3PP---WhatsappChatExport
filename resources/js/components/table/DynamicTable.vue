<template>
    <div class="bx--data-table-container" data-table>
        <!-- Title -->
        <div class="bx--data-table-header">
            <h4 class="bx--data-table-header__title">hello{{title ? title : 'Table'}}</h4>
        </div>

        <!-- Toolbar -->
        <section class="bx--table-toolbar">
            <!-- Persistent Search -->
            <div class="bx--toolbar-content">
                <!-- Add Client Button -->
                <cv-link to="/admin/users/new" style="text-decoration: none;"> 
                <button href="/admin/users/new" class="bx--btn bx--btn--lg bx--btn--primary">
                    Add Client 
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--btn__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path></svg>
                </button>
                </cv-link>
            </div>
        </section>

        <!-- Table -->
        <table v-if="data !== null && data.length > 0" class="bx--data-table bx--data-table--sort">
            <!-- Headings -->
            <thead>
                <tr>
                    <!-- Name -->
                    <th v-for="field in fields" v-bind:key="field">
                        <button class="bx--table-sort" data-event="sort" title="Name">
                        <span class="bx--table-header-label">{{field.replace('_', ' ')}}</span>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
                        </button>
                    </th>

                </tr>
            </thead>

            <!-- Body -->
            <tbody>
                <tr v-for="dat in data" v-bind:key="dat.id">
                    <!-- Names -->
                    <td v-for="field in fields" v-bind:key="field">
                        {{dat[field]}}
                    </td>

                    <!-- View Profile Buttons -->
                    <td>
                        <cv-link :to="actionUrl + dat.id" style="text-decoration: none;"> 
                            <button class="bx--btn bx--btn--lg bx--btn--tertiary" data-event="sort" title="Name">
                                View Profile
                            </button>
                        </cv-link>
                    </td>
                
                </tr>
            </tbody>
        </table>

        <!-- Loading -->
        <loading-indicator v-else-if="!error" />

        <!-- Error -->
        <data-error v-else v-bind:error="error" />
        
    </div>    
</template>

<script>
    import Vue from 'vue'
    //Component Imports
    import DataError from './DataError'
    import LoadingIndicator from './../progress/LoadingIndicator'

    //Carbon Imports
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { DataTable } from 'carbon-components';

    Vue.use(CarbonComponentsVue);

    export default {
        props: ['title', 'data', 'fields', 'showUrl', 'addUrl', 'error'],
        components: {
            DataError,
            LoadingIndicator,
            DataTable
        }
    }
</script>

