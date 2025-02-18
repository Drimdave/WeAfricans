import { defineComponent, h } from 'vue'
import { cn } from '~/lib/utils'

const Input = defineComponent({
    name: 'Input',
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        class: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
        return () =>
            h('input', {
                type: props.type,
                value: props.modelValue,
                onInput: (event: Event) => {
                    emit('update:modelValue', (event.target as HTMLInputElement).value)
                },
                class: cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                    'placeholder:text-muted-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    props.class
                ),
                ...attrs
            })
    }
})

export { Input } 