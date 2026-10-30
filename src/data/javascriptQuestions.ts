/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types/quiz.ts';

export const javascriptQuestions: Question[] = [
  // ===================== BEGINNER (10 Questions) =====================
  {
    id: 'js-beg-001',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Variables & Scope',
    question: 'Which keyword declares a block-scoped variable that can be reassigned later in code?',
    options: [
      'let',
      'const',
      'var',
      'static'
    ],
    correctAnswer: 'let',
    explanation: 'The let keyword declares a block-scoped local variable, optionally initializing it to a value, and allows subsequent reassignment. const prevents reassignment, and var is function-scoped.',
    codeSnippet: `let score = 10;
score = 20; // Allowed!

const maxScore = 100;
// maxScore = 200; // TypeError: Assignment to constant variable`,
    learningObjective: 'Understand block scoping and variable mutability with let vs const.'
  },
  {
    id: 'js-beg-002',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Data Types',
    question: 'What is the output of "typeof null" in JavaScript?',
    options: [
      '"object"',
      '"null"',
      '"undefined"',
      '"boolean"'
    ],
    correctAnswer: '"object"',
    explanation: 'In JavaScript, typeof null returns "object". This is a historic bug from the first implementation of JavaScript where values were stored in 32-bit units with type tags, and 0 represented an object reference. null was the NULL pointer (0x00), triggering "object".',
    learningObjective: 'Recognize primitive JavaScript types and historic type-system idiosyncrasies.'
  },
  {
    id: 'js-beg-003',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Operators & Equality',
    question: 'What is the key difference between the equality operator (==) and the strict equality operator (===)?',
    options: [
      '=== compares both value and type without type coercion; == performs implicit type conversion if types differ.',
      '== compares reference memory addresses; === compares string representations.',
      '=== is used exclusively for numbers; == is used for strings.',
      'There is no difference in ES6+.'
    ],
    correctAnswer: '=== compares both value and type without type coercion; == performs implicit type conversion if types differ.',
    explanation: 'Strict equality (===) evaluates to false immediately if the types of operands differ (e.g. 5 === "5" is false). Loose equality (==) coerces types before checking equality (e.g. 5 == "5" is true).',
    codeSnippet: `console.log(5 == '5');  // true  (string coerced to number)
console.log(5 === '5'); // false (number !== string)`,
    learningObjective: 'Apply strict equality to avoid unintentional type coercion bugs.'
  },
  {
    id: 'js-beg-004',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Arrays & Methods',
    question: 'Which array method adds one or more elements to the end of an array and returns the new array length?',
    options: [
      'push()',
      'unshift()',
      'concat()',
      'pop()'
    ],
    correctAnswer: 'push()',
    explanation: 'push() adds items to the end of an array in-place and returns the new length. unshift() adds items to the beginning; pop() removes the last element; shift() removes the first element.',
    codeSnippet: `const stack = ['HTML', 'CSS'];
const newLength = stack.push('JavaScript');
console.log(stack);     // ['HTML', 'CSS', 'JavaScript']
console.log(newLength); // 3`,
    learningObjective: 'Manipulate arrays using core mutator methods.'
  },
  {
    id: 'js-beg-005',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Functions',
    question: 'How does an arrow function handle the "this" keyword compared to a standard function declaration?',
    options: [
      'Arrow functions do not have their own "this"; they lexically inherit "this" from the surrounding outer scope.',
      'Arrow functions always bind "this" to the global window object.',
      'Arrow functions cannot be invoked inside objects.',
      'Arrow functions create a dynamic "this" that changes on every call.'
    ],
    correctAnswer: 'Arrow functions do not have their own "this"; they lexically inherit "this" from the surrounding outer scope.',
    explanation: 'Arrow functions do not define their own execution context for this, arguments, super, or new.target. They retain the this value of the enclosing lexical context when they are defined.',
    learningObjective: 'Understand lexical vs dynamic binding of "this" in functions.'
  },
  {
    id: 'js-beg-006',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Objects',
    question: 'How do you check if a property exists directly on an object without checking its prototype chain in modern JavaScript?',
    options: [
      'Object.hasOwn(obj, "prop")',
      'obj.contains("prop")',
      'obj.hasKey("prop")',
      'Object.exists(obj, "prop")'
    ],
    correctAnswer: 'Object.hasOwn(obj, "prop")',
    explanation: 'Object.hasOwn(obj, "prop") is the modern, safe standard (ES2022) to determine if an object has an own property, replacing obj.hasOwnProperty() which can fail if an object was created with Object.create(null).',
    learningObjective: 'Inspect object properties safely using modern static methods.'
  },
  {
    id: 'js-beg-007',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Conditions & Control Flow',
    question: 'Which of the following values is NOT falsy in JavaScript conditional checks?',
    options: [
      '"0" (the string containing zero)',
      '0 (the number zero)',
      '"" (an empty string)',
      'null'
    ],
    correctAnswer: '"0" (the string containing zero)',
    explanation: 'The falsy values in JavaScript are: false, 0, -0, 0n, "", null, undefined, and NaN. Any non-empty string, including "0" and "false", evaluates to truthy.',
    codeSnippet: `if ("0") {
  console.log("This executes because non-empty strings are truthy!");
}`,
    learningObjective: 'Accurately predict truthy and falsy values in conditionals.'
  },
  {
    id: 'js-beg-008',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Loops & Iteration',
    question: 'Which loop statement is best suited to iterate over the values of an iterable like an Array or Set?',
    options: [
      'for...of',
      'for...in',
      'while...in',
      'forEach...of'
    ],
    correctAnswer: 'for...of',
    explanation: 'for...of iterates directly over the values of iterable objects (Arrays, Sets, Maps, strings). for...in iterates over enumerable property keys/indexes, which is usually not desired for array values.',
    codeSnippet: `const techs = ['HTML', 'CSS', 'JS'];
for (const tech of techs) {
  console.log(tech); // logs values: HTML, CSS, JS
}`,
    learningObjective: 'Choose the appropriate iteration statement for collections.'
  },
  {
    id: 'js-beg-009',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Data Types',
    question: 'What happens when you attempt to modify a property of a primitive value (e.g. str.foo = 42)?',
    options: [
      'In non-strict mode it silently does nothing; in strict mode it throws a TypeError.',
      'The primitive converts permanently to an Object.',
      'The property is added to the global window object.',
      'It creates a symbol on the prototype.'
    ],
    correctAnswer: 'In non-strict mode it silently does nothing; in strict mode it throws a TypeError.',
    explanation: 'Primitives (strings, numbers, booleans) are immutable. When attempting to assign a property, JavaScript temporarily creates a wrapper object (autoboxing) which is immediately discarded, leaving the primitive unchanged.',
    learningObjective: 'Understand primitive immutability and wrapper object autoboxing.'
  },
  {
    id: 'js-beg-010',
    technology: 'javascript',
    level: 'beginner',
    topic: 'Variables & Scope',
    question: 'What is the "Temporal Dead Zone" (TDZ) in JavaScript?',
    options: [
      'The period between entering the scope of a let/const variable and its actual declaration line, during which accessing it throws a ReferenceError.',
      'The time it takes for an asynchronous fetch request to timeout.',
      'The pause interval in requestAnimationFrame loops.',
      'The duration garbage collection runs in the browser.'
    ],
    correctAnswer: 'The period between entering the scope of a let/const variable and its actual declaration line, during which accessing it throws a ReferenceError.',
    explanation: 'Variables declared with let and const are hoisted to the top of their block scope, but remain uninitialized. Accessing them before their declaration line results in a ReferenceError because they are in the Temporal Dead Zone.',
    codeSnippet: `{
  // TDZ for 'name' starts here
  // console.log(name); // ReferenceError: Cannot access 'name' before initialization
  let name = "Alex";   // TDZ ends here
}`,
    learningObjective: 'Explain variable hoisting differences between var, let, and const.'
  },

  // ===================== INTERMEDIATE (10 Questions) =====================
  {
    id: 'js-int-001',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'Array Methods & Functional Programming',
    question: 'What does the Array.prototype.reduce() method return after executing across an array?',
    options: [
      'A single accumulated value resulting from passing the accumulator and each element through the reducer callback.',
      'A new array with half the elements filtered out.',
      'A boolean indicating if every element matched a predicate.',
      'A reversed copy of the input array.'
    ],
    correctAnswer: 'A single accumulated value resulting from passing the accumulator and each element through the reducer callback.',
    explanation: 'reduce() executes a user-supplied reducer callback function on each element of the array in order, passing in the return value from the calculation on the preceding element. The final result is a single accumulated value.',
    codeSnippet: `const scores = [85, 92, 78];
const total = scores.reduce((acc, curr) => acc + curr, 0);
console.log(total); // 255`,
    learningObjective: 'Apply Array.reduce() for collection aggregation and transformations.'
  },
  {
    id: 'js-int-002',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'DOM Manipulation & Events',
    question: 'What is event delegation in client-side JavaScript, and why is it useful?',
    options: [
      'Attaching a single event listener to a parent element to handle events bubbling from current or future child elements.',
      'Passing an event from the browser window directly to the backend server.',
      'Assigning multiple callback functions to a single button click.',
      'Preventing keyboard events from propagating to screen readers.'
    ],
    correctAnswer: 'Attaching a single event listener to a parent element to handle events bubbling from current or future child elements.',
    explanation: 'Event delegation leverages event bubbling. Instead of binding event listeners to dozens of individual child elements (like <li> or <tr>), a single listener on the parent inspects event.target, conserving memory and automatically supporting dynamically inserted children.',
    codeSnippet: `const list = document.querySelector('#quiz-options');
list.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button) {
    handleAnswerSelect(button.dataset.optionId);
  }
});`,
    learningObjective: 'Implement event delegation patterns for high-performance DOM listeners.'
  },
  {
    id: 'js-int-003',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'Destructuring & Spread Syntax',
    question: 'What is the output of the following rest and destructuring operation?',
    options: [
      'primary = "HTML", others = ["CSS", "JavaScript"]',
      'primary = "HTML", others = "CSS"',
      'primary = ["HTML", "CSS"], others = "JavaScript"',
      'SyntaxError: rest elements cannot follow variables.'
    ],
    correctAnswer: 'primary = "HTML", others = ["CSS", "JavaScript"]',
    explanation: 'Array destructuring assigns the first item to "primary", and the rest operator (...others) collects all remaining elements into a new array.',
    codeSnippet: `const stack = ["HTML", "CSS", "JavaScript"];
const [primary, ...others] = stack;

console.log(primary); // "HTML"
console.log(others);  // ["CSS", "JavaScript"]`,
    learningObjective: 'Utilize array destructuring and rest syntax effectively.'
  },
  {
    id: 'js-int-004',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'Promises & Asynchronous JS',
    question: 'What happens when an async function throws an uncaught error inside its body?',
    options: [
      'The function returns a rejected Promise containing the thrown error.',
      'The browser halts all JavaScript execution on the entire web page.',
      'The function returns undefined synchronously.',
      'The error is automatically caught and printed to console.warn.'
    ],
    correctAnswer: 'The function returns a rejected Promise containing the thrown error.',
    explanation: 'An async function always returns a Promise. If a value is returned, the Promise resolves with that value. If an error is thrown, the Promise rejects with the thrown error, which can be caught via .catch() or try/catch in await.',
    codeSnippet: `async function fetchQuestions() {
  throw new Error("Network timeout");
}

fetchQuestions()
  .catch(err => console.log("Caught:", err.message)); // "Caught: Network timeout"`,
    learningObjective: 'Handle errors and rejection semantics in async/await functions.'
  },
  {
    id: 'js-int-005',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'Scope & Closures',
    question: 'What will be printed to the console when the following code executes?',
    options: [
      '3 printed 3 times (3, 3, 3)',
      '0, 1, 2',
      'undefined, undefined, undefined',
      'TypeError: i is not defined'
    ],
    correctAnswer: '3 printed 3 times (3, 3, 3)',
    explanation: 'Because var is function-scoped rather than block-scoped, there is only one shared variable i. By the time the setTimeout callbacks execute after the loop finishes, i has incremented to 3. (Replacing var with let fixes this by creating a fresh binding per iteration).',
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10);
}`,
    learningObjective: 'Diagnose closure capture bugs caused by var vs let in loops.'
  },
  {
    id: 'js-int-006',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'Array Methods & Functional Programming',
    question: 'What does Array.prototype.find() return if no element satisfies the testing function?',
    options: [
      'undefined',
      '-1',
      'null',
      'false'
    ],
    correctAnswer: 'undefined',
    explanation: 'Array.prototype.find() returns the value of the first element in the provided array that satisfies the provided testing function. If no elements satisfy the testing function, undefined is returned. (findIndex() returns -1).',
    learningObjective: 'Choose between find, findIndex, some, and filter correctly.'
  },
  {
    id: 'js-int-007',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'DOM Manipulation & Events',
    question: 'What is the purpose of event.stopPropagation() vs event.preventDefault()?',
    options: [
      'stopPropagation() halts the event from bubbling up the DOM tree; preventDefault() prevents the browser\'s default action for the event.',
      'preventDefault() stops bubbling; stopPropagation() stops form submission.',
      'They are identical and can be used interchangeably.',
      'stopPropagation() only works on mouse events; preventDefault() only works on keys.'
    ],
    correctAnswer: 'stopPropagation() halts the event from bubbling up the DOM tree; preventDefault() prevents the browser\'s default action for the event.',
    explanation: 'preventDefault() stops the browser\'s default behavior (e.g. following a link or submitting a form). stopPropagation() prevents the event from traversing further up or down the DOM hierarchy during event dispatch.',
    learningObjective: 'Control event bubbling and default browser behaviors with precision.'
  },
  {
    id: 'js-int-008',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'Promises & Asynchronous JS',
    question: 'How does Promise.all() behave if one of the promises in the input array rejects?',
    options: [
      'It immediately rejects with the reason of the first promise that rejected, ignoring any remaining promises.',
      'It waits for all promises to settle and returns an array of both successes and errors.',
      'It retries the failed promise up to 3 times.',
      'It replaces the rejected promise with null and resolves.'
    ],
    correctAnswer: 'It immediately rejects with the reason of the first promise that rejected, ignoring any remaining promises.',
    explanation: 'Promise.all() follows an "all-or-nothing" short-circuit model: if any promise rejects, the entire returned promise immediately rejects with that error. (Use Promise.allSettled() if you want to wait for all results regardless of rejection).',
    learningObjective: 'Select between Promise.all, Promise.allSettled, and Promise.race.'
  },
  {
    id: 'js-int-009',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'Error Handling',
    question: 'In a try...catch...finally block, when does the "finally" block execute?',
    options: [
      'Always, regardless of whether an error was thrown or caught, even if the try block contains a return statement.',
      'Only if no error occurred in the try block.',
      'Only if an error was successfully caught in the catch block.',
      'Only when the garbage collector runs.'
    ],
    correctAnswer: 'Always, regardless of whether an error was thrown or caught, even if the try block contains a return statement.',
    explanation: 'The finally block executes unconditionally after try and catch statements complete, making it the ideal location to perform resource cleanup (e.g. closing loading spinners or network connections), even if try or catch returns early.',
    codeSnippet: `function evaluate() {
  try {
    return "Result calculated";
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Cleanup executed!"); // Runs before function exits!
  }
}`,
    learningObjective: 'Ensure guaranteed cleanup operations with try/catch/finally.'
  },
  {
    id: 'js-int-010',
    technology: 'javascript',
    level: 'intermediate',
    topic: 'Destructuring & Spread Syntax',
    question: 'How do you create a shallow copy of an object with an updated or added property using spread syntax?',
    options: [
      'const updated = { ...original, score: 95 };',
      'const updated = Object.copy(original, { score: 95 });',
      'const updated = [ ...original, { score: 95 } ];',
      'const updated = original.clone({ score: 95 });'
    ],
    correctAnswer: 'const updated = { ...original, score: 95 };',
    explanation: 'Object spread syntax ({ ...original, score: 95 }) copies the own enumerable properties from original into a new object and overrides the score property, following immutable state update patterns.',
    learningObjective: 'Apply immutable object update patterns using object spread.'
  },

  // ===================== ADVANCED (10 Questions) =====================
  {
    id: 'js-adv-001',
    technology: 'javascript',
    level: 'advanced',
    topic: 'The Event Loop & Concurrency',
    question: 'What is the exact execution order of the console logs in the following code snippet?',
    options: [
      '1, 4, 3, 2',
      '1, 2, 3, 4',
      '1, 3, 4, 2',
      '4, 1, 2, 3'
    ],
    correctAnswer: '1, 4, 3, 2',
    explanation: '1. Synchronous code runs first: logs "1", schedules setTimeout (macrotask), schedules Promise.then (microtask), logs "4". 2. At the end of the current task, microtasks run: logs "3". 3. In the next turn of the event loop, macrotasks run: logs "2".',
    codeSnippet: `console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);`,
    learningObjective: 'Master event loop mechanics: call stack, microtasks queue, and macrotasks.'
  },
  {
    id: 'js-adv-002',
    technology: 'javascript',
    level: 'advanced',
    topic: 'Closures & Memory Management',
    question: 'How can a closure inadvertently cause a memory leak in a long-running web application?',
    options: [
      'By retaining references to large variables or DOM elements from its outer lexical scope that can never be garbage collected.',
      'By executing asynchronous intervals faster than the CPU clock speed.',
      'By converting local variables into immutable symbols.',
      'By filling the call stack with recursive microtasks.'
    ],
    correctAnswer: 'By retaining references to large variables or DOM elements from its outer lexical scope that can never be garbage collected.',
    explanation: 'A closure maintains a reference to its outer lexical environment. If a callback (e.g. an unremoved event listener or global cache) retains a closure that references large data structures or detached DOM nodes, the garbage collector cannot reclaim that memory.',
    learningObjective: 'Identify and prevent memory leaks originating from retained closures.'
  },
  {
    id: 'js-adv-003',
    technology: 'javascript',
    level: 'advanced',
    topic: 'Prototypes & Inheritance',
    question: 'When accessing a property on an object, what happens if that property is not found on the object itself?',
    options: [
      'The JavaScript engine traverses up the prototype chain via __proto__ / [[Prototype]] until it finds the property or reaches null.',
      'It automatically queries the global window object.',
      'It creates an empty property and returns undefined.',
      'It throws a fatal NoSuchPropertyException.'
    ],
    correctAnswer: 'The JavaScript engine traverses up the prototype chain via __proto__ / [[Prototype]] until it finds the property or reaches null.',
    explanation: 'Every JavaScript object has an internal [[Prototype]] link. If a property lookup misses on the object itself, the engine checks its prototype, then the prototype\'s prototype, continuing until reaching Object.prototype.[[Prototype]] which is null.',
    codeSnippet: `const proto = { role: "Developer" };
const user = Object.create(proto);
console.log(user.role); // "Developer" (found on prototype chain)
console.log(Object.getPrototypeOf(user) === proto); // true`,
    learningObjective: 'Explain prototype delegation and the termination of the prototype chain.'
  },
  {
    id: 'js-adv-004',
    technology: 'javascript',
    level: 'advanced',
    topic: 'Deep vs Shallow Copying',
    question: 'What is the primary difference between Object.assign() / spread and structuredClone()?',
    options: [
      'structuredClone() performs a true deep clone supporting nested objects and circular references; spread and Object.assign() only perform a shallow copy.',
      'structuredClone() only clones DOM elements; Object.assign() clones JavaScript objects.',
      'structuredClone() converts functions into strings; spread deletes them.',
      'There is no functional difference in modern V8 engines.'
    ],
    correctAnswer: 'structuredClone() performs a true deep clone supporting nested objects and circular references; spread and Object.assign() only perform a shallow copy.',
    explanation: 'structuredClone() uses the HTML structured clone algorithm to deeply duplicate nested objects, Dates, RegExps, TypedArrays, and handles cyclical references, whereas {...obj} only copies top-level properties by reference.',
    codeSnippet: `const state = { user: { name: "Sarah" }, scores: [90, 95] };
const shallow = { ...state };
shallow.user.name = "Alex"; // Mutates state.user.name!

const deep = structuredClone(state);
deep.user.name = "Morgan"; // state.user.name remains untouched!`,
    learningObjective: 'Choose appropriate cloning techniques (shallow copy vs structuredClone).'
  },
  {
    id: 'js-adv-005',
    technology: 'javascript',
    level: 'advanced',
    topic: 'Function Binding & Execution Context',
    question: 'What is the functional difference between Function.prototype.call() and Function.prototype.bind()?',
    options: [
      'call() invokes the function immediately with the provided "this" context; bind() returns a new function with "this" bound for later invocation.',
      'bind() invokes immediately; call() returns a generator.',
      'call() only accepts array arguments; bind() accepts comma-separated values.',
      'bind() works on async functions while call() only works on sync functions.'
    ],
    correctAnswer: 'call() invokes the function immediately with the provided "this" context; bind() returns a new function with "this" bound for later invocation.',
    explanation: 'call(thisArg, ...args) and apply(thisArg, [args]) execute the function immediately. bind(thisArg, ...args) creates and returns a new bound function that can be executed at a later time with its this permanently set.',
    learningObjective: 'Master explicit function context binding with call, apply, and bind.'
  },
  {
    id: 'js-adv-006',
    technology: 'javascript',
    level: 'advanced',
    topic: 'Promises & Asynchronous Composition',
    question: 'What does Promise.race() resolve or reject to?',
    options: [
      'The eventual result or rejection reason of the very first promise in the iterable that settles.',
      'The result of whichever promise returned the highest numeric value.',
      'A boolean indicating if all promises finished in under 1 second.',
      'An array of settled promises sorted by execution duration.'
    ],
    correctAnswer: 'The eventual result or rejection reason of the very first promise in the iterable that settles.',
    explanation: 'Promise.race() takes an iterable of promises and returns a single Promise that settles as soon as any of the input promises settles (whether it resolves or rejects), commonly used for request timeouts.',
    codeSnippet: `const timeout = new Promise((_, reject) => 
  setTimeout(() => reject(new Error("Timeout")), 5000)
);
const fetchResult = fetch("/api/assessment-data");

// Fails if network takes longer than 5 seconds:
Promise.race([fetchResult, timeout]);`,
    learningObjective: 'Implement timeout and race condition handling with Promise.race.'
  },
  {
    id: 'js-adv-007',
    technology: 'javascript',
    level: 'advanced',
    topic: 'Modern JavaScript Metaprogramming',
    question: 'What is the primary role of a Proxy object and its handler "traps" in modern JavaScript?',
    options: [
      'Intercepts and customizes fundamental operations on an object (such as property lookup, assignment, enumeration, or function invocation).',
      'Acts as a local network proxy cache for HTTP requests.',
      'Encrypts sensitive properties inside localStorage.',
      'Converts standard objects into Web Workers.'
    ],
    correctAnswer: 'Intercepts and customizes fundamental operations on an object (such as property lookup, assignment, enumeration, or function invocation).',
    explanation: 'A Proxy wraps a target object and allows you to intercept internal methods (using traps like get, set, has, deleteProperty, apply). This powers modern reactive frameworks like Vue 3 and validation systems.',
    codeSnippet: `const target = { score: 10 };
const handler = {
  set(obj, prop, value) {
    if (prop === 'score' && value < 0) {
      throw new Error("Score cannot be negative");
    }
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);`,
    learningObjective: 'Leverage JavaScript Proxies for reactivity and property interception.'
  },
  {
    id: 'js-adv-008',
    technology: 'javascript',
    level: 'advanced',
    topic: 'The Event Loop & Concurrency',
    question: 'How does queueMicrotask() differ from setTimeout(..., 0)?',
    options: [
      'queueMicrotask() executes immediately after the current task before yielding to the browser rendering engine; setTimeout yields to the macrotask queue and browser paint cycle.',
      'queueMicrotask() executes in a separate background OS thread.',
      'setTimeout(..., 0) guarantees execution in 0.00 milliseconds.',
      'queueMicrotask() only runs when the browser tab is in the background.'
    ],
    correctAnswer: 'queueMicrotask() executes immediately after the current task before yielding to the browser rendering engine; setTimeout yields to the macrotask queue and browser paint cycle.',
    explanation: 'Microtasks (Promise callbacks, queueMicrotask, MutationObserver) run to completion right after the current script exits, before any macrotasks or browser rendering updates occur. In contrast, setTimeout(..., 0) has a minimum 4ms clamp in nested calls and yields to rendering.',
    learningObjective: 'Differentiate microtask scheduling from timer macrotasks.'
  },
  {
    id: 'js-adv-009',
    technology: 'javascript',
    level: 'advanced',
    topic: 'Iterators & Generators',
    question: 'What does calling .next() on a JavaScript Generator function return?',
    options: [
      'An object containing { value: any, done: boolean } representing the yielded value and completion status.',
      'A Promise that resolves to the next iteration value.',
      'The next raw value directly without any container.',
      'An array containing the current index and value.'
    ],
    correctAnswer: 'An object containing { value: any, done: boolean } representing the yielded value and completion status.',
    explanation: 'Generators adhere to the Iterator protocol. Calling generator.next() advances execution until the next yield statement, returning { value: yieldedExpression, done: false }. When the generator returns, it yields { value: returnValue, done: true }.',
    codeSnippet: `function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}
const gen = idGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }`,
    learningObjective: 'Construct custom iterators using generator functions and yield.'
  },
  {
    id: 'js-adv-010',
    technology: 'javascript',
    level: 'advanced',
    topic: 'Memory & Garbage Collection',
    question: 'What is a WeakMap in JavaScript and why does it not prevent garbage collection of its keys?',
    options: [
      'A collection of key/value pairs where keys must be objects/symbols held weakly, allowing them to be garbage-collected if no other references exist.',
      'A map that automatically clears all its entries every 60 seconds.',
      'A map stored in localStorage with restricted storage capacity.',
      'A read-only frozen map object.'
    ],
    correctAnswer: 'A collection of key/value pairs where keys must be objects/symbols held weakly, allowing them to be garbage-collected if no other references exist.',
    explanation: 'WeakMap references to object keys are "weak". If the key object has no other references in memory, the engine can garbage collect the object and remove the entry, preventing memory leaks when storing metadata about DOM nodes or private data.',
    learningObjective: 'Utilize WeakMap and WeakSet for memory-safe metadata tracking.'
  }
];
