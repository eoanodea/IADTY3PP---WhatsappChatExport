<template>
<div class="bx--grid" style="padding: 60px 250px;">
    <div  class="bx--data-table-container" data-table>
        <!-- Title -->
        <div class="bx--data-table-header">
            <h4 class="bx--data-table-header__title">Transactions</h4>
        </div>
    </div>

    <!-- Table -->
    <table v-if="transactions !== null" class="bx--data-table bx--data-table--sort">
        <!-- Headings -->
        <thead>
            <tr>
                <!-- ID -->
                <th>
                    <button class="bx--table-sort" data-event="sort" title="title">
                        <span class="bx--table-header-label">I.D</span>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
                    </button>
                </th>

                <!-- Created At -->
                <th>
                    <button class="bx--table-sort" data-event="sort" title="title">
                        <span class="bx--table-header-label">Created At</span>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
                    </button>
                </th>

                <!-- Amount -->
                <th>
                    <button class="bx--table-sort" data-event="sort" title="title">
                        <span class="bx--table-header-label">Amount</span>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
                    </button>
                </th>

                <!-- Space for View Profile Buttons -->
                <th></th>
            </tr>
        </thead>

        <!-- Body -->
        <tbody v-for="transaction in transactions" v-bind:key="transaction.id">
            <!-- ID -->
            <td>
                {{ transaction.id }}
            </td>

            <!-- Created At -->
            <td>
            {{ transaction.created_at }}
            </td>

            <!-- Amount -->
            <td>
                {{ transaction.amount }}
            </td>

            <!-- View Profile Buttons -->
            <td>
                <cv-link :to="`/transaction/` + transaction.id" style="text-decoration: none;"> 
                    <button class="bx--btn bx--btn--lg bx--btn--tertiary" data-event="sort" title="Service">
                        View Transaction
                    </button>
                </cv-link>
            </td>
        </tbody>
    </table>

    <!-- Loading/Error -->
    <div v-else>
    <p>Please wait while we load up your projects.</p>
        <div data-loading class="bx--loading">
            <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                <title>Loading</title>
                <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
            </svg>
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
        props: ['id'],
        data() {
            return {
                transactions: null,
                assignmentId: this.$route.params.id
                    ? this.$route.params.id
                    : this.id,
            }
        },
        //When the component mounts, check if the Transaction is active or default
        //Modify the fetch URL with result and fetch Transactions
        mounted () {
            let url = ''
            if(this.assignmentId) {
                url.push('/by/' + this.assignmentId)
            }
            axios.get(`/api/transactions${url}`)
            .then(response => (this.transactions = response.data.transactions))
        },
        methods: {
            //
        },
        components: {
            DataTable,
            Loading
        }

    }
</script>
