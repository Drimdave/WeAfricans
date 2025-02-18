<template>
  <div 
    class="photo-card group cursor-pointer overflow-hidden rounded-lg relative bg-muted"
    @click="$emit('click')"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
    <img
      :src="photo.urls.regular"
      :alt="photo.alt_description || photo.description"
      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div class="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
      <p class="font-medium">{{ photo.user.name }}</p>
      <p class="text-sm text-white/80">
        {{ photo.user.location || 'Somewhere in Africa' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnsplashPhoto } from '~/types/unsplash'

defineProps<{
  photo: UnsplashPhoto
}>()

defineEmits<{
  click: []
}>()
</script>

<style lang="scss" scoped>
.photo-card {
  aspect-ratio: 3/4;
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style> 