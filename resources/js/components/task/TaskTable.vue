<template>
    <div>
        <!-- Table -->
        <cv-data-table
            :auto-width="true"
            :title="title"
            action-bar-aria-label="Action bar"
            batch-cancel-label="Cancel"
            :columns="customFields"
            :use_batchAction="use_batchActions"
            :use_actions="use_actions"
            v-model="selectedData" 
            @row-select-change="actionRowSelectChange"
            @overflow-menu-click="onOverflowMenuClick"  
            ref="table"
        >
            <!-- Actions slot -->
            <template v-if="use_actions" slot="actions">
                <cv-link :to="addUrl">
                    <cv-button>
                        Add new
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--btn__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path></svg>
                    </cv-button>
                </cv-link>
            </template>
            
            <!-- Data slot -->
            <template v-if="use_htmlData" slot="data">
                <span v-if="filteredData.length > 0">
                <cv-data-table-row v-for="(row, rowIndex) in filteredData" :key="rowIndex" :value="`${rowIndex}`">
                    <cv-data-table-cell v-for="(field, fieldIndex) in customFields" :key="fieldIndex" :value="`${fieldIndex}`">
                        <cv-link :to="(showUrl + data[rowIndex].id)">{{row[fieldIndex]}}</cv-link>
                    </cv-data-table-cell>
                </cv-data-table-row>
                </span>
                 <cv-data-table-row v-else >No Tasks available</cv-data-table-row>
                <!-- <h3 v-else></h3> -->
            </template>
            
            <!-- Batch Actions slot -->
            <template v-if="use_batchActions" slot="batch-actions" class="batch-actions">
                <cv-button @click="onBatchDelete">
                    Delete
                    <TrashCan16 class="bx--btn__icon"/>
                </cv-button>
            </template>
        </cv-data-table>
        <BatchDeleteTask 
            v-bind:ids="selectedIds" 
            v-bind:showDialog="showDialog" 
            v-bind:isActive="active" 
            v-on:handle-dialog="handleDialog"
            v-on:handle-success="handleBatchSuccess"
        />
    </div>
</template>

<script>
    import Vue from 'vue'
    //Component Imports
    import Pagination from './../table/Pagination'
    import BatchDeleteTask from './../task/BatchDeleteTask'
    //Carbon Imports
    import TrashCan16 from '@carbon/icons-vue/es/trash-can/16';
    import { DataTable } from 'carbon-components';

    

    export default {
        props: ['title', 'data', 'fields', 'showUrl', 'addUrl', 'collection', 'active'],
        data: () => {
            return {
                showDialog: false,
                selectedData: [],
                selectedIds: [],
                filteredData: [],
                use_actions: true,
                use_batchActions: true,
                use_htmlData: true,
                customFields: []
            }
        },
        methods: {
            formatFields() {
                this.customFields = this.fields.map(dat => {
                    return dat.charAt(0).toUpperCase() + dat.slice(1).replace('_', ' ')
                })
            },
            formatData() {
                let result = []
                this.data.map(dat => {
                    let subResult = []
                    Object.entries(dat).map(objectDat => {
                        this.fields.map(field => {
                            if(objectDat[0] === field) subResult.push(objectDat[1])
                        })
                    }) 
                    result.push(subResult)   
                })

                this.filteredData = result
            },
            actionRowSelectChange(row) {
                const selected = this.data[parseInt(row.value)]
                
                row.selected == true
                ? this.selectedIds.push(selected.id.toString())
                : this.selectedIds = this.selectedIds.filter(dat => dat != selected.id)
            },
            onOverflowMenuClick() {
                console.log('overflow menu !')
            },
            onBatchDelete() {
                this.handleDialog()
            },
            actionNew() {
                console.log('new!')
            },
            handleBatchSuccess() {
                console.log('YEEEHHH GOING')
                console.log('starting', this.selectedData)
                this.selectedData.map((dat, i) => {
                    console.log('filting', this.filteredData, dat, i)
                    this.filteredData.splice(parseInt(dat), 1)
                    console.log('done', this.filteredData)
                })
                this.selectedData = []
                this.selectedIds = []
                // this.formatData()
                this.handleDialog()
            },
            handleDialog() {
                this.showDialog = !this.showDialog
            }
        },
        components: {
            Pagination,
            DataTable,
            TrashCan16,
            BatchDeleteTask
        },
        mounted() {
            this.formatData()
            this.formatFields()
        }
    }
</script>

<style lang="scss">
    .bx--batch-summary {
        left: 10px;
    }
</style>

