import { Script } from '../context/ScriptContext';

// Sample script to demonstrate the format
const sampleScript: Script = {
  id: 'sample-script-001',
  title: 'Sample Script',
  elements: [
    {
      id: 'text-1',
      type: 'text',
      content: 'This is the first text element in the script.',
      metadata: {
        title: 'Introduction',
      }
    },
    {
      id: 'text-2',
      type: 'text',
      content: 'This is the second text element that will be shown later.',
      metadata: {
        title: 'Second Paragraph',
      }
    },
    {
      id: 'image-1',
      type: 'image',
      content: '/images/sample-image-1.jpg',
      metadata: {
        caption: 'Sample image caption',
        alt: 'Description of the sample image'
      }
    },
    {
      id: 'video-1',
      type: 'video',
      content: '123456789', // Vimeo ID
      metadata: {
        title: 'Sample Video',
        caption: 'This is a sample video from Vimeo'
      }
    },
    {
      id: 'text-3',
      type: 'text',
      content: 'This is the final text element that appears at the end.',
      metadata: {
        title: 'Conclusion',
      }
    },
  ],
  
  // Define the sequence of elements to display
  // Each array represents a "state" in the presentation
  // Elements are referenced by their index in the elements array
  sequences: [
    [0], // First show only the first text
    [0, 1], // Then show first and second text
    [0, 1, 2], // Then add the image
    [3], // Then show only the video
    [3, 4], // Finally show the video and conclusion text
  ]
};

export default sampleScript;