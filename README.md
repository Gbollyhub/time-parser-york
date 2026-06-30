# Relative Time Parser

A TypeScript function that parses relative time modifier
strings (similar to Splunk's format) and returns a UTC Date.

## Installation
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Usage

```typescript
import { parse } from './src/parse';

const date = parse('now()+3d+12h');
// Returns a Date object: 3 days and 12 hours from now

## Supported Format

Expressions start with `now()` followed by one or more
modifiers using `+` (add) or `-` (subtract) operators.

### Time Units

| Unit | Name   |
|------|--------|
| s    | Second |
| m    | Minute |
| h    | Hour   |
| d    | Day    |
| mon  | Month  |
| y    | Year   |

### Examples

| Input              | Description                     |
|--------------------|---------------------------------|
| now()+1d           | Now plus 1 day                  |
| now()+8d           | Now plus 8 days                 |
| now()+10d+12h      | Now plus 10 days and 12 hours   |
| now()-2d+12h       | Now minus 2 days plus 12 hours  |

## Running Tests

npm test