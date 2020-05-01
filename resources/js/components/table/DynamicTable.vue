<template>
    <loading-indicator v-if="loading"/>
    <div class="bx--data-table-container" data-table v-else-if="data">
        <!-- Title -->
        <div class="bx--data-table-header">
            <h2 class="bx--data-table-header__title">{{title ? title : 'Table'}}</h2>
            <!-- Toolbar -->
            <section class="bx--table-toolbar">
                <!-- Persistent Search -->
                <div class="bx--toolbar-content">
                    <!-- Add Client Button -->
                    <cv-link v-if="addUrl" :to="addUrl" style="text-decoration: none;"> 
                    <button class="bx--btn bx--btn--lg bx--btn--primary">
                        Add {{title}} 
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--btn__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path></svg>
                    </button>
                    </cv-link>
                </div>
            </section>
        </div>

        <!-- Table Wrapper -->
        <div v-if="data !== null">
            <!-- Table -->
            <table class="bx--data-table bx--data-table--sort">
                <!-- Table Head -->
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
                        <th></th>
                    </tr>
                </thead>

                <!-- Table Body -->
                <tbody v-if="data.length > 0">
                    <tr v-for="dat in data" v-bind:key="dat.id">
                        <!-- Names -->
                        <td v-for="field in fields" v-bind:key="field">
                            <cv-link :to="(showUrl + dat.id)" > 
                                {{dat[field]}}
                            </cv-link>

                        </td>
                        <!-- Show URL button -->
                        <td>
                            
                                <!-- <button class="bx--btn bx--btn--lg bx--btn--tertiary" data-event="sort" title="Name">
                                    View {{collection}}
                                </button>
                            </cv-link> -->
                        </td>
                    
                    </tr>
                </tbody>
                <div v-else class="no-data-container">
                    <h2>No {{collection}}s found</h2>
                    <br /> <!-- dont tell mo -->
                    <cv-link v-if="addUrl" :to="addUrl" style="text-decoration: none;"> 
                        <button class="bx--btn bx--btn--lg bx--btn--primary">
                            Add {{title}} 
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--btn__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path></svg>
                        </button>
                    </cv-link>
                </div>
            </table>
            <!-- Close Table -->

            <!-- Pagination -->
            <pagination v-if="collection && data.length > 0" v-bind:collection="collection" v-bind:active="isActive" />
            <!-- Close Pagination -->

        </div>
        <!-- Close Table Wrapper -->

        <!-- Error -->
        <data-error v-else v-bind:error="error" v-bind:collection="collection"/>
        
    </div>    
</template>

<script>
    import Vue from 'vue'
    //Component Imports
    import LoadingIndicator from './../progress/LoadingIndicator'
    import DataError from './DataError'
    import Pagination from './Pagination'

    //Carbon Imports
    
    import { DataTable } from 'carbon-components';

    

    export default {
        props: ['title', 'data', 'fields', 'showUrl', 'addUrl', 'error', 'collection', 'loading', 'isActive'],
        components: {
            DataError,
            Pagination,
            LoadingIndicator,
            DataTable
        }
    }
</script>

<style lang="scss" scoped>
    table th span, h2 {
        text-transform: capitalize;
    }
    .no-data-container {
        width: 100%;
        margin: 50px auto;
    }
</style>

