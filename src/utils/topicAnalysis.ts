/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnswerRecord, Technology, TopicPerformance } from '../types/quiz.ts';
import { calculatePercentage } from './scoring.ts';

const TOPIC_GUIDANCE: Record<string, { guidance: string; objective: string; task: string }> = {
  // HTML Topics
  'HTML Document Structure': {
    guidance: 'Review HTML5 doctype declaration, standards mode vs quirks mode, and root document outline.',
    objective: 'Ensure strict compliance with HTML5 document standards and viewport settings.',
    task: 'Create a barebones HTML5 template from memory verifying doctype, lang attributes, and meta tags.'
  },
  'Common HTML Elements': {
    guidance: 'Focus on distinguishing semantic elements like <nav>, <header>, and text-level semantics (<strong> vs <b>).',
    objective: 'Select native semantic elements that naturally communicate meaning to assistive technologies.',
    task: 'Refactor a layout constructed with <div> soup into semantic <header>, <nav>, <main>, and <article>.'
  },
  'Headings & Paragraphs': {
    guidance: 'Avoid skipping heading hierarchy levels (e.g. h1 to h3) and ensure headings are not chosen for font size.',
    objective: 'Construct accessible, predictable document outlines for screen readers.',
    task: 'Audit a page outline using an accessibility tree inspector to ensure zero skipped heading levels.'
  },
  'Links & Images': {
    guidance: 'Review meaningful vs empty alt attributes (alt=""), and target="_blank" security (rel="noopener noreferrer").',
    objective: 'Provide appropriate text alternatives and protect users against tabnabbing vulnerabilities.',
    task: 'Audit an image gallery to apply descriptive alt text on photos and null alt="" on decorative accents.'
  },
  'Basic Forms': {
    guidance: 'Ensure all inputs are programmatically associated with <label> tags via id and "for" attributes.',
    objective: 'Construct accessible forms that enlarge touch targets and support screen readers.',
    task: 'Build a contact form where clicking any text label immediately shifts keyboard focus to its input.'
  },
  'Semantic HTML Fundamentals': {
    guidance: 'Review the distinction between self-contained <article> and thematic <section> containers.',
    objective: 'Structure web documents so individual content units can be syndicated independently.',
    task: 'Convert a multi-card blog list into nested <article> cards with internal <header> and <footer> tags.'
  },
  'Lists & Tables': {
    guidance: 'Review data table semantics (<thead>, <tbody>, <th> with scope="col/row").',
    objective: 'Structure complex tabular data so screen readers announce row and column relationships.',
    task: 'Build a pricing table with proper <caption> and <th> headers mapped across rows and columns.'
  },
  'Semantic Elements & Layout': {
    guidance: 'Ensure only one visible <main> element exists per document and landmark regions are not overused.',
    objective: 'Organize high-level document regions following W3C landmark best practices.',
    task: 'Audit document landmarks to guarantee unique page structure without redundant main wrappers.'
  },
  'Form Attributes & Validation': {
    guidance: 'Utilize HTML5 native constraint validation: pattern regex, required, autocomplete="new-password".',
    objective: 'Enforce form data hygiene on the client side before writing custom JavaScript validation.',
    task: 'Implement a signup form requiring a 5-digit zip code and formatted phone number using only HTML5 attributes.'
  },
  'Accessibility Fundamentals': {
    guidance: 'Understand when to use ARIA roles and when native HTML elements make ARIA redundant.',
    objective: 'Follow the First Rule of ARIA: use native semantic elements whenever available.',
    task: 'Replace custom role="button" divs with native <button> elements and verify keyboard Enter/Space behavior.'
  },
  'Metadata & Viewport': {
    guidance: 'Review meta viewport tags, charset declarations, and social sharing OpenGraph tags.',
    objective: 'Ensure correct rendering across all mobile device screen widths and high pixel densities.',
    task: 'Test a page on mobile emulation with and without width=device-width to observe layout scaling.'
  },
  'Modern HTML Features': {
    guidance: 'Practice using native <dialog> with showModal() and interactive <details>/<summary> widgets.',
    objective: 'Leverage modern native HTML widgets to reduce JavaScript bundle dependencies.',
    task: 'Implement a confirmation modal and FAQ accordion using native <dialog> and <details>.'
  },
  'Browser Parsing & Script Execution': {
    guidance: 'Review the execution order and DOMContentLoaded timing of <script defer> vs <script async>.',
    objective: 'Optimize script loading to minimize render-blocking resources during Critical Rendering Path.',
    task: 'Profile script loading in DevTools Network tab to observe parse suspension caused by un-deferred scripts.'
  },
  'Web Components & Template': {
    guidance: 'Understand the inert nature of <template> DocumentFragments and Shadow DOM encapsulation.',
    objective: 'Use native browser templates to clone reusable DOM fragments without execution overhead.',
    task: 'Instantiate a reusable template element repeatedly into a list via template.content.cloneNode(true).'
  },
  'Accessibility & ARIA Live Regions': {
    guidance: 'Distinguish between aria-live="polite" and aria-live="assertive" for dynamic state announcements.',
    objective: 'Deliver timely, non-disruptive feedback to screen reader users when content updates asynchronously.',
    task: 'Create an accessible live search result counter that announces "X results found" using aria-live="polite".'
  },
  'Resource Hints & Performance': {
    guidance: 'Review rel="preload" for immediate critical assets vs rel="prefetch" for subsequent page navigations.',
    objective: 'Instruct browser speculative parsers to prioritize critical web fonts and hero media.',
    task: 'Add rel="preload" for a custom WOFF2 font and measure reduction in layout shift / FOIT.'
  },

  // CSS Topics
  'Box Model': {
    guidance: 'Review how box-sizing: border-box includes padding and borders inside width, preventing layout overflow.',
    objective: 'Predict exact element dimensions and prevent unexpected layout expansion.',
    task: 'Configure a universal border-box reset and inspect calculated box dimensions in browser DevTools.'
  },
  'Selectors': {
    guidance: 'Review direct child (>), adjacent sibling (+), general sibling (~), and keyboard :focus-visible selectors.',
    objective: 'Target elements with precise combinators without inflating class specificity.',
    task: 'Write a stylesheet targeting only the immediate first paragraph following an h2 using the + combinator.'
  },
  'Colors & Typography': {
    guidance: 'Master relative rem units based on root font size, unitless line-height, and contrast ratios.',
    objective: 'Design scalable typographic hierarchies that honor user browser default font size preferences.',
    task: 'Convert a fixed pixel stylesheet into fluid rem units with proportional unitless line-height.'
  },
  'Display Property': {
    guidance: 'Clarify the differences between block, inline, inline-block, and display: none vs visibility: hidden.',
    objective: 'Manage document flow and understand how visibility properties affect layout geometry reflow.',
    task: 'Inspect the DOM reflow impact of toggling display: none vs visibility: hidden in DevTools Performance panel.'
  },
  'Basic Positioning': {
    guidance: 'Review containing blocks for position: absolute (nearest non-static ancestor) and fixed positioning.',
    objective: 'Anchor overlay elements reliably without unintentional detachment during scrolling.',
    task: 'Build a modal overlay with position: fixed and an internal close button anchored with position: absolute.'
  },
  'Margin & Padding': {
    guidance: 'Understand vertical margin collapsing rules in block layout and why it does not occur in Flex/Grid.',
    objective: 'Eliminate unexpected vertical gaps caused by collapsing adjacent element margins.',
    task: 'Test margin behavior between sibling headings and paragraphs, then contrast it inside a flex container.'
  },
  'Flexbox Layout': {
    guidance: 'Master justify-content (main axis) vs align-items (cross axis) and flex shorthand properties (grow/shrink/basis).',
    objective: 'Construct 1-dimensional layouts that distribute space and align items predictably.',
    task: 'Build a responsive navigation bar and a sticky footer layout using Flexbox.'
  },
  'CSS Specificity': {
    guidance: 'Review specificity calculations (Inline > ID > Class/Pseudo-class > Element) and avoid !important.',
    objective: 'Resolve CSS cascade conflicts cleanly by managing selector weight rather than escalating wars.',
    task: 'Refactor high-specificity selector chains into simple single-class selectors using BEM or utility classes.'
  },
  'CSS Grid': {
    guidance: 'Master repeat(auto-fit, minmax(250px, 1fr)), grid-template-areas, and the fractional (fr) unit.',
    objective: 'Build responsive 2-dimensional layouts that adapt to viewport width without media queries.',
    task: 'Create an auto-wrapping responsive card grid using minmax() and auto-fit.'
  },
  'Responsive Design & Media Queries': {
    guidance: 'Adopt mobile-first min-width media queries and respect prefers-reduced-motion for accessibility.',
    objective: 'Create resilient responsive layouts across mobile, tablet, and desktop viewports.',
    task: 'Refactor desktop-first max-width media queries into a mobile-first min-width architecture.'
  },
  'CSS Transitions': {
    guidance: 'Animate compositor-only properties (transform and opacity) to achieve 60fps GPU acceleration.',
    objective: 'Create smooth micro-interactions that never trigger layout reflow or repaint.',
    task: 'Replace an animation on top/left with transform: translate() and observe paint metrics.'
  },
  'Pseudo-classes & Elements': {
    guidance: 'Distinguish between state pseudo-classes (:hover, :focus, :active) and pseudo-elements (::before, ::after).',
    objective: 'Decorate elements and handle user interaction states cleanly without extra DOM nodes.',
    task: 'Create custom tooltips and styled list bullets using ::before and ::after pseudo-elements.'
  },
  'CSS Custom Properties': {
    guidance: 'Learn custom property inheritance, fallback parameters in var(--name, fallback), and dynamic theming.',
    objective: 'Implement design token architectures that switch themes smoothly at runtime.',
    task: 'Build a light/dark color theme system driven entirely by CSS custom properties on the root selector.'
  },
  'Modern CSS Selectors': {
    guidance: 'Master :has() relational selector, zero-specificity :where(), and :is() for clean architecture.',
    objective: 'Style parent elements conditionally based on child states without writing JavaScript glue code.',
    task: 'Use :has() to style a form card with an error border when any nested input matches :invalid.'
  },
  'CSS Stacking Contexts': {
    guidance: 'Understand how opacity < 1, filter, transform, and isolation: isolate form new stacking contexts.',
    objective: 'Prevent z-index bugs where child elements are trapped beneath external elements.',
    task: 'Use isolation: isolate on a parent card to encapsulate internal z-index layers safely.'
  },
  'CSS Cascade Layers': {
    guidance: 'Review @layer priority ordering and how unlayered styles always override layered styles.',
    objective: 'Organize stylesheets into predictable cascade tiers (reset, components, utilities).',
    task: 'Declare @layer base, components, utilities and verify that layer order determines cascade winners.'
  },
  'CSS Subgrid': {
    guidance: 'Use grid-template-rows: subgrid to align child content (headers, text, buttons) across cards.',
    objective: 'Ensure cards in adjacent grid cells align their internal sections cleanly.',
    task: 'Build a pricing card matrix with variable description lengths that stay row-aligned with subgrid.'
  },
  'Container Queries': {
    guidance: 'Master @container (min-width: ...) to make components responsive to their container width.',
    objective: 'Create portable components that adapt whether placed in a narrow sidebar or wide main area.',
    task: 'Create a component that switches between vertical and horizontal layout based on container queries.'
  },

  // JavaScript Topics
  'Variables & Scope': {
    guidance: 'Review block scope (let, const), function scope (var), and the Temporal Dead Zone (TDZ).',
    objective: 'Prevent variable leakage and accidental reassignment across nested scopes.',
    task: 'Demonstrate TDZ behavior by inspecting ReferenceErrors before let/const declarations.'
  },
  'Data Types': {
    guidance: 'Understand primitive types (string, number, boolean, symbol, bigint, null, undefined) vs object references.',
    objective: 'Recognize primitive immutability, autoboxing, and typeof null behavior.',
    task: 'Write a type inspection helper that accurately differentiates null, Array, and plain Object.'
  },
  'Operators & Equality': {
    guidance: 'Enforce strict equality (===) to prevent unexpected type coercion bugs (e.g. 0 == false).',
    objective: 'Perform deterministic equality checks and comparisons across all JavaScript types.',
    task: 'Review the JavaScript Equality Table and replace all loose == operators with strict ===.'
  },
  'Arrays & Methods': {
    guidance: 'Master mutator methods (push, pop, splice) vs non-mutating methods (concat, slice, toSorted).',
    objective: 'Manipulate collections immutably for predictable state management.',
    task: 'Perform additions, removals, and updates on an array without mutating the original reference.'
  },
  'Functions': {
    guidance: 'Understand lexical this in arrow functions vs dynamic this in standard function declarations.',
    objective: 'Select the right function syntax to maintain correct context binding.',
    task: 'Convert an object method with a nested timer callback to use arrow syntax to preserve this.'
  },
  'Objects': {
    guidance: 'Use Object.hasOwn() to check own properties and practice modern property shorthand and computed keys.',
    objective: 'Work safely with JavaScript objects without risking prototype pollution.',
    task: 'Write a helper that merges two configuration objects safely using Object.assign or spread.'
  },
  'Conditions & Control Flow': {
    guidance: 'Identify falsy values (false, 0, -0, 0n, "", null, undefined, NaN) and truthy values (including "0" and []).',
    objective: 'Write bug-free conditional statements without false-positive type assumptions.',
    task: 'Refactor conditional checks to use explicit nullish coalescing (??) instead of logical OR (||).'
  },
  'Loops & Iteration': {
    guidance: 'Differentiate for...of (iterates values of iterables) from for...in (iterates enumerable keys).',
    objective: 'Choose the correct iteration construct for arrays, sets, maps, and objects.',
    task: 'Iterate over a Map and an Array using for...of with destructuring.'
  },
  'Array Methods & Functional Programming': {
    guidance: 'Master map(), filter(), reduce(), find(), and some() for declarative data transformations.',
    objective: 'Transform complex collections using functional chaining without side effects.',
    task: 'Calculate the total score and list of passing students from an array of student objects using reduce.'
  },
  'DOM Manipulation & Events': {
    guidance: 'Master event delegation, stopPropagation vs preventDefault, and querySelector best practices.',
    objective: 'Build snappy, memory-efficient DOM event listeners on parent containers.',
    task: 'Implement a todo list where clicking delete on dynamically added items is handled by one parent listener.'
  },
  'Destructuring & Spread Syntax': {
    guidance: 'Master array/object destructuring, default values, rest parameters, and shallow copying with spread.',
    objective: 'Write clean, concise variable assignments and immutable state updates.',
    task: 'Update a nested state object immutably using object spread and rest extraction.'
  },
  'Promises & Asynchronous JS': {
    guidance: 'Master async/await, try/catch error handling, and Promise rejection propagation.',
    objective: 'Coordinate asynchronous network requests and handle failures gracefully.',
    task: 'Write an async function that fetches data with a retry mechanism on failure.'
  },
  'Scope & Closures': {
    guidance: 'Understand lexical scoping, closure data encapsulation, and block-scoped variables in loops.',
    objective: 'Leverage closures to encapsulate private state and prevent variable collision.',
    task: 'Create a private counter function that returns an object with increment and getCount methods.'
  },
  'Error Handling': {
    guidance: 'Use try/catch/finally properly to guarantee cleanup (e.g. hiding loading indicators).',
    objective: 'Build resilient error boundaries and handle network and parsing failures safely.',
    task: 'Implement a safe JSON parsing utility that returns a fallback object on parse failure.'
  },
  'The Event Loop & Concurrency': {
    guidance: 'Understand the Call Stack, Microtask Queue (Promises, queueMicrotask), and Macrotask Queue (setTimeout).',
    objective: 'Accurately predict asynchronous execution order and prevent UI thread blocking.',
    task: 'Trace the output of interleaved Promise.then, setTimeout, and synchronous code.'
  },
  'Prototypes & Inheritance': {
    guidance: 'Understand the [[Prototype]] chain, Object.getPrototypeOf, and prototype property delegation.',
    objective: 'Explain JavaScript inheritance and optimize shared methods across instances.',
    task: 'Inspect the prototype chain of an array instance up to Object.prototype and null in console.'
  },
  'Deep vs Shallow Copying': {
    guidance: 'Recognize that spread and Object.assign only shallow-copy, and use structuredClone() for deep copies.',
    objective: 'Prevent unintended side effects when mutating nested state structures.',
    task: 'Clone a nested state object containing dates and arrays using structuredClone() and verify independence.'
  },
  'Function Binding & Execution Context': {
    guidance: 'Master call(this, ...args), apply(this, [args]), and bind(this, ...args) for context control.',
    objective: 'Explicitly control function execution context when passing methods as callbacks.',
    task: 'Pass an object method into an event listener using .bind() and verify that this points to the object.'
  },
  'Promises & Asynchronous Composition': {
    guidance: 'Master Promise.all() vs Promise.allSettled() vs Promise.race() for concurrent async operations.',
    objective: 'Orchestrate parallel async tasks with the correct failure tolerance.',
    task: 'Implement a request timeout function using Promise.race() against a 5-second timer.'
  }
};

export function analyzeTopicPerformances(
  answers: AnswerRecord[],
  minQuestionsForReliability: number = 2
): {
  topicPerformances: TopicPerformance[];
  strengths: TopicPerformance[];
  weaknesses: TopicPerformance[];
} {
  const topicMap: Record<string, { attempted: number; correct: number }> = {};

  for (const ans of answers) {
    if (!topicMap[ans.topic]) {
      topicMap[ans.topic] = { attempted: 0, correct: 0 };
    }
    topicMap[ans.topic].attempted += 1;
    if (ans.isCorrect) {
      topicMap[ans.topic].correct += 1;
    }
  }

  const topicPerformances: TopicPerformance[] = Object.keys(topicMap).map(topic => {
    const data = topicMap[topic];
    const accuracy = calculatePercentage(data.correct, data.attempted);
    const isReliable = data.attempted >= minQuestionsForReliability;

    let status: 'mastered' | 'proficient' | 'needs-review' = 'proficient';
    if (accuracy >= 80) {
      status = 'mastered';
    } else if (accuracy < 60) {
      status = 'needs-review';
    }

    const fallback = {
      guidance: `Review core concepts and documentation for ${topic}.`,
      objective: `Strengthen fundamental understanding of ${topic}.`,
      task: `Practice building small isolated demos targeting ${topic}.`
    };

    const details = TOPIC_GUIDANCE[topic] || fallback;

    return {
      topic,
      attempted: data.attempted,
      correct: data.correct,
      accuracyPercentage: accuracy,
      isReliable,
      status,
      reviewGuidance: details.guidance,
      suggestedObjective: details.objective,
      practiceTask: details.task
    };
  });

  // Strengths: High accuracy (>= 75%)
  const strengths = topicPerformances
    .filter(t => t.accuracyPercentage >= 75)
    .sort((a, b) => b.accuracyPercentage - a.accuracyPercentage || b.attempted - a.attempted);

  // Weaknesses: Lower accuracy (< 75%), prioritized by lowest accuracy first
  const weaknesses = topicPerformances
    .filter(t => t.accuracyPercentage < 75)
    .sort((a, b) => a.accuracyPercentage - b.accuracyPercentage || b.attempted - a.attempted);

  return {
    topicPerformances,
    strengths,
    weaknesses
  };
}
