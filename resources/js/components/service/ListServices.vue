<template>
<div class="bx--grid" style="padding: 60px 250px;">
    <div class="bx--data-table-container" data-table>
        <!-- Title -->
        <div class="bx--data-table-header">
            <h4 class="bx--data-table-header__title">Services</h4>
        </div>

        <!-- Toolbar Contents -->
        <section class="bx--table-toolbar">
            <!-- Persistent Search -->
            <div class="bx--toolbar-content">
                <cv-link to="/admin/services/new" style="text-decoration: none;">
                    <button href="/admin/services/new" class="bx--btn bx--btn--lg bx--btn--primary">
                        Add Service 
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--btn__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path></svg>
                    </button>
                </cv-link>
            </div>
        </section>

        <!-- Table -->
        <table v-if="services !== null" class="bx--data-table bx--data-table--sort">
            <!-- Headings -->
            <thead>
                <tr>
                    <!-- Title -->
                    <th>
                        <button class="bx--table-sort" data-event="sort" title="title">
                            <span class="bx--table-header-label">Title</span>
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
                        </button>
                    </th>

                    <!-- Price -->
                    <th>
                        <button class="bx--table-sort" data-event="sort" title="price">
                            <span class="bx--table-header-label">Standard Price</span>
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
                        </button>
                    </th>

                    <!-- Space for View Profile Buttons -->
                    <th></th>
                </tr>
            </thead>

            <!-- Body -->
            <tbody v-for="service in services" v-bind:key="service.id">
                <!-- Title -->
                <td>
                    {{ service.title }}
                </td>

                <!-- Price -->
                <td>
                    {{service.standard_price}}
                </td>

                <!-- View Profile Buttons -->
                <td>
                    <cv-link :to="'/admin/services/show/' + service.id" style="text-decoration: none;"> 
                        <button class="bx--btn bx--btn--lg bx--btn--tertiary" data-event="sort" title="Service">
                            View Service
                        </button>
                    </cv-link>
                </td>
            </tbody>
        </table>

        <!-- Loading/Error -->
        <div v-else>
        <p>Please wait while we load up your services.</p>
            <div data-loading class="bx--loading">
                <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                    <title>Loading</title>
                    <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
                </svg>
            </div>
        </div>
    </div>

    <!-- Pagination -->
    <div class="bx--pagination" data-pagination> <!-- Open Pagination -->
        <!-- Left Pagination -->
        <div class="bx--pagination__left">
        <label id="select-id-pagination-count-label" class="bx--pagination__text" for="select-id-pagination-count">
            Items per page:
        </label>

        <div class="bx--select bx--select--inline bx--select__item-count">
            <select class="bx--select-input" id="select-id-pagination-count" aria-label="select number of items per page" tabindex="0" data-items-per-page>
            <option class="bx--select-option" value="10" selected>10</option>
            <option class="bx--select-option" value="20">20</option>
            <option class="bx--select-option" value="30">30</option>
            <option class="bx--select-option" value="40">40</option>
            <option class="bx--select-option" value="50">50</option>
            </select>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z"></path></svg>
        </div>
        <span class="bx--pagination__text">
            <span data-displayed-item-range>
            1-10
            </span> of
            <span ata-total-items>
            50
            </span> items
        </span>
        </div>

        <!-- Right Pagination -->
        <div class="bx--pagination__right">
        <div class="bx--select bx--select--inline bx--select__page-number">
            <select class="bx--select-input" id="select-id-pagination-page" aria-label="select page number to view" tabindex="0" data-page-number-input>
            <option class="bx--select-option" value="1" selected>1</option>
            <option class="bx--select-option" value="2">2</option>
            <option class="bx--select-option" value="3">3</option>
            <option class="bx--select-option" value="4">4</option>
            <option class="bx--select-option" value="5">5</option>
            </select>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z"></path></svg>
        </div>
        
        <label id="select-id-pagination-page-label" class="bx--pagination__text" for="select-id-pagination-page">
            of 5 pages
        </label>
        
        <button class="bx--pagination__button bx--pagination__button--backward" tabindex="0" data-page-backward aria-label="Backward button">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--pagination__nav-arrow" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M19 23l-8-7 8-7v14z"></path></svg>
        </button>

        <button class="bx--pagination__button bx--pagination__button--forward" tabindex="0" data-page-forward aria-label="Forward button">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--pagination__nav-arrow" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M13 9l8 7-8 7V9z"></path></svg>
        </button>
        </div>
    </div> <!-- Close Pagination -->


        <!-- <md-table-toolbar>
            <h1 class="md-title accent">Services</h1>
            <md-button class="md-raised md-accent btnAccent" to="/admin/services/new">Add Service</md-button>
        </md-table-toolbar> -->

        <!-- <md-table class="background text" md-card v-if="services !== null"> -->
            <!-- <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Standard Price</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row> -->
            <!-- <md-table-row v-for="service in services" v-bind:key="service.id" class="item background"> -->
                <!-- <md-table-cell md-numeric>{{service.id}}</md-table-cell> -->
                <!-- <md-table-cell class="background text">{{ service.title }}</md-table-cell> -->
                <!-- <md-table-cell class="background text"><span class="subject">Standard Price:</span> {{service.standard_price}}</md-table-cell> -->
                <!-- <md-table-cell class="background text"> -->
                    <!-- <md-button :to="'/admin/services/show/' + service.id" class="accentLight">View Service Details</md-button> -->
                    <!-- <md-button :to="'/admin/services/edit/' + service.id">Edit</md-button> -->
                <!-- </md-table-cell> -->
            <!-- </md-table-row> -->
        <!-- </md-table> -->
        <!-- <p v-else>There are no motivat-I mean Services.</p> -->
</div>
</template>
<script>
import Vue from "vue";
import axios from 'axios';
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import { DataTable, Loading } from 'carbon-components';

Vue.use(CarbonComponentsVue);

    export default {
        data() {
            return {
                services: null
            }
        },
        mounted () {
            axios.get('/api/service/all')
            .then(response => (this.services = response.data))
        },
        methods: {
            //
        },
        components: {
            DataTable,
            Loading
        }
    };
</script>
