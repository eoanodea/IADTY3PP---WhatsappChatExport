<template>
<div class="bx--grid"> <!-- Open Grid -->
  <div class="bx--data-table-container" data-table> <!-- Open Table -->
    <!-- Title -->
    <div class="bx--data-table-header">
      <h4 class="bx--data-table-header__title">Clients</h4>
      <p class="bx--data-table-header__description"></p>
    </div>

    <!-- Toolbar Contents -->
    <section class="bx--table-toolbar">
      <!-- Batch Actions -->
      <div class="bx--batch-actions" aria-label="Table Action Bar">
          <div class="bx--action-list">
            <button data-event="action-bar-cancel" class="bx--btn bx--btn--primary bx--batch-summary__cancel">Cancel</button>
          </div>

          <div class="bx--batch-summary">
            <p class="bx--batch-summary__para">
					    <span data-items-selected>3</span> 
              items selected
				    </p>
          </div>
      </div>

      <!-- Persistent Search -->
      <div class="bx--toolbar-content">
        <!-- Add Client Button -->
        <button to="/admin/users/new" class="bx--btn bx--btn--sm bx--btn--primary">
             Add Client 
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--btn__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path></svg>
        </button>
      </div>
    </section>

    <!-- Table -->
    <table v-if="users !== null" class="bx--data-table bx--data-table--sort ">
      <!-- Headings -->
      <thead>
        <tr>
          <!-- Checkbox (All) -->
          <th class="bx--table-column-checkbox">
            <input data-event="select-all" id="bx--checkbox-20" class="bx--checkbox" type="checkbox" value="green" name="checkbox-20">
					  <label for="bx--checkbox-20" class="bx--checkbox-label" aria-label="Label name"></label>
          </th>

          <!-- Name -->
          <th>
            <button class="bx--table-sort" data-event="sort" title="Name">
              <span class="bx--table-header-label">Name</span>
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
            </button>
          </th>

          <!-- Email -->
          <th>
            <button class="bx--table-sort" data-event="sort" title="Email">
              <span class="bx--table-header-label">Email</span>
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
            </button>
          </th>

          <!-- Space for View Profile Buttons -->
          <th></th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody v-for="user in users" v-bind:key="user.id">
        <!-- Checkboxes (Individual) -->
        <td class="bx--table-column-checkbox">
          <input data-event="select" id="bx--checkbox-13" class="bx--checkbox" type="checkbox" value="green" name="checkbox-13">
					<label for="bx--checkbox-13" class="bx--checkbox-label" aria-label="Label name"></label>
        </td>

        <!-- Names -->
        <td>
          {{ user.first_name + " " + user.last_name }}
        </td>

        <!-- Emails -->
        <td>
          {{ user.email }}
        </td>

        <!-- View Profile Buttons -->
        <td>
          <button :to="'/admin/users/show/' + user.id" class="bx--table-sort" data-event="sort" title="Name">
              View Profile
          </button>
        </td>
      </tbody>
    </table>

    <!-- Loading/Error -->
    <div v-else data-loading class="bx--loading">
      <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
        <title>Loading</title>
        <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
      </svg>
      <p>Please wait while we load up your clients.</p>
    </div>
  </div> <!-- Close Table -->

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
</div> <!-- Close Grid -->

 <!-- <div class="fluid-container">
    
    <md-table-toolbar>
      <h1 class="md-title accent">Clients</h1>
      <md-button class="md-raised md-accent btnAccent" to="/admin/users/new">Add Client</md-button>
    </md-table-toolbar> -->

    <!-- <md-table  md-card v-if="users !== null"> -->
      <!-- <md-table-row >
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head></md-table-head>
      </md-table-row>-->
      
      <!-- <md-table-row v-for="user in users" v-bind:key="user.id" class="item background">
        <md-table-cell >{{ user.first_name + " " + user.last_name }}</md-table-cell>
        <md-table-cell >{{ user.email }}</md-table-cell>
        <md-table-cell >
          <md-button :to="'/admin/users/show/' + user.id" class="accentLight">View Profile</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <p v-else>There are no money-I mean clients 😢</p>
  </div> -->
</template>

<script>
import Vue from "vue";
import axios from "axios";
// import { MdButton, MdTable, MdRipple } from "vue-material/dist/components";
import DeleteUser from "./DeleteUser";
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import { DataTable } from 'carbon-components';

Vue.use(CarbonComponentsVue);
Vue.use(DataTable);

// Vue.use(MdTable);
// Vue.use(MdRipple);
export default {
  data() {
    return {
      users: null
    };
  },
  mounted() {
    axios.get("/api/user/all").then(response => (this.users = response.data));
  },
  methods: {
    //
  },
  components: {
    DeleteUser,
    DataTable
  }
};
</script>
