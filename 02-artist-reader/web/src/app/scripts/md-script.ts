import { Script } from '../context/ScriptContext';

// First presentation - Three text elements
const negroSpiritualsContent = "Negro spirituals";
const neoSpiritualsContent = "Neo-spirituals";
const neoJazzNeoArtContent = "Neo-jazz, neo-art?";

// Art Is... Lorraine O'Grady images
const artImg01 = "/contents/01 Art Is. . . (Cop Eyeing Young Man), performance by Lorraine O'Gra.jpg";
const artImg02 = "/contents/02 Art Is. . . (Framing Cop), performance by Lorraine O'Grady..jpg";
const artImg03 = "/contents/03 Art Is. . . (Girlfriends Times Two), performance by Lorraine O'Gr.jpg";
const artImg04 = "/contents/04 Art Is. . . (Guys in a Crowd), performance by Lorraine O'Grady..jpg";
const artImg05 = "/contents/05 Art Is. . . (Man with a Camera), performance by Lorraine O'Grady..jpg";
const artImg06 = "/contents/06 Art Is. . . (Man with Rings and Child), performance by Lorraine O.jpg";
const artImg07 = "/contents/07 Art Is. . . (Troupe Front), performance by Lorraine O'Grady..jpg";
const artImg08 = "/contents/08 Art Is. . . (Woman and Girl with Stripes), performance by Lorrain.jpg";
const artImg09 = "/contents/09 Art Is. . . (Woman with Man and Cop Watching), performance by Lor.jpg";

// Second presentation - Split Hurston content
const hurston1Content = "\"There never has been a presentation of genuine Negro spirituals to any audience anywhere. What is being sung by the concert artists and glee clubs are the works of Negro composers and adaptors based on the spirituals. […]\"";
const hurston2Content = "\"Negro singing and formal speech are breathy. The audible breathing is part of the performance and various devices are resorted to adorn the breath taking. Even the lack of breath is embellished with syllables. This is, of course, the very antithesis of white vocal art. European singing is considered good when each syllable floats out on a column of air, seeming not to have any mechanics at all. Breathing must be hidden.\"";
const hurston3Content = "\"Each singing of the piece as a new creation. The congregation is bound by no rules. No two times singing is alike, so that we must consider the rendition of a song not as a final thing, but as a mood. It won't be the same thing next Sunday.\"";

// Create script with the updated sequence
const mdScript: Script = {
  id: 'md-script-001',
  title: 'Artist Reader',
  elements: [
    {
      id: 'negro-spirituals',
      type: 'text',
      content: negroSpiritualsContent
    },
    {
      id: 'neo-spirituals',
      type: 'text',
      content: neoSpiritualsContent
    },
    {
      id: 'neo-jazz-neo-art',
      type: 'text',
      content: "art"
    },
    // First set of O'Grady images (01-03)
    {
      id: 'art-img-01',
      type: 'image',
      content: artImg01,
      metadata: {
        alt: "Art Is... (Cop Eyeing Young Man), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    {
      id: 'art-img-02',
      type: 'image',
      content: artImg02,
      metadata: {
        alt: "Art Is... (Framing Cop), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    {
      id: 'art-img-03',
      type: 'image',
      content: artImg03,
      metadata: {
        alt: "Art Is... (Girlfriends Times Two), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    // Second set of O'Grady images (04-06)
    {
      id: 'art-img-04',
      type: 'image',
      content: artImg04,
      metadata: {
        alt: "Art Is... (Guys in a Crowd), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    {
      id: 'art-img-05',
      type: 'image',
      content: artImg05,
      metadata: {
        alt: "Art Is... (Man with a Camera), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    {
      id: 'art-img-06',
      type: 'image',
      content: artImg06,
      metadata: {
        alt: "Art Is... (Man with Rings and Child), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    // Third set of O'Grady images (07-09)
    {
      id: 'art-img-07',
      type: 'image',
      content: artImg07,
      metadata: {
        alt: "Art Is... (Troupe Front), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    {
      id: 'art-img-08',
      type: 'image',
      content: artImg08,
      metadata: {
        alt: "Art Is... (Woman and Girl with Stripes), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    {
      id: 'art-img-09',
      type: 'image',
      content: artImg09,
      metadata: {
        alt: "Art Is... (Woman with Man and Cop Watching), performance by Lorraine O'Grady (1983/2009)"
      }
    },
    // Hurston text elements 
    {
      id: 'hurston-1',
      type: 'text',
      content: hurston1Content,
      metadata: {
        artist: 'Zora Neale Hurston',
      }
    },
    {
      id: 'hurston-2',
      type: 'text',
      content: hurston2Content
    },
    {
      id: 'hurston-3',
      type: 'text',
      content: hurston3Content
    },
  ],
  sequences: [
    [0, 1, 2],                  // 1) First presentation - three text elements with "art" as third element
    [3, 4, 5],                  // 2) First set of O'Grady images (01-03)
    [6, 7, 8],                  // 3) Second set of O'Grady images (04-06)
    [9, 10, 11],                // 4) Third set of O'Grady images (07-09)
    [12, 13, 14]                // 5) Three Hurston paragraphs
  ]
};

export default mdScript;