<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :key="categories.length + updateCount"
          @updated="updateCategories"
          :categories="categories"
        />
        <p v-else class="center">{{ 'CategoriesNotFound' | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('Menu_Categories'),
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
}
</script>
