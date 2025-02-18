# WeAfricans - African Photo Gallery

A beautiful photo gallery application showcasing African photography, powered by the Unsplash API.

## Live Demo

Check out the live demo [here](https://weafricans.netlify.app/).

## Demo Images

![desktop](https://github.com/user-attachments/assets/862caea3-a18f-46a3-a974-dc20e2f523e3)

![desktop-3](https://github.com/user-attachments/assets/9dfb361d-2652-429c-87ff-882f358171d8)

![desktop-4](https://github.com/user-attachments/assets/a5785cee-6409-4704-b5b7-9128cbf1ffb9)

![mobile-1](https://github.com/user-attachments/assets/cee826f2-f3f7-457f-b7b9-563b56bc57bb)

![mobile-2](https://github.com/user-attachments/assets/1722bf7d-8824-473b-b8b2-9d43a133c8eb)


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
