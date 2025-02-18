<template>
  <div class="staggered-grid">
    <template v-if="loading">
      <div v-for="n in 8" :key="n" class="photo-card animate-pulse">
        <div class="w-full h-full rounded-lg bg-gray-200">
          <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-200 to-transparent">
            <div class="absolute bottom-6 left-6 space-y-2">
              <div class="h-4 w-24 bg-gray-300 rounded"></div>
              <div class="h-3 w-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="photos.length">
      <PhotoCard
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        @click="selectedPhoto = photo"
      />
    </template>
    <template v-else>
      <div class="col-span-full text-center py-12">
        <p class="text-lg text-muted-foreground">No photos found</p>
      </div>
    </template>
  </div>
  <PhotoModal
    :photo="selectedPhoto"
    @close="selectedPhoto = null"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UnsplashPhoto } from '~/types/unsplash'

const props = defineProps<{
  photos: UnsplashPhoto[]
  loading?: boolean
  searchQuery?: string
}>()

const selectedPhoto = ref<UnsplashPhoto | null>(null)
</script>

<style lang="scss" scoped>
.staggered-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
  margin-top: -1.5rem;
  position: relative;
  z-index: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  .photo-card {
    aspect-ratio: 3/4;
    break-inside: avoid;
    margin-bottom: 1.5rem;
    position: relative;
    
    &:nth-child(4n + 1),
    &:nth-child(4n + 2),
    &:nth-child(4n + 3),
    &:nth-child(4n + 4) {
      grid-row: span 1;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style> 