import { ref } from 'vue'
import type { UnsplashPhoto, UnsplashSearchResponse } from '~/types/unsplash'

export const useUnsplash = () => {
    const config = useRuntimeConfig()
    const loading = ref(false)
    const error = ref<string | null>(null)

    const headers = {
        'Authorization': `Client-ID ${config.public.unsplashAccessKey}`,
        'Accept-Version': 'v1'
    }

    // List of African countries to help filter content
    const africanContextKeywords = [
        'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Ethiopia',
        'Tanzania', 'Uganda', 'Rwanda', 'Senegal', 'Morocco',
        'Egypt', 'African', 'Africa'
    ]

    const getAfricanPhotos = async () => {
        loading.value = true
        error.value = null
        try {
            // Using specific African themes for initial photos
            const queries = [
                'African portrait',
                'African culture',
                'African life',
                'African street',
                'African market',
                'African fashion',
                'African tradition'
            ]
            const randomQuery = queries[Math.floor(Math.random() * queries.length)]

            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(randomQuery)}&per_page=30&order_by=relevant`,
                { headers }
            )
            if (!response.ok) throw new Error('Failed to fetch African photos')
            const data = await response.json() as UnsplashSearchResponse

            // Filter results to ensure African context
            const filteredResults = data.results.filter(photo => {
                const description = (photo.description || '').toLowerCase()
                const altDescription = (photo.alt_description || '').toLowerCase()
                const location = (photo.user.location || '').toLowerCase()
                const tags = photo.tags?.map(tag => tag.title.toLowerCase()) || []

                // Check if any African context keywords are present
                return africanContextKeywords.some(keyword =>
                    description.includes(keyword.toLowerCase()) ||
                    altDescription.includes(keyword.toLowerCase()) ||
                    location.includes(keyword.toLowerCase()) ||
                    tags.some(tag => tag.includes(keyword.toLowerCase()))
                )
            })

            return filteredResults.slice(0, 8) // Return only first 8 filtered results
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occurred'
            return []
        } finally {
            loading.value = false
        }
    }

    const searchPhotos = async (query: string) => {
        loading.value = true
        error.value = null
        try {
            // Combine user query with African context
            const africanQueries = [
                `African ${query}`,
                `${query} Africa`,
                `${query} African`
            ]

            // Make multiple requests to ensure good coverage
            const responses = await Promise.all(
                africanQueries.map(q =>
                    fetch(
                        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=30&order_by=relevant`,
                        { headers }
                    )
                )
            )

            const results = await Promise.all(
                responses.map(async response => {
                    if (!response.ok) throw new Error('Failed to search photos')
                    const data = await response.json() as UnsplashSearchResponse
                    return data.results
                })
            )

            // Combine and filter results
            const allResults = Array.from(new Set(results.flat()))
            const filteredResults = allResults.filter(photo => {
                const description = (photo.description || '').toLowerCase()
                const altDescription = (photo.alt_description || '').toLowerCase()
                const location = (photo.user.location || '').toLowerCase()
                const tags = photo.tags?.map(tag => tag.title.toLowerCase()) || []

                return africanContextKeywords.some(keyword =>
                    description.includes(keyword.toLowerCase()) ||
                    altDescription.includes(keyword.toLowerCase()) ||
                    location.includes(keyword.toLowerCase()) ||
                    tags.some(tag => tag.includes(keyword.toLowerCase()))
                )
            })

            return filteredResults.slice(0, 8) // Return only first 8 filtered results
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occurred'
            return []
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        getAfricanPhotos,
        searchPhotos
    }
} 