# Error Handling

SDK uses the **Result Pattern** from [neverthrow](https://github.com/supermacro/neverthrow).

## Using `.match()`

```typescript
result.match(
  (listResult) => console.log(listResult.data),
  (error) => console.error(error.message)
);
```

## Guard Checks

```typescript
if (result.isOk()) {
  const { data, pagination } = result.value;
}

if (result.isErr()) {
  console.error(result.error.message);
}
```
