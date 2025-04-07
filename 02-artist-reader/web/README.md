# Artist Reader

A Next.js application that presents bodies of text, images, and videos in a sequential format, following a script-based approach.

## Features

- Script-based presentation of content
- Sequential display of elements (text, images, videos)
- Vimeo video integration
- Custom font implementation

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app/components`: UI components
  - `ElementRenderer.tsx`: Renders different types of content (text, images, videos)
  - `ScriptPlayer.tsx`: Main component for navigating through the script
  - `VimeoPlayer.tsx` and `VimeoWrapper.tsx`: Vimeo video integration
- `/src/app/context`: React context
  - `ScriptContext.tsx`: Manages the script state and navigation
- `/src/app/scripts`: Script definition files
  - `sample-script.ts`: Sample script showing the format
- `/fonts`: Custom fonts

## Script Format

Scripts are defined with the following structure:

```typescript
{
  id: string;            // Unique ID for the script
  title: string;         // Title of the script
  elements: [            // Array of all elements in the script
    {
      id: string;        // Unique ID for the element
      type: 'text' | 'image' | 'video';  // Type of content
      content: string;   // Content or path (for text, image path, or vimeo ID)
      metadata?: {       // Optional metadata
        title?: string;
        caption?: string;
        alt?: string;    // For images
        // Additional metadata as needed
      }
    },
    // More elements...
  ],
  sequences: number[][]  // Array of arrays, each defining a display state
                         // using indices of elements to show
}
```

## How Sequences Work

The `sequences` array defines how elements are displayed over time:

1. Each inner array represents a "state" in the presentation
2. Elements are referenced by their index in the elements array
3. As the user navigates through the script, different combinations of elements are shown

Example:
```typescript
sequences: [
  [0],       // First show only element at index 0
  [0, 1],    // Then show elements at indices 0 and 1
  [2],       // Then show only element at index 2
  // ...
]
```

## Custom Fonts

The project uses custom fonts from the `/fonts` directory, implemented using Next.js font optimization.
