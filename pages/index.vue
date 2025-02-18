<template>
  <div class="min-h-screen bg-background">
    <header class="relative">
      <div class="absolute inset-0 h-[300px] bg-gradient-to-b from-primary/20 to-background/0" />
      <div class="container relative pt-20 pb-32">
        <h1 class="text-4xl font-bold text-center mb-8">
          Discover African Photography
        </h1>
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              v-model="searchQuery"
              type="search"
              placeholder="Search photos..."
              class="w-full pl-12 pr-4 h-12 text-lg"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>
      </div>
    </header>

    <main class="container relative">
      <div class="absolute top-[-4rem] left-0 right-0 z-20">
        <div class="container">
          <h2 
            v-if="isSearching" 
            class="text-2xl font-semibold text-gray-800"
          >
            {{ searchHeading }}
          </h2>
        </div>
      </div>
      <div class="relative pb-16">
        <PhotoGrid
          :photos="photos"
          :loading="unsplash.loading.value"
          :search-query="searchQuery"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { SearchIcon } from 'lucide-vue-next'
import { Input } from '~/components/ui/input'
import type { UnsplashPhoto } from '~/types/unsplash'

const unsplash = useUnsplash()
const photos = ref<UnsplashPhoto[]>([])
const searchQuery = ref('')
const hasSearched = ref(false)

const isSearching = computed(() => {
  return hasSearched.value && searchQuery.value.trim() !== ''
})

const searchHeading = computed(() => {
  if (unsplash.loading.value) {
    return `Searching for "${searchQuery.value}"`
  }
  return `Search Results for "${searchQuery.value}"`
})

const handleSearch = async () => {
  const query = searchQuery.value.trim()
  
  if (!query) {
    hasSearched.value = false
    await loadInitialPhotos()
    return
  }

  try {
    hasSearched.value = true
    const results = await unsplash.searchPhotos(query)
    photos.value = results
  } catch (error) {
    console.error('Search failed:', error)
    photos.value = []
  }
}

const loadInitialPhotos = async () => {
  try {
    const results = await unsplash.getAfricanPhotos()
    photos.value = results
  } catch (error) {
    console.error('Failed to load initial photos:', error)
    photos.value = []
  }
}

// Watch for empty search query to reset to initial state
watch(searchQuery, (newValue) => {
  if (!newValue.trim()) {
    hasSearched.value = false
    loadInitialPhotos()
  }
})

onMounted(loadInitialPhotos)
</script> 