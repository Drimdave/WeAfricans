# WeAfricans - African Photo Gallery

A beautiful photo gallery application showcasing African photography, powered by the Unsplash API.

## Live Demo

Check out the live demo [here](https://weafricans.netlify.app/).

## Demo Images

![Demo Image 1](https://link-to-your-image-1.com)
![Demo Image 2](https://link-to-your-image-2.com)

## Features

- Display latest African photos in a staggered grid layout
- Search functionality for finding specific photos
- Photo modal with high-resolution preview
- Responsive design with beautiful animations
- Loading placeholders for better UX
- Download photos directly from the modal

## Tech Stack

- Nuxt 3
- Vue 3 with Composition API
- TypeScript
- Tailwind CSS
- Shadcn Vue
- Radix Vue

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Unsplash API key:
   ```
   UNSPLASH_ACCESS_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Development

The project follows a modular structure:

- `components/` - Vue components
  - `ui/` - Reusable UI components
- `composables/` - Vue composables for shared logic
- `types/` - TypeScript type definitions
- `assets/` - Static assets and global CSS
- `pages/` - File-based routing

## Building for Production

```bash
npm run build
```

This will create a production-ready build in the `.output` directory.

## License

This project is open source and available under the MIT License. 
