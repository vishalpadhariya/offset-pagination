# Offset Pagination

Offset Pagination Package is a TypeScript npm package that provides utility functions for implementing dynamic offset pagination in your Node.js applications.

## Installation

You can install the Pagination Package via npm:

```bash
npm install @padhariyavishal/offset-pagination
```

## Usage

```bash
import { DataPagination, DataPaginationType } from '@padhariyavishal/offset-pagination';

const items = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

const currentPage = 3;
const itemsPerPage = 10;
const midSize = 2;

const pagination: DataPaginationType<{ id: number, name: string }> = DataPagination(items, currentPage, itemsPerPage, midSize);

console.log(pagination);
```