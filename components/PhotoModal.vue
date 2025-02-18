<template>
  <DialogRoot :open="!!photo" @update:open="$emit('close')">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
      <DialogContent class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[90vw] max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl z-50">
        <div class="relative h-full flex flex-col">
          <div class="flex-1 overflow-y-auto">
            <div class="relative">
              <img
                :src="photo?.urls?.full"
                :alt="photo?.alt_description"
                :class="[
                  'w-full object-contain',
                  isPortrait ? 'max-h-[80vh]' : 'max-h-[76vh]'
                ]"
                loading="eager"
                @load="checkOrientation"
                ref="imageRef"
              />
            </div>
            <div class="bg-white p-4 sticky bottom-0">
              <div class="flex flex-col space-y-2">
                <div class="flex items-center space-x-3">
                  <img
                    :src="photo?.user?.profile_image?.medium"
                    :alt="photo?.user?.name"
                    class="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 class="font-medium text-gray-900 text-sm sm:text-base">{{ photo?.user?.name }}</h3>
                    <p class="text-xs sm:text-sm text-gray-500">{{ photo?.user?.location || 'Lagos, Nigeria' }}</p>
                  </div>
                </div>
                <a
                  :href="photo?.links?.download"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors w-fit"
                >
                  <DownloadIcon class="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
          <DialogClose class="absolute top-4 right-4 z-50">
            <button class="rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors">
              <XIcon class="w-5 h-5 text-white" />
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { 
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose
} from 'radix-vue'
import { XIcon, DownloadIcon } from 'lucide-vue-next'
import type { UnsplashPhoto } from '~/types/unsplash'
import { ref } from 'vue'

const props = defineProps<{
  photo: UnsplashPhoto | null
}>()

const emit = defineEmits<{
  close: []
}>()

const imageRef = ref<HTMLImageElement | null>(null)
const isPortrait = ref(false)

const checkOrientation = () => {
  if (imageRef.value) {
    isPortrait.value = imageRef.value.naturalHeight > imageRef.value.naturalWidth
  }
}
</script> 