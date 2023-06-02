---
title: Node.js - bucket.on()
description: Reference for Nitric's Node.js library - Create a new bucket notification trigger
---

Create a new bucket notification trigger when certain files are created or deleted.

```javascript
import { bucket } from '@nitric/sdk';

const assets = bucket('assets');

const accessibleAssets = bucket('assets').for('reading');

// The request will contain the name of the file `key` and the type of event `type`
assets.on('delete', '*', (ctx) => {
  console.log(`A file named ${ctx.req.key} was deleted`);
});

assets.on('write', '/images/cat', (ctx) => {
  console.log('A cat image was written');
});

// If `on` is called with a permissioned bucket, a file will also be provided with the request
accessibleAssets.on('write', '/images/dog', async (ctx) => {
  const dogImage = await ctx.req.file.read();

  console.log(dogImage);
});
```

## Parameters

---

**notification type** required `write` or `delete`

The notification type for a triggered event, either on a file write or a file delete.

**notification prefix filter** required `string`

The file prefix filter that must match for a triggered event. If multiple filters overlap across notifications then an error will be thrown when registering the resource.

**middleware** required `BucketNotificationMiddleware` or `BucketNotificationMiddleware[]`

The middleware (code) to be triggered by the bucket notification being triggered.

---

### Available trigger types:

**write**

Run when a file in the bucket is created using: `file.write()`

**delete**

Run when a file in the bucket is deleted using: `file.delete()`

### Trigger type cloud mapping

| Permission | AWS                 | GCP             | Azure                         |
| ---------- | ------------------- | --------------- | ----------------------------- |
| write      | s3:ObjectCreated:\* | OBJECT_FINALIZE | Microsoft.Storage.BlobCreated |
| delete     | s3:ObjectRemoved:\* | OBJECT_DELETE   | Microsoft.Storage.BlobDeleted |