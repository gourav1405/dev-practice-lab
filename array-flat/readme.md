# Array.prototype.flatten – Notes

## What is it?

```js
function flatten() {}
Array.prototype.flatten = flatten;
```

This attaches the `flatten` function to **all arrays** in JavaScript.

---

## Why use `Array.prototype`?

- Every array in JavaScript inherits from `Array.prototype`
- Adding a method here makes it available to every array automatically

---

## Usage

```js
const arr = [1, [2, [3, 4]]];
arr.flatten(); // ✅ works
```

---

## Without `prototype` vs With `prototype`

### ❌ Without prototype

```js
function flatten() {}
const arr = [1, 2];
arr.flatten(); // ❌ Error: not a function
```

> The function is not attached to the array.

### ✅ With prototype

```js
Array.prototype.flatten = flatten;
const arr = [1, 2];
arr.flatten(); // ✅ works
```

---

## The `this` keyword inside `flatten()`

Inside `flatten()`, `this` refers to the array that is calling it.

```js
function flatten() {
  console.log(this);
}
[1, 2].flatten(); // this = [1, 2]
```

---

## Purpose of `flatten()`

Converts a nested array into a single flat array.

```js
[1, [2, [3]]].flatten();
// Output: [1, 2, 3]
```

---

## Key Points

| Point             | Detail                                           |
| ----------------- | ------------------------------------------------ |
| `Array.prototype` | Shared by all arrays                             |
| Behaviour         | Makes the function behave like a built-in method |
| Cleaner syntax    | `arr.flatten()` instead of `flatten(arr)`        |
| Arrow functions   | **Cannot** be used here (see below)              |

---

## Normal Function vs Arrow Function

Arrow functions do **not** have their own `this` context, so they won't work correctly when attached to `Array.prototype`.

### ✅ Normal Function (works correctly)

```js
Array.prototype.flatten = function () {
  console.log(this);
};

[1, 2].flatten();
// 👉 this = [1, 2]
```

`[1, 2]` is calling `flatten()`, so `this` = `[1, 2]`.

---

### ❌ Arrow Function (broken)

```js
Array.prototype.flatten = () => {
  console.log(this);
};

[1, 2].flatten();
// 👉 this ≠ [1, 2]  (uses outer scope's this instead)
```

Arrow functions **ignore** the caller and use whatever `this` was in the surrounding scope.

---

## Real-Life Analogy 🍽️

| Function type   | Behaviour                            | Analogy                                                                              |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------------ |
| Normal function | Responds to whoever called it ✅     | **Attentive Waiter** – customer calls, waiter responds: _"Yes, coming!"_             |
| Arrow function  | Ignores caller, uses outer `this` ❌ | **Distracted Waiter** – customer calls, waiter says: _"I only listen to my manager"_ |

---

## One-Line Memory Trick 💡

> **Arrow function** → _"I don't care who called me"_
>
> **Normal function** → _"I respond to whoever called me"_
