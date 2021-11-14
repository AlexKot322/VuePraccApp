<template>
  <div>
    <div class="page-title">
      <h3>{{ 'HistoryOfRecords' | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ 'RecordsNotFound' | localize }}
      <router-link to="/record"> {{ 'AddRecord' | localize }}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev' | localize"
        :next-text="'Next' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      >
        >
      </paginate>
    </section>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import localizeFilter from '@/filters/localize.filter'
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History'),
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)
    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText:
              record.type === 'income'
                ? localizeFilter('Income')
                : localizeFilter('Outcome'),
          }
        })
      )

      this.renderChart({
        labels: categories.map((c) => c.title),
        datasets: [
          {
            label: localizeFilter('ExpensesByCategory'),
            data: categories.map((c) => {
              return this.records.reduce((total, record) => {
                if (record.categoryId === c.id && record.type === 'outcome') {
                  total += +record.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      })
    },
  },
  components: {
    HistoryTable,
  },
}
</script>
