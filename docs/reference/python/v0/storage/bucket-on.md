---
title: Python - bucket.on()
description: Reference for Nitric's Python library - Create a new bucket notification trigger
---

Create a new bucket notification trigger when certain files are created or deleted.

```python
from nitric.resources import bucket

assets = bucket("assets")

accessible_assets = bucket("assets").allow("reading")

# The request will contain the name of the file `key` and the type of event `type`
@assets.on("delete", "*")
def delete_anything(ctx):
  print(f"a file named {ctx.req.key} was deleted")

@assets.on("write", "/images/cat")
def create_cat_image(ctx):
  print(f"A cat image was written")

# If `on` is called with a permissioned bucket, a file will also be provided with the request
@accessible_assets.on("write", "/images/dog")
async def access_dog_file(ctx):
  dog_image = await ctx.req.file.read()

  print(dog_image)
```

## Parameters

---

**notification type** required `write` or `delete`

The notification type for a triggered event, either on a file write or a file delete.

**notification prefix filter** required `string`

The file prefix filter that must match for a triggered event. If multiple filters overlap across notifications then an error will be thrown when registering the resource.

**middleware** required `BucketNotificationMiddleware`

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