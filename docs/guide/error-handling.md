# Penanganan Error

SDK menggunakan **Result Pattern** dari library [neverthrow](https://github.com/supermacro/neverthrow) untuk error handling yang type-safe dan fungsional.

## Konsep Dasar

Setiap operasi async mengembalikan `Result<T, E>` — bukan melempar exception. Kamu harus secara eksplisit menangani kedua kemungkinan: sukses atau error.

```typescript
const result = await stadata.list.domains({ lang: DataLanguage.ID });
// result: Result<ListResult<Domain>, ApiFailure>
```

## Cara Handle Result

### `.match()` — Direkomendasikan

```typescript
result.match(
  (listResult) => {
    // ✅ Sukses
    console.log(listResult.data);
  },
  (error) => {
    // ❌ Error
    console.error(error.message);
  }
);
```

### `.isOk()` / `.isErr()` — Guard Check

```typescript
if (result.isOk()) {
  const { data, pagination } = result.value;
  // gunakan data
}

if (result.isErr()) {
  console.error(result.error.message);
}
```

### `.map()` — Transform Sukses

```typescript
const namesResult = result.map(
  (listResult) => listResult.data.map(d => d.name)
);
```

### `._unsafeUnwrap()` — Jika Yakin Sukses (Hati-hati!)

```typescript
// Throws jika result adalah error!
const listResult = result._unsafeUnwrap();
```

## Tipe Error

```typescript
class ApiFailure {
  message: string;    // Pesan error yang human-readable
  code?: string;      // Kode error dari API
  statusCode?: number;// HTTP status code
}
```

## Contoh Lengkap

```typescript
import { StadataJS, DataLanguage } from 'stadata-js';

async function fetchPublications(domain: string) {
  const stadata = StadataJS.instance;

  const result = await stadata.list.publications({
    domain,
    lang: DataLanguage.ID,
    page: 1,
    perPage: 10,
  });

  return result.match(
    ({ data, pagination }) => ({
      success: true,
      publications: data,
      total: pagination.total,
      currentPage: pagination.page,
    }),
    (error) => ({
      success: false,
      error: error.message,
    })
  );
}
```

## Async/Await dengan Error Handling

```typescript
const result = await stadata.view.publication({
  id: 'some-id',
  domain: '7200',
  lang: DataLanguage.ID,
});

if (result.isErr()) {
  // Handle error: redirect, show toast, log, dll.
  return null;
}

const publication = result.value;
console.log(publication.title);
```
