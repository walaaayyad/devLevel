/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types/quiz.ts';

export const cssQuestions: Question[] = [
  // ===================== BEGINNER (10 Questions) =====================
  {
    id: 'css-beg-001',
    technology: 'css',
    level: 'beginner',
    topic: 'Box Model',
    question: 'What is the default value of the "box-sizing" property in CSS, and how does it calculate element width?',
    options: [
      'content-box: the width applies only to content, and padding/border are added on top of it.',
      'border-box: the width includes content, padding, and border.',
      'margin-box: the width includes content, padding, border, and margin.',
      'inherit: it always takes the value of the parent document container.'
    ],
    correctAnswer: 'content-box: the width applies only to content, and padding/border are added on top of it.',
    explanation: 'By default, elements use box-sizing: content-box. If width: 200px and padding: 20px are set, total rendered width is 240px. Most modern resets use box-sizing: border-box so that width includes padding and border.',
    codeSnippet: `/* With box-sizing: content-box (default) */
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid cyan;
  /* Total rendered width = 200 + 40 + 10 = 250px */
}`,
    learningObjective: 'Master the CSS Box Model calculation and content-box vs border-box.'
  },
  {
    id: 'css-beg-002',
    technology: 'css',
    level: 'beginner',
    topic: 'Selectors',
    question: 'Which CSS selector selects all <p> elements that are direct immediate children of a <div>?',
    options: [
      'div > p',
      'div + p',
      'div ~ p',
      'div p'
    ],
    correctAnswer: 'div > p',
    explanation: 'The child combinator (>) targets elements that are direct children of the specified parent, unlike the descendant selector (div p) which selects all matching descendants at any nested depth.',
    codeSnippet: `/* Selects only direct child paragraphs */
div > p {
  color: #00F5FF;
}`,
    learningObjective: 'Differentiate child combinators from descendant and sibling selectors.'
  },
  {
    id: 'css-beg-003',
    technology: 'css',
    level: 'beginner',
    topic: 'Colors & Typography',
    question: 'What is the relative base unit for the "rem" unit in CSS?',
    options: [
      'The font-size of the root <html> element.',
      'The font-size of the element\'s immediate parent.',
      'The viewport width of the current screen.',
      'The line-height of the enclosing container.'
    ],
    correctAnswer: 'The font-size of the root <html> element.',
    explanation: 'rem stands for "root em" and is relative to the font-size of the root <html> element (usually 16px by default in browsers), making it ideal for scalable typography.',
    learningObjective: 'Understand relative units (rem vs em) for accessible typography.'
  },
  {
    id: 'css-beg-004',
    technology: 'css',
    level: 'beginner',
    topic: 'Display Property',
    question: 'How does an "inline-block" element differ from an "inline" element?',
    options: [
      'inline-block respects width, height, and top/bottom margins/paddings, while inline ignores them.',
      'inline-block forces a new line before and after itself.',
      'inline-block elements cannot contain text.',
      'inline elements cannot be styled with background colors.'
    ],
    correctAnswer: 'inline-block respects width, height, and top/bottom margins/paddings, while inline ignores them.',
    explanation: 'An inline-block element sits inline with adjacent content without breaking onto a new line, but allows explicit width, height, and vertical margins and padding to be applied.',
    codeSnippet: `.badge {
  display: inline-block;
  width: 120px;
  height: 32px;
  margin: 8px; /* Works vertically and horizontally */
}`,
    learningObjective: 'Identify differences between block, inline, and inline-block flow.'
  },
  {
    id: 'css-beg-005',
    technology: 'css',
    level: 'beginner',
    topic: 'Basic Positioning',
    question: 'When an element is styled with position: absolute, which ancestor element does it position itself relative to?',
    options: [
      'The nearest ancestor with a position other than "static".',
      'Always the <body> element.',
      'Its immediate parent element regardless of that parent\'s position.',
      'The document\'s root <html> element.'
    ],
    correctAnswer: 'The nearest ancestor with a position other than "static".',
    explanation: 'An absolute element is removed from the normal document flow and positioned relative to its closest ancestor that has position: relative, absolute, fixed, or sticky. If none exists, it positions relative to the initial containing block.',
    learningObjective: 'Correctly structure containing blocks for absolute positioning.'
  },
  {
    id: 'css-beg-006',
    technology: 'css',
    level: 'beginner',
    topic: 'Margin & Padding',
    question: 'What occurs during "margin collapsing" in standard CSS block layout?',
    options: [
      'Adjoining vertical margins of adjacent block boxes combine into a single margin equal to the larger of the two.',
      'Horizontal margins between inline-block boxes are deleted.',
      'Margins are converted into internal padding when space runs out.',
      'Negative margins cancel out positive paddings automatically.'
    ],
    correctAnswer: 'Adjoining vertical margins of adjacent block boxes combine into a single margin equal to the larger of the two.',
    explanation: 'In block layout, adjacent top and bottom margins of non-floating block elements collapse into a single margin. Margin collapsing does not occur in Flexbox or CSS Grid containers.',
    codeSnippet: `.top-card { margin-bottom: 30px; }
.bottom-card { margin-top: 20px; }
/* Rendered distance between them = 30px (not 50px) */`,
    learningObjective: 'Predict and manage vertical margin collapsing behavior.'
  },
  {
    id: 'css-beg-007',
    technology: 'css',
    level: 'beginner',
    topic: 'Selectors',
    question: 'Which pseudo-class applies styles when a user focuses an element specifically using a keyboard rather than a mouse click?',
    options: [
      ':focus-visible',
      ':focus',
      ':active',
      ':target'
    ],
    correctAnswer: ':focus-visible',
    explanation: ':focus-visible targets elements that receive focus via keyboard navigation (Tab key) or assistive tech, avoiding distracting focus rings during mouse clicks while ensuring accessibility.',
    codeSnippet: `button:focus-visible {
  outline: 2px solid #00F5FF;
  outline-offset: 3px;
}`,
    learningObjective: 'Implement accessible focus styles using :focus-visible.'
  },
  {
    id: 'css-beg-008',
    technology: 'css',
    level: 'beginner',
    topic: 'Colors & Typography',
    question: 'What does the CSS property "line-height: 1.5" represent when written without units?',
    options: [
      '1.5 times the current element\'s font-size.',
      'Exactly 1.5 pixels.',
      '1.5 centimeters.',
      '150% of the root viewport height.'
    ],
    correctAnswer: '1.5 times the current element\'s font-size.',
    explanation: 'Unitless line-height is proportional to the element\'s own font-size. This is preferred because child elements inherit the ratio rather than a fixed pixel calculation.',
    learningObjective: 'Use unitless line-height for proportional typographic scales.'
  },
  {
    id: 'css-beg-009',
    technology: 'css',
    level: 'beginner',
    topic: 'Display Property',
    question: 'What is the visual difference between "visibility: hidden" and "display: none"?',
    options: [
      'visibility: hidden hides the element but preserves its space in the layout; display: none removes it from the layout flow entirely.',
      'display: none only works on text; visibility: hidden works on images.',
      'visibility: hidden disables JavaScript events; display: none does not.',
      'There is no difference; they are identical in rendering.'
    ],
    correctAnswer: 'visibility: hidden hides the element but preserves its space in the layout; display: none removes it from the layout flow entirely.',
    explanation: 'display: none causes the element to produce no box at all (it takes up 0px space). visibility: hidden makes the box invisible, but the element still affects layout and takes up its normal dimensions.',
    learningObjective: 'Understand how hiding elements affects the layout tree and reflows.'
  },
  {
    id: 'css-beg-010',
    technology: 'css',
    level: 'beginner',
    topic: 'Basic Positioning',
    question: 'How does position: fixed behave on a web page?',
    options: [
      'It positions the element relative to the viewport, remaining in the exact same spot during page scrolling.',
      'It fixes the element inside its parent container and scrolls with that parent.',
      'It prevents any CSS transform from moving the element.',
      'It automatically pins the element to the bottom-right corner.'
    ],
    correctAnswer: 'It positions the element relative to the viewport, remaining in the exact same spot during page scrolling.',
    explanation: 'position: fixed positions an element relative to the browser viewport (window), meaning it does not move when the page is scrolled (ideal for sticky headers, floating action buttons, modals).',
    learningObjective: 'Use fixed positioning appropriately for viewport-anchored UI components.'
  },

  // ===================== INTERMEDIATE (10 Questions) =====================
  {
    id: 'css-int-001',
    technology: 'css',
    level: 'intermediate',
    topic: 'Flexbox Layout',
    question: 'In a Flexbox container with flex-direction: row, which property aligns flex items along the cross axis (vertically)?',
    options: [
      'align-items',
      'justify-content',
      'align-content',
      'justify-items'
    ],
    correctAnswer: 'align-items',
    explanation: 'In flex-direction: row, the main axis is horizontal and the cross axis is vertical. justify-content controls main axis alignment, while align-items controls cross axis alignment.',
    codeSnippet: `.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* Main axis (horizontal) */
  align-items: center;            /* Cross axis (vertical) */
}`,
    learningObjective: 'Master main vs cross axis alignment in Flexbox.'
  },
  {
    id: 'css-int-002',
    technology: 'css',
    level: 'intermediate',
    topic: 'CSS Specificity',
    question: 'Which of the following selectors has the highest specificity weight in CSS cascade calculations?',
    options: [
      '#nav .active',
      '.header .nav .item.active',
      'nav ul li a:hover',
      'div.container > p'
    ],
    correctAnswer: '#nav .active',
    explanation: 'Specificity is counted as (ID, Class/Attribute/Pseudo-class, Element). #nav .active has 1 ID and 1 Class (1, 1, 0). .header .nav .item.active has 4 Classes (0, 4, 0). An ID always outweighs any number of class selectors.',
    learningObjective: 'Calculate and resolve CSS selector specificity conflicts.'
  },
  {
    id: 'css-int-003',
    technology: 'css',
    level: 'intermediate',
    topic: 'CSS Grid',
    question: 'What does the CSS Grid declaration "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))" accomplish?',
    options: [
      'Creates a responsive grid where columns are at least 250px wide and expand to fill available space, wrapping without media queries.',
      'Limits the grid to exactly four columns of 250px.',
      'Repeats 250 rows vertically until the viewport is filled.',
      'Forces all columns to remain 250px regardless of screen width.'
    ],
    correctAnswer: 'Creates a responsive grid where columns are at least 250px wide and expand to fill available space, wrapping without media queries.',
    explanation: 'repeat(auto-fit, minmax(250px, 1fr)) dynamically computes how many 250px columns fit in the container and stretches them to fill the remaining space with 1fr, creating auto-responsive grids without media queries.',
    codeSnippet: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}`,
    learningObjective: 'Build responsive auto-wrapping layouts with CSS Grid.'
  },
  {
    id: 'css-int-004',
    technology: 'css',
    level: 'intermediate',
    topic: 'Responsive Design & Media Queries',
    question: 'In a mobile-first responsive architecture, which media query feature should predominantly be used for breakpoints?',
    options: [
      'min-width',
      'max-width',
      'max-device-width',
      'orientation: portrait'
    ],
    correctAnswer: 'min-width',
    explanation: 'Mobile-first design establishes default base styles for the smallest screens without media queries, then uses @media (min-width: ...) to progressively layer styles and enhancements for larger screens.',
    codeSnippet: `/* Base: 1 column on mobile */
.cards { display: grid; grid-template-columns: 1fr; }

/* Desktop enhancement */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}`,
    learningObjective: 'Structure scalable mobile-first media query architectures.'
  },
  {
    id: 'css-int-005',
    technology: 'css',
    level: 'intermediate',
    topic: 'Flexbox Layout',
    question: 'What does the shorthand declaration "flex: 1 1 0%" mean for a flex item?',
    options: [
      'flex-grow: 1, flex-shrink: 1, flex-basis: 0% (item shares remaining space equally regardless of content size).',
      'flex-grow: 1, flex-shrink: 0, flex-basis: 100%.',
      'The item is 1px wide and does not shrink.',
      'The item has an animation duration of 1 second.'
    ],
    correctAnswer: 'flex-grow: 1, flex-shrink: 1, flex-basis: 0% (item shares remaining space equally regardless of content size).',
    explanation: 'flex: 1 1 0% sets grow to 1, shrink to 1, and basis to 0%. This distributes space equally among items, ignoring initial content size differences (unlike flex: 1 1 auto).',
    learningObjective: 'Configure flex-grow, flex-shrink, and flex-basis shorthands accurately.'
  },
  {
    id: 'css-int-006',
    technology: 'css',
    level: 'intermediate',
    topic: 'CSS Transitions',
    question: 'Which of the following CSS properties can be animated smoothly by the browser GPU on the compositor thread without triggering layout reflow?',
    options: [
      'transform and opacity',
      'width and height',
      'top, left, and margin',
      'padding and font-size'
    ],
    correctAnswer: 'transform and opacity',
    explanation: 'transform and opacity can be processed directly on the compositor thread by the GPU without recalculating layout geometry or repainting, preventing jank and maintaining 60fps animations.',
    codeSnippet: `.card {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}
.card:hover {
  transform: translateY(-4px) scale(1.02);
  opacity: 0.95;
}`,
    learningObjective: 'Select performant CSS animation properties for high frame rates.'
  },
  {
    id: 'css-int-007',
    technology: 'css',
    level: 'intermediate',
    topic: 'Pseudo-classes & Elements',
    question: 'What is the key difference between a pseudo-class (e.g. :hover) and a pseudo-element (e.g. ::before)?',
    options: [
      'Pseudo-classes select an element based on its state; pseudo-elements create or style a specific sub-part/virtual element in the DOM.',
      'Pseudo-classes use double colons (::), while pseudo-elements use single colons (:).',
      'Pseudo-elements can only be applied to images.',
      'Pseudo-classes cannot be combined with class selectors.'
    ],
    correctAnswer: 'Pseudo-classes select an element based on its state; pseudo-elements create or style a specific sub-part/virtual element in the DOM.',
    explanation: 'A pseudo-class (:hover, :focus, :first-child) matches an element in a specific dynamic state. A pseudo-element (::before, ::after, ::placeholder) creates an abstraction of a sub-element not in the HTML.',
    learningObjective: 'Distinguish between state-based pseudo-classes and structural pseudo-elements.'
  },
  {
    id: 'css-int-008',
    technology: 'css',
    level: 'intermediate',
    topic: 'CSS Custom Properties',
    question: 'How do you define a fallback value when reading a CSS custom property (variable)?',
    options: [
      'var(--theme-accent, #00F5FF)',
      'var(--theme-accent || #00F5FF)',
      'get(--theme-accent, default: #00F5FF)',
      '--theme-accent: fallback(#00F5FF)'
    ],
    correctAnswer: 'var(--theme-accent, #00F5FF)',
    explanation: 'The var() function accepts an optional second argument as a fallback value (e.g., var(--custom-color, #00F5FF)), which is used if the custom property is undefined or invalid.',
    codeSnippet: `.button {
  background-color: var(--dev-accent, #00F5FF);
}`,
    learningObjective: 'Utilize CSS custom property fallback mechanisms.'
  },
  {
    id: 'css-int-009',
    technology: 'css',
    level: 'intermediate',
    topic: 'CSS Grid',
    question: 'How does "gap: 20px" work in modern CSS Grid and Flexbox?',
    options: [
      'It creates 20px spacing strictly between items, without adding extra space on outer container edges.',
      'It applies 20px margin around every child element including outer edges.',
      'It adds 20px internal padding to each child item.',
      'It only applies horizontally, never between rows.'
    ],
    correctAnswer: 'It creates 20px spacing strictly between items, without adding extra space on outer container edges.',
    explanation: 'The gap property (row-gap and column-gap) applies gutters strictly between adjacent grid tracks or flex items, eliminating the need for old negative margin hacks or :last-child margin resets.',
    learningObjective: 'Use gap property for gutter management in modern layouts.'
  },
  {
    id: 'css-int-010',
    technology: 'css',
    level: 'intermediate',
    topic: 'Responsive Design',
    question: 'What is the purpose of the CSS media query "@media (prefers-reduced-motion: reduce)"?',
    options: [
      'Detects if the user has requested the system to minimize non-essential animations for vestibular or cognitive health.',
      'Forces the browser to cap CSS animation frame rates at 30fps.',
      'Disables all CSS video playback on mobile devices.',
      'Compresses CSS file payloads over slow cellular networks.'
    ],
    correctAnswer: 'Detects if the user has requested the system to minimize non-essential animations for vestibular or cognitive health.',
    explanation: 'prefers-reduced-motion is an accessibility media feature. When users enable reduced motion in their OS, developers should disable or minimize parallax, large translations, and spinning animations.',
    codeSnippet: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
    learningObjective: 'Implement accessible motion design respecting user motion preferences.'
  },

  // ===================== ADVANCED (10 Questions) =====================
  {
    id: 'css-adv-001',
    technology: 'css',
    level: 'advanced',
    topic: 'Modern CSS Selectors',
    question: 'How does the :has() relational pseudo-class alter CSS architecture?',
    options: [
      'It acts as a parent and previous-sibling selector, styling an element based on its descendants or subsequent siblings.',
      'It checks if a CSS variable has been defined in the root stylesheet.',
      'It validates if an image file has completed downloading.',
      'It enables JavaScript conditional logic inside CSS rule blocks.'
    ],
    correctAnswer: 'It acts as a parent and previous-sibling selector, styling an element based on its descendants or subsequent siblings.',
    explanation: ':has() allows an element to be selected based on its children or siblings (e.g. form:has(:invalid) or article:has(img)). Historically called the "parent selector", it removes the need for JS class toggling for parent state.',
    codeSnippet: `/* Style the card container when it contains an active badge */
.card:has(.badge--featured) {
  border-color: #00F5FF;
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
}`,
    learningObjective: 'Apply the :has() relational selector to eliminate parent-toggle JS.'
  },
  {
    id: 'css-adv-002',
    technology: 'css',
    level: 'advanced',
    topic: 'CSS Stacking Contexts',
    question: 'Which of the following properties creates a brand new stacking context on an element?',
    options: [
      'filter: blur(5px) or opacity < 1',
      'display: flex with z-index: auto',
      'margin: auto',
      'border-radius: 12px'
    ],
    correctAnswer: 'filter: blur(5px) or opacity < 1',
    explanation: 'Properties like opacity < 1, filter, transform, will-change, perspective, and isolation: isolate form a new stacking context. Child elements with high z-index inside this context cannot escape above external siblings.',
    codeSnippet: `.modal-container {
  opacity: 0.99; /* Creates a new stacking context! */
}
.tooltip {
  position: absolute;
  z-index: 99999; /* Trapped inside .modal-container's stack! */
}`,
    learningObjective: 'Diagnose and control stacking context creation and z-index bugs.'
  },
  {
    id: 'css-adv-003',
    technology: 'css',
    level: 'advanced',
    topic: 'CSS Specificity & Modern Tools',
    question: 'What is the specificity weight difference between :is(.classA, #idB) and :where(.classA, #idB)?',
    options: [
      ':is() takes the specificity of its most specific argument; :where() always has 0 specificity.',
      ':where() takes the highest specificity, while :is() averages them.',
      ':is() has 10 specificity points; :where() has 1 specificity point.',
      'There is no difference; they are aliases for browser compatibility.'
    ],
    correctAnswer: ':is() takes the specificity of its most specific argument; :where() always has 0 specificity.',
    explanation: ':where() always has zero specificity (0, 0, 0), making it ideal for base resets and design systems that are easy to override. In contrast, :is() adopts the specificity of its most specific selector inside the list.',
    codeSnippet: `/* Specificity = (0, 0, 0) -> easily overridden anywhere */
:where(h1, h2, h3) {
  margin-top: 1.5rem;
}`,
    learningObjective: 'Manage specificity escalation with :where() and :is().'
  },
  {
    id: 'css-adv-004',
    technology: 'css',
    level: 'advanced',
    topic: 'CSS Cascade Layers',
    question: 'In CSS Cascade Layers (@layer), how is priority resolved when unlayered styles clash with layered styles?',
    options: [
      'Unlayered styles always take precedence over normal styles declared inside any @layer.',
      'Styles in the first declared @layer always win.',
      'The @layer with the longest name takes priority.',
      'Layered styles always override unlayered styles regardless of specificity.'
    ],
    correctAnswer: 'Unlayered styles always take precedence over normal styles declared inside any @layer.',
    explanation: 'In the cascade algorithm, unlayered normal styles have higher priority than any normal @layer styles. (For !important rules, the inversion applies: earlier layers override later layers and unlayered rules).',
    codeSnippet: `@layer base, components, utilities;

@layer components {
  .btn { background: cyan; }
}

/* Unlayered rule: Wins regardless of specificity! */
.btn { background: purple; }`,
    learningObjective: 'Architect component libraries and design tokens using CSS @layer.'
  },
  {
    id: 'css-adv-005',
    technology: 'css',
    level: 'advanced',
    topic: 'CSS Subgrid',
    question: 'What problem does "grid-template-columns: subgrid" solve in nested component design?',
    options: [
      'Allows a nested child grid to inherit and align with the tracks of its parent grid.',
      'Creates 3D isometric perspectives using hardware acceleration.',
      'Divides a single grid cell into a fixed 12-column sub-system.',
      'Automatically generates media queries for nested tables.'
    ],
    correctAnswer: 'Allows a nested child grid to inherit and align with the tracks of its parent grid.',
    explanation: 'subgrid lets child elements participate in the track sizing of their ancestor grid, allowing items inside separate cards (like titles, descriptions, buttons) to align perfectly with each other across different rows/columns.',
    codeSnippet: `.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* Matches parent's 3 row tracks */
}`,
    learningObjective: 'Align multi-level nested UI components using CSS Subgrid.'
  },
  {
    id: 'css-adv-006',
    technology: 'css',
    level: 'advanced',
    topic: 'Container Queries',
    question: 'What is the primary architectural difference between a CSS Container Query (@container) and a Media Query (@media)?',
    options: [
      '@container styles elements based on the dimensions of their parent container rather than the overall browser viewport.',
      '@container only works on flex containers, not grid containers.',
      '@container requires JavaScript MutationObserver polyfill in all browsers.',
      '@media cannot evaluate pixel widths.'
    ],
    correctAnswer: '@container styles elements based on the dimensions of their parent container rather than the overall browser viewport.',
    explanation: 'Container queries evaluate the size of a designated ancestor container (using container-type: inline-size), enabling truly modular, reusable components that adapt whether placed in a narrow sidebar or a wide main feed.',
    codeSnippet: `.card-container {
  container-type: inline-size;
}

@container (min-width: 480px) {
  .card-layout {
    display: flex;
    flex-direction: row;
  }
}`,
    learningObjective: 'Implement modular responsive components with CSS Container Queries.'
  },
  {
    id: 'css-adv-007',
    technology: 'css',
    level: 'advanced',
    topic: 'CSS Performance & Containment',
    question: 'What does the CSS property "content-visibility: auto" do to optimize rendering of long pages?',
    options: [
      'Skips rendering work (layout and paint) for offscreen elements until they approach the viewport.',
      'Hides duplicate HTML tags automatically.',
      'Compresses the DOM tree into WebAssembly memory.',
      'Caches SVG icons in browser localStorage.'
    ],
    correctAnswer: 'Skips rendering work (layout and paint) for offscreen elements until they approach the viewport.',
    explanation: 'content-visibility: auto tells the browser to skip layout and painting for elements outside the viewport. Paired with contain-intrinsic-size, it dramatically reduces Initial Load and DOM calculation time.',
    codeSnippet: `.feed-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 350px; /* Estimates height to prevent scrollbar jump */
}`,
    learningObjective: 'Optimize DOM rendering times on content-heavy pages with content-visibility.'
  },
  {
    id: 'css-adv-008',
    technology: 'css',
    level: 'advanced',
    topic: 'Modern CSS Layouts',
    question: 'What does "clamp(1rem, 2.5vw, 2.5rem)" evaluate to in CSS?',
    options: [
      'A fluid value that scales with 2.5% of viewport width, clamped between a minimum of 1rem and a maximum of 2.5rem.',
      'A random number between 1rem and 2.5rem.',
      'An animation curve that oscillates between 1rem and 2.5rem.',
      'A flex-basis that resets to 2.5vw on mobile devices.'
    ],
    correctAnswer: 'A fluid value that scales with 2.5% of viewport width, clamped between a minimum of 1rem and a maximum of 2.5rem.',
    explanation: 'clamp(MIN, VAL, MAX) enables fluid typography and sizing: it resolves to VAL (2.5vw), but will never drop below MIN (1rem) or exceed MAX (2.5rem), providing smooth responsiveness without breakpoint jumps.',
    learningObjective: 'Construct fluid typography and spacing scales using clamp().'
  },
  {
    id: 'css-adv-009',
    technology: 'css',
    level: 'advanced',
    topic: 'CSS Custom Properties & Typed OM',
    question: 'What is the main benefit of registering a custom property using @property in modern CSS?',
    options: [
      'It allows custom properties to have a typed syntax, inheritance control, initial value, and enables smooth CSS transitions/animations on them.',
      'It encrypts custom property values against reverse engineering in DevTools.',
      'It makes CSS variables accessible from Node.js backend servers.',
      'It prevents CSS variables from cascading to child elements.'
    ],
    correctAnswer: 'It allows custom properties to have a typed syntax, inheritance control, initial value, and enables smooth CSS transitions/animations on them.',
    explanation: 'By default, CSS variables cannot be animated because browsers parse them as raw token streams. @property gives them a type (<color>, <percentage>, <angle>), allowing the browser to interpolate them smoothly in transitions and keyframes.',
    codeSnippet: `@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}`,
    learningObjective: 'Register typed CSS properties with @property for animatable custom properties.'
  },
  {
    id: 'css-adv-010',
    technology: 'css',
    level: 'advanced',
    topic: 'CSS Grid & Flexbox Architecture',
    question: 'Why does auto-fit differ from auto-fill in repeat(auto-fit/fill, minmax(200px, 1fr)) when there is excess row space?',
    options: [
      'auto-fit collapses empty tracks to 0px allowing existing items to expand; auto-fill preserves empty tracks as physical slots in the grid.',
      'auto-fit wraps vertically; auto-fill wraps horizontally.',
      'auto-fill is deprecated in CSS Grid Level 2.',
      'auto-fit requires an explicit row count.'
    ],
    correctAnswer: 'auto-fit collapses empty tracks to 0px allowing existing items to expand; auto-fill preserves empty tracks as physical slots in the grid.',
    explanation: 'If a container has room for 5 columns of 200px but only 2 items exist: auto-fill keeps the 3 empty columns intact, whereas auto-fit collapses the empty tracks to 0px so the 2 items expand (via 1fr) to fill the entire container.',
    learningObjective: 'Master auto-fit versus auto-fill behavior in flexible grid tracks.'
  }
];
