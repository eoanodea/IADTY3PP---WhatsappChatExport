<template>
    <div class="bx--pagination" data-pagination> <!-- Open Pagination -->
        <!-- Left Pagination -->
        <div class="bx--pagination__left">
        <label id="select-id-pagination-count-label" class="bx--pagination__text" for="select-id-pagination-count">
            Items per page:
        </label>

        <div class="bx--select bx--select--inline bx--select__item-count">
            <select class="bx--select-input" id="select-id-pagination-count" aria-label="select number of items per page" tabindex="0" data-items-per-page @change="selectLimit">
                <option class="bx--select-option" value="5" selected>5</option>
                <option class="bx--select-option" value="10">10</option>
                <option class="bx--select-option" value="15">15</option>
                <option class="bx--select-option" value="20">20</option>
            </select>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z"></path></svg>
        </div>
        <span class="bx--pagination__text">
            <span data-displayed-item-range>
            {{pagination.from + " - " + pagination.from}}
            </span> of
            <span ata-total-items>
            {{pagination.total}}
            </span> items
        </span>
        </div>

        <!-- Right Pagination -->
        <div class="bx--pagination__right">
            <!-- <div class="bx--select bx--select--inline bx--select__page-number">
                <select class="bx--select-input" id="select-id-pagination-page" aria-label="select page number to view" tabindex="0" data-page-number-input>
                    <option class="bx--select-option" value="1" selected>1</option>
                    <option class="bx--select-option" value="2">2</option>
                    <option class="bx--select-option" value="3">3</option>
                    <option class="bx--select-option" value="4">4</option>
                    <option class="bx--select-option" value="5">5</option>
                </select>
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z"></path></svg>
            </div> -->
        
        <label id="select-id-pagination-page-label" class="bx--pagination__text" for="select-id-pagination-page">
            {{pagination.current}} of {{pagination.last}} pages
        </label>
        
        <button 
            @click="prev"
            :disabled="pagination.current <= 1" 
            class="bx--pagination__button bx--pagination__button--backward" 
            tabindex="0" 
            data-page-backward aria-label="Backward button"
        >
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--pagination__nav-arrow" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M19 23l-8-7 8-7v14z"></path></svg>
        </button>

        <button 
            @click="next" 
            :disabled="pagination.current >= pagination.last" 
            class="bx--pagination__button bx--pagination__button--forward" 
            tabindex="0" 
            data-page-forward aria-label="Forward button">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--pagination__nav-arrow" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M13 9l8 7-8 7V9z"></path></svg>
        </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
    export default {
        props: ['collection'],
        data() {
            return {
                prefix: 'user'
            }
        },
        computed: {
            ...mapState({
                pagination(state, getters) {
                    return getters[`${this.collection}/pagination`]
                }
            }),
        },
        methods: {
            next() {
                 this.$store.dispatch(this.collection + '/loadUsers', this.pagination.current + 1)
            },
            prev() {
                this.$store.dispatch(this.collection + '/loadUsers', this.pagination.current - 1)
            },
            selectLimit(e) {
                this.$store.dispatch(this.collection + '/loadUsers', [
                    this.pagination.current, 
                    e.target.value
                ])
            }
        },
        watch: {
            collection: function(newVal, oldVal) {
                this.prefix = collection
            }
        }
    }
</script>