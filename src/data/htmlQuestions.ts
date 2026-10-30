/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types/quiz.ts';

export const htmlQuestions: Question[] = [
  // ===================== BEGINNER (10 Questions) =====================
  {
    id: 'html-beg-001',
    technology: 'html',
    level: 'beginner',
    topic: 'HTML Document Structure',
    question: 'What is the primary purpose of the <!DOCTYPE html> declaration at the beginning of an HTML file?',
    options: [
      'It tells the browser to render the page in standard compliance mode rather than quirks mode.',
      'It links the HTML document to the HTML5 specification servers.',
      'It defines the security boundary and content security policy for the document.',
      'It is an HTML element that encloses the root <html> tag.'
    ],
    correctAnswer: 'It tells the browser to render the page in standard compliance mode rather than quirks mode.',
    explanation: 'The <!DOCTYPE html> preamble instructs web browsers to render the page using standard mode following modern HTML specifications, avoiding legacy quirks mode.',
    codeSnippet: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
  </head>
  <body>...</body>
</html>`,
    learningObjective: 'Understand standard HTML5 document structure and doctype rendering modes.'
  },
  {
    id: 'html-beg-002',
    technology: 'html',
    level: 'beginner',
    topic: 'Common HTML Elements',
    question: 'Which HTML element should wrap primary navigation links across a website?',
    options: [
      '<nav>',
      '<menu>',
      '<section>',
      '<header>'
    ],
    correctAnswer: '<nav>',
    explanation: 'The <nav> element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents.',
    codeSnippet: `<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,
    learningObjective: 'Use semantic navigation containers for accessibility and structure.'
  },
  {
    id: 'html-beg-003',
    technology: 'html',
    level: 'beginner',
    topic: 'Headings & Paragraphs',
    question: 'What is the recommended rule for using heading tags (<h1> through <h6>) on a webpage?',
    options: [
      'Headings must reflect the conceptual outline hierarchy of content without skipping levels.',
      'Headings should be chosen strictly based on how large you want the text to look.',
      'Every web page must include at least three <h1> tags for search engines.',
      'Heading tags can only be placed inside the <header> element.'
    ],
    correctAnswer: 'Headings must reflect the conceptual outline hierarchy of content without skipping levels.',
    explanation: 'Headings provide a structural document outline for assistive technologies and users. They should follow a logical hierarchy (h1 -> h2 -> h3) rather than being selected for visual sizing.',
    learningObjective: 'Apply hierarchical heading structures for assistive tech and SEO.'
  },
  {
    id: 'html-beg-004',
    technology: 'html',
    level: 'beginner',
    topic: 'Links & Images',
    question: 'What is the primary function of the "alt" attribute on an <img> tag?',
    options: [
      'Provides textual alternative for screen readers and displays when the image fails to load.',
      'Sets a hover tooltip popup text for desktop users.',
      'Defines the fallback image URL if the primary source fails.',
      'Specifies an alternative layout alignment for CSS.'
    ],
    correctAnswer: 'Provides textual alternative for screen readers and displays when the image fails to load.',
    explanation: 'The alt attribute provides alternative information for an image if a user cannot view it (due to slow connection, visual impairment using screen reader, or broken link).',
    codeSnippet: `<img 
  src="/assets/profile.jpg" 
  alt="Portrait of Sarah Chen, Chief Architect at DevLevel" 
  width="400" 
  height="400"
/>`,
    learningObjective: 'Ensure all non-decorative imagery provides accurate descriptive text.'
  },
  {
    id: 'html-beg-005',
    technology: 'html',
    level: 'beginner',
    topic: 'Basic Forms',
    question: 'How should an accessible text input be programmatically connected to its label in HTML?',
    options: [
      'Assign the input an id and match it with the label element\'s "for" attribute.',
      'Place the label and input inside the same <div> container with identical class names.',
      'Use the "name" attribute on both the input and the label tag.',
      'Set the placeholder attribute on the input to match the label text.'
    ],
    correctAnswer: 'Assign the input an id and match it with the label element\'s "for" attribute.',
    explanation: 'Using the for attribute on the <label> matching the id of the <input> establishes an accessible relationship, allowing screen readers to announce the label and expanding the clickable target area.',
    codeSnippet: `<label for="email-field">Email Address</label>
<input id="email-field" type="email" name="user_email" required />`,
    learningObjective: 'Properly associate form inputs with descriptive label elements.'
  },
  {
    id: 'html-beg-006',
    technology: 'html',
    level: 'beginner',
    topic: 'Semantic HTML Fundamentals',
    question: 'Which element is designed to enclose self-contained content that could be distributed independently, like a blog post or news item?',
    options: [
      '<article>',
      '<section>',
      '<aside>',
      '<main>'
    ],
    correctAnswer: '<article>',
    explanation: 'The <article> element specifies independent, self-contained content that makes sense on its own and could be syndicated or reused across different contexts.',
    learningObjective: 'Distinguish between <article>, <section>, and generic containers.'
  },
  {
    id: 'html-beg-007',
    technology: 'html',
    level: 'beginner',
    topic: 'Lists & Tables',
    question: 'What is the correct HTML markup structure for a data table with column headers?',
    options: [
      '<table> <thead> <tr> <th> </th> </tr> </thead> <tbody> <tr> <td> </td> </tr> </tbody> </table>',
      '<table> <tr> <header> <td> </td> </header> </tr> <tr> <td> </td> </tr> </table>',
      '<table> <colgroup> <tr> <dt> </dt> </tr> </colgroup> <tbody> <tr> <dd> </dd> </tr> </tbody> </table>',
      '<datatable> <columns> <col> </col> </columns> <rows> <row> </row> </rows> </datatable>'
    ],
    correctAnswer: '<table> <thead> <tr> <th> </th> </tr> </thead> <tbody> <tr> <td> </td> </tr> </tbody> </table>',
    explanation: 'Accessible HTML tables use <thead> with <tr> and <th> (table header) cells, followed by <tbody> containing <tr> and <td> (table data) cells.',
    learningObjective: 'Structure data tables semantically for tabular content.'
  },
  {
    id: 'html-beg-008',
    technology: 'html',
    level: 'beginner',
    topic: 'Links & Images',
    question: 'When creating an anchor link that opens in a new tab using target="_blank", what security attributes should be included?',
    options: [
      'rel="noopener noreferrer"',
      'security="sandbox"',
      'target="secure"',
      'crossorigin="anonymous"'
    ],
    correctAnswer: 'rel="noopener noreferrer"',
    explanation: 'Using rel="noopener noreferrer" prevents the opened page from accessing window.opener (which could allow reverse tabnabbing phishing attacks) and avoids sending the Referer header.',
    codeSnippet: `<a 
  href="https://external-docs.example.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  External Documentation
</a>`,
    learningObjective: 'Secure outgoing links against tabnabbing and referrer leakage.'
  },
  {
    id: 'html-beg-009',
    technology: 'html',
    level: 'beginner',
    topic: 'Common HTML Elements',
    question: 'What is the semantic difference between <strong> and <b> in HTML5?',
    options: [
      '<strong> conveys strong importance or urgency for the text, while <b> draws attention without extra importance.',
      '<strong> is only for styling bold text, while <b> communicates semantic weight to screen readers.',
      '<strong> has been deprecated in HTML5 in favor of CSS font-weight.',
      'There is no semantic difference; they are exact aliases in modern browsers.'
    ],
    correctAnswer: '<strong> conveys strong importance or urgency for the text, while <b> draws attention without extra importance.',
    explanation: 'In HTML5, <strong> represents strong importance, seriousness, or urgency (affecting speech synthesis), whereas <b> is used to draw the reader\'s attention to a span of text for utilitarian purposes without semantic importance.',
    learningObjective: 'Differentiate between semantic importance and stylistic highlighting.'
  },
  {
    id: 'html-beg-010',
    technology: 'html',
    level: 'beginner',
    topic: 'Semantic HTML Fundamentals',
    question: 'Which element represents tangentially related content such as sidebars, callout boxes, or advertising?',
    options: [
      '<aside>',
      '<section>',
      '<footer>',
      '<details>'
    ],
    correctAnswer: '<aside>',
    explanation: 'The <aside> element represents a portion of a document whose content is only indirectly related to the document\'s main content (e.g. sidebars, glossaries, related links).',
    learningObjective: 'Organize secondary and supplementary content with <aside>.'
  },

  // ===================== INTERMEDIATE (10 Questions) =====================
  {
    id: 'html-int-001',
    technology: 'html',
    level: 'intermediate',
    topic: 'Semantic Elements & Layout',
    question: 'How many <main> elements can be visible and active on an HTML page at once?',
    options: [
      'Exactly one visible <main> element representing the dominant content of the document.',
      'As many as needed, provided each is nested inside an <article> or <section>.',
      'Two: one for mobile viewports and one for desktop viewports.',
      'There is no limit on <main> elements in HTML5 specifications.'
    ],
    correctAnswer: 'Exactly one visible <main> element representing the dominant content of the document.',
    explanation: 'A document must not have more than one <main> element that does not have the hidden attribute specified. The content of <main> should be unique to the document and exclude repeated site headers/footers.',
    learningObjective: 'Enforce correct usage of landmark regions in document architecture.'
  },
  {
    id: 'html-int-002',
    technology: 'html',
    level: 'intermediate',
    topic: 'Form Attributes & Validation',
    question: 'What is the effect of the "autocomplete" attribute set to "new-password" on an input field?',
    options: [
      'It signals password managers that this field is for creating a new password, preventing auto-filling the current one.',
      'It forces the browser to validate that the password meets complexity requirements.',
      'It automatically masks the characters with asterisks.',
      'It tells the server to bypass hash verification.'
    ],
    correctAnswer: 'It signals password managers that this field is for creating a new password, preventing auto-filling the current one.',
    explanation: 'autocomplete="new-password" instructs browsers and password managers that the field represents a new password being generated (e.g. during signup or password change), avoiding inappropriate autofill.',
    codeSnippet: `<input 
  type="password" 
  name="pwd" 
  id="pwd" 
  autocomplete="new-password" 
  minlength="8" 
  required 
/>`,
    learningObjective: 'Configure browser autofill and credential management attributes.'
  },
  {
    id: 'html-int-003',
    technology: 'html',
    level: 'intermediate',
    topic: 'Accessibility Fundamentals',
    question: 'When should an image have an empty alt attribute (alt="") in HTML?',
    options: [
      'When the image is purely decorative and its absence does not deprive the user of any information.',
      'When the image URL contains a descriptive file name.',
      'When the image is loaded lazily with loading="lazy".',
      'Whenever the image has an adjacent <figcaption> element.'
    ],
    correctAnswer: 'When the image is purely decorative and its absence does not deprive the user of any information.',
    explanation: 'An empty alt="" (null alt) tells screen readers that the image is purely decorative and can be safely ignored. Omitting the alt attribute entirely causes screen readers to read the file name instead.',
    learningObjective: 'Distinguish between informative and purely decorative images for a11y.'
  },
  {
    id: 'html-int-004',
    technology: 'html',
    level: 'intermediate',
    topic: 'Metadata & Viewport',
    question: 'Why is the meta viewport tag critical for mobile web responsiveness?',
    options: [
      'It tells mobile browsers to match the virtual viewport width to device width and sets the initial zoom scale.',
      'It triggers the download of mobile-specific CSS style sheets.',
      'It enables touch gestures and hardware acceleration on mobile GPUs.',
      'It compresses images automatically for smaller screen resolutions.'
    ],
    correctAnswer: 'It tells mobile browsers to match the virtual viewport width to device width and sets the initial zoom scale.',
    explanation: 'Without <meta name="viewport" content="width=device-width, initial-scale=1.0">, mobile browsers assume a desktop viewport (~980px) and scale the rendered page down, breaking responsive CSS media queries.',
    codeSnippet: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    learningObjective: 'Properly configure viewport metadata for responsive rendering.'
  },
  {
    id: 'html-int-005',
    technology: 'html',
    level: 'intermediate',
    topic: 'Forms & Validation',
    question: 'Which HTML form attribute allows a client-side regex check before submission without custom JavaScript?',
    options: [
      'pattern',
      'validate',
      'regex',
      'match'
    ],
    correctAnswer: 'pattern',
    explanation: 'The pattern attribute specifies a regular expression that the input\'s value must match against for the form to be valid upon submission.',
    codeSnippet: `<input 
  type="text" 
  name="zipcode" 
  pattern="[0-9]{5}" 
  title="Five-digit US ZIP code" 
  required 
/>`,
    learningObjective: 'Utilize native HTML5 constraint validation attributes.'
  },
  {
    id: 'html-int-006',
    technology: 'html',
    level: 'intermediate',
    topic: 'Accessibility Fundamentals',
    question: 'What is the role of ARIA landmarks like role="region" or role="search" when used with HTML5?',
    options: [
      'They identify functional areas of the page for screen reader navigation when native semantic HTML is insufficient.',
      'They change the CSS display property of the element to flexbox.',
      'They prevent search engine crawlers from indexing that part of the page.',
      'They require an immediate JavaScript polyfill to function.'
    ],
    correctAnswer: 'They identify functional areas of the page for screen reader navigation when native semantic HTML is insufficient.',
    explanation: 'ARIA landmarks help assistive technology users jump directly to sections of a page. However, rule #1 of ARIA is: if a native HTML element (like <nav>, <header>, <main>) provides the semantics, prefer the native tag.',
    learningObjective: 'Understand how and when to augment HTML with ARIA roles.'
  },
  {
    id: 'html-int-007',
    technology: 'html',
    level: 'intermediate',
    topic: 'Modern HTML Features',
    question: 'What does the native <details> and <summary> pair provide in modern HTML?',
    options: [
      'A native disclosure widget that expands and collapses content without needing JavaScript.',
      'A modal dialog with automatic backdrop backdrop-filter.',
      'A tool to display summaries of mathematical equations.',
      'A preview tooltip when hovering over text.'
    ],
    correctAnswer: 'A native disclosure widget that expands and collapses content without needing JavaScript.',
    explanation: 'The <details> element creates a native toggleable disclosure widget. Clicking the nested <summary> opens or closes the content, updating the open attribute automatically.',
    codeSnippet: `<details>
  <summary>View System Requirements</summary>
  <p>Node.js >= 18.0, 4GB RAM minimum.</p>
</details>`,
    learningObjective: 'Leverage native HTML interactive disclosure components.'
  },
  {
    id: 'html-int-008',
    technology: 'html',
    level: 'intermediate',
    topic: 'Images & Media',
    question: 'What is the main advantage of the <picture> element over a plain <img> with srcset?',
    options: [
      'It supports art direction by switching image crops/sources based on media conditions and format types (AVIF/WebP).',
      'It automatically resizes the image on the server using machine learning.',
      'It converts JPEG images into vector SVGs in the browser.',
      'It caches images in IndexedDB across user sessions.'
    ],
    correctAnswer: 'It supports art direction by switching image crops/sources based on media conditions and format types (AVIF/WebP).',
    explanation: '<picture> wraps multiple <source> elements allowing developers to provide different image crops for different screen sizes (art direction) or modern formats like AVIF/WebP with fallback to JPG.',
    codeSnippet: `<picture>
  <source media="(min-width: 1024px)" srcset="hero-desktop.webp" type="image/webp">
  <source srcset="hero-mobile.webp" type="image/webp">
  <img src="hero-fallback.jpg" alt="DevLevel learning interface">
</picture>`,
    learningObjective: 'Implement art-directed responsive images and modern image formats.'
  },
  {
    id: 'html-int-009',
    technology: 'html',
    level: 'intermediate',
    topic: 'Metadata & Viewport',
    question: 'What does the attribute loading="lazy" do when added to an <img> element?',
    options: [
      'Defers loading the image until it reaches a calculated distance from the viewport.',
      'Lowers the quality of the image until the user hovers over it.',
      'Loads the image in a background Web Worker thread.',
      'Waits until window.onload fires before initiating the request.'
    ],
    correctAnswer: 'Defers loading the image until it reaches a calculated distance from the viewport.',
    explanation: 'Native loading="lazy" instructs the browser to defer fetching the offscreen resource until the user scrolls near it, saving bandwidth and improving Initial Server Response / LCP.',
    learningObjective: 'Optimize performance using native lazy loading.'
  },
  {
    id: 'html-int-010',
    technology: 'html',
    level: 'intermediate',
    topic: 'Modern HTML Features',
    question: 'How do you correctly open a native <dialog> element as a modal that traps focus and renders a backdrop?',
    options: [
      'Call dialogElement.showModal() in JavaScript.',
      'Set the attribute <dialog modal="true">.',
      'Call dialogElement.show() in JavaScript.',
      'Add the CSS class "modal-active" to the dialog element.'
    ],
    correctAnswer: 'Call dialogElement.showModal() in JavaScript.',
    explanation: 'Calling dialog.showModal() opens the dialog as a true modal on the top layer, rendering a ::backdrop, trapping keyboard focus, and handling Esc key dismissal automatically.',
    codeSnippet: `<dialog id="confirm-modal">
  <h2>Confirm Action</h2>
  <button id="close-btn">Close</button>
</dialog>
<script>
  const dialog = document.getElementById('confirm-modal');
  dialog.showModal(); // Opens as top-layer modal
</script>`,
    learningObjective: 'Use the native HTML dialog element with correct modal APIs.'
  },

  // ===================== ADVANCED (10 Questions) =====================
  {
    id: 'html-adv-001',
    technology: 'html',
    level: 'advanced',
    topic: 'Browser Parsing & Script Execution',
    question: 'What is the exact execution and parsing difference between <script defer> and <script async>?',
    options: [
      'defer downloads in parallel and executes in document order after parsing; async downloads in parallel and executes immediately upon completion.',
      'async guarantees execution order while defer does not.',
      'defer blocks DOM parsing while downloading; async does not.',
      'defer is only supported in Internet Explorer while async is the modern standard.'
    ],
    correctAnswer: 'defer downloads in parallel and executes in document order after parsing; async downloads in parallel and executes immediately upon completion.',
    explanation: 'Both download scripts asynchronously without blocking HTML parsing. defer scripts execute in document order right before DOMContentLoaded, whereas async scripts execute as soon as they finish downloading, interrupting parsing.',
    codeSnippet: `<!-- Executes in strict document order after HTML parsing: -->
<script defer src="analytics.js"></script>
<script defer src="app.js"></script>

<!-- Executes whenever it finishes loading, order NOT guaranteed: -->
<script async src="tracker.js"></script>`,
    learningObjective: 'Master script loading strategies to optimize Critical Rendering Path.'
  },
  {
    id: 'html-adv-002',
    technology: 'html',
    level: 'advanced',
    topic: 'Web Components & Template',
    question: 'How does the content inside an HTML <template> element behave when parsed by the browser?',
    options: [
      'It is parsed into a DocumentFragment, but images do not load, scripts do not run, and it is not rendered until cloned into the DOM.',
      'It is treated as plain text strings and requires innerHTML to evaluate.',
      'It renders immediately with display: none applied by the user agent stylesheet.',
      'It is executed in an isolated Web Worker scope.'
    ],
    correctAnswer: 'It is parsed into a DocumentFragment, but images do not load, scripts do not run, and it is not rendered until cloned into the DOM.',
    explanation: 'The <template> tag holds inert client-side content that is parsed for validity but not rendered. Scripts inside it do not execute, resources (like images) are not fetched, and its .content property is a DocumentFragment.',
    learningObjective: 'Understand the inert nature and instantiation of HTML templates.'
  },
  {
    id: 'html-adv-003',
    technology: 'html',
    level: 'advanced',
    topic: 'Accessibility & ARIA Live Regions',
    question: 'What is the behavioral difference between aria-live="polite" and aria-live="assertive"?',
    options: [
      '"polite" waits until the screen reader finishes speaking current tasks; "assertive" interrupts whatever is currently being spoken immediately.',
      '"polite" only logs to the console; "assertive" speaks out loud.',
      '"assertive" plays a warning beep sound before reading.',
      '"polite" works on desktop browsers; "assertive" is required for mobile.'
    ],
    correctAnswer: '"polite" waits until the screen reader finishes speaking current tasks; "assertive" interrupts whatever is currently being spoken immediately.',
    explanation: 'aria-live="polite" queues notifications for when the screen reader is idle (ideal for chat messages, filter updates), while aria-live="assertive" interrupts user speech immediately (reserved for critical alerts and time-sensitive errors).',
    codeSnippet: `<div aria-live="polite" class="sr-only">
  Question 4 of 10 loaded: Correct answer selected.
</div>`,
    learningObjective: 'Implement accessible dynamic updates with ARIA live regions.'
  },
  {
    id: 'html-adv-004',
    technology: 'html',
    level: 'advanced',
    topic: 'Resource Hints & Performance',
    question: 'What does <link rel="preload"> do compared to <link rel="prefetch">?',
    options: [
      'preload is for high-priority resources needed in the current navigation; prefetch is for low-priority resources anticipated for future navigations.',
      'prefetch immediately applies the resource; preload only downloads it to browser memory without parsing.',
      'preload is restricted to CSS stylesheets; prefetch can fetch any asset.',
      'prefetch triggers an HTTP/2 server push; preload uses normal HTTP GET.'
    ],
    correctAnswer: 'preload is for high-priority resources needed in the current navigation; prefetch is for low-priority resources anticipated for future navigations.',
    explanation: 'rel="preload" forces the browser to fetch a critical resource for the current page early with high priority (e.g. fonts, hero image). rel="prefetch" asks the browser to fetch a resource in idle time that might be used on a subsequent page.',
    codeSnippet: `<link rel="preload" href="/fonts/dev-mono.woff2" as="font" type="font/woff2" crossorigin>
<link rel="prefetch" href="/next-level-assessment.js" as="script">`,
    learningObjective: 'Employ modern resource hints (preload, prefetch, preconnect).'
  },
  {
    id: 'html-adv-005',
    technology: 'html',
    level: 'advanced',
    topic: 'Security & Sandboxing',
    question: 'What happens when an <iframe> has the "sandbox" attribute set without any parameter flags?',
    options: [
      'All restrictions are applied: scripts, form submissions, popups, and same-origin cookies are disabled.',
      'The iframe is rendered with a 50% opacity border.',
      'The iframe runs in a separate browser process with unrestricted permissions.',
      'It only restricts localStorage access while allowing normal DOM execution.'
    ],
    correctAnswer: 'All restrictions are applied: scripts, form submissions, popups, and same-origin cookies are disabled.',
    explanation: 'An empty sandbox attribute enforces maximum security restrictions: it prevents script execution, forms, top-navigation, popups, and treats content as from a unique origin. Tokens like allow-scripts or allow-forms re-enable specific features.',
    codeSnippet: `<iframe 
  src="https://untrusted-embed.example.com" 
  sandbox="allow-scripts allow-forms" 
  title="Safe User Embed">
</iframe>`,
    learningObjective: 'Harden third-party embedded content using iframe sandboxing.'
  },
  {
    id: 'html-adv-006',
    technology: 'html',
    level: 'advanced',
    topic: 'DOM Construction & Spec Quirks',
    question: 'In standard HTML parsing, what happens if an author places a <div> directly inside a <p> element?',
    options: [
      'The opening <div> tag implicitly closes the open <p> tag before the <div> is parsed.',
      'The browser creates an error node and cancels DOM rendering.',
      'The <div> is converted into a <span> by the browser\'s sanitization engine.',
      'The <div> renders as an inline element inside the paragraph.'
    ],
    correctAnswer: 'The opening <div> tag implicitly closes the open <p> tag before the <div> is parsed.',
    explanation: 'According to the HTML parsing specification, <p> elements only permit phrasing (inline) content. Encountering a block-level element like <div> forces the browser to implicitly close the open <p> tag.',
    codeSnippet: `<!-- Written HTML: -->
<p>Hello <div>World</div></p>

<!-- Resulting DOM structure: -->
<p>Hello </p>
<div>World</div>
<p></p>`,
    learningObjective: 'Understand parser error recovery and element containment rules.'
  },
  {
    id: 'html-adv-007',
    technology: 'html',
    level: 'advanced',
    topic: 'Advanced Semantic Decisions',
    question: 'When should a developer use the <time> element with the "datetime" attribute?',
    options: [
      'To provide machine-readable dates, durations, or timestamps alongside human-friendly text.',
      'To schedule an automatic page refresh after a given time interval.',
      'To benchmark the rendering execution time of a component.',
      'To display a countdown timer using CSS animations.'
    ],
    correctAnswer: 'To provide machine-readable dates, durations, or timestamps alongside human-friendly text.',
    explanation: 'The <time> element provides a standard way to represent dates and times. The datetime attribute provides an ISO 8601 machine-readable format for search engines, calendar integrations, and screen readers.',
    codeSnippet: `<time datetime="2026-10-30T09:00:00Z">
  October 30, 2026 at 9:00 AM UTC
</time>`,
    learningObjective: 'Express temporal information semantically using the HTML time element.'
  },
  {
    id: 'html-adv-008',
    technology: 'html',
    level: 'advanced',
    topic: 'Modern Browser Features',
    question: 'What is the purpose of the modern HTML "popover" attribute?',
    options: [
      'Provides native popover behaviors (top-layer placement, light-dismiss, focus management) without JavaScript.',
      'Enables browser tooltips when hovering over any element for 500ms.',
      'Replaces the standard CSS z-index stacking context.',
      'Loads content from an external micro-frontend.'
    ],
    correctAnswer: 'Provides native popover behaviors (top-layer placement, light-dismiss, focus management) without JavaScript.',
    explanation: 'The popover API allows elements to be rendered in the top-layer with automatic "light-dismiss" (clicking outside closes the popover) and accessible focus management, controlled via popovertarget attributes on buttons.',
    codeSnippet: `<button popovertarget="my-menu">Open Menu</button>
<div id="my-menu" popover>
  <p>Popover content with native light dismiss!</p>
</div>`,
    learningObjective: 'Leverage the native Popover API for clean overlay management.'
  },
  {
    id: 'html-adv-009',
    technology: 'html',
    level: 'advanced',
    topic: 'Forms & Network Behavior',
    question: 'What is the difference between enctype="multipart/form-data" and enctype="application/x-www-form-urlencoded"?',
    options: [
      'multipart/form-data is required for uploading binary files (<input type="file">), while urlencoded encodes key-values as percent-encoded strings.',
      'multipart/form-data compresses data with gzip before sending.',
      'urlencoded is only supported in HTTP/1.1; multipart is required for HTTP/2.',
      'multipart/form-data sends data via WebSockets instead of POST.'
    ],
    correctAnswer: 'multipart/form-data is required for uploading binary files (<input type="file">), while urlencoded encodes key-values as percent-encoded strings.',
    explanation: 'application/x-www-form-urlencoded is the default encoding for HTML forms (encoding characters as percent escapes). When submitting binary files, multipart/form-data separates inputs with boundary delimiters.',
    learningObjective: 'Select the proper form submission encoding for files and data.'
  },
  {
    id: 'html-adv-010',
    technology: 'html',
    level: 'advanced',
    topic: 'Security & Content Policy',
    question: 'Which HTML meta tag can prevent sensitive referral information from being passed to external websites?',
    options: [
      '<meta name="referrer" content="strict-origin-when-cross-origin">',
      '<meta http-equiv="X-Frame-Options" content="DENY">',
      '<meta name="robots" content="noindex, nofollow">',
      '<meta http-equiv="Content-Security-Policy" content="no-referral">'
    ],
    correctAnswer: '<meta name="referrer" content="strict-origin-when-cross-origin">',
    explanation: 'The Referrer-Policy header (or <meta name="referrer" ...>) governs how much referrer information (URL paths, query params) should be sent when users click outbound links.',
    codeSnippet: `<meta name="referrer" content="strict-origin-when-cross-origin">`,
    learningObjective: 'Configure document referrer policy for privacy and security.'
  }
];
