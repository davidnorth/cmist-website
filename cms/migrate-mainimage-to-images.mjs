// One-off migration: moves `mainImage` into the new sortable `images` array
// as the first item, preserving hotspot/crop.
//
// Preview: npx sanity exec migrate-mainimage-to-images.mjs --with-user-token -- --dry-run
// Run:     npx sanity exec migrate-mainimage-to-images.mjs --with-user-token
import { randomUUID } from 'node:crypto'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ perspective: 'raw' })
const dryRun = process.argv.includes('--dry-run')

async function main() {
  const docs = await client.fetch(`
    *[_type in ["project", "facility"] && defined(mainImage.asset)] {
      _id,
      _type,
      title,
      mainImage
    }
  `)

  if (docs.length === 0) {
    console.log('Nothing to migrate — no documents have a mainImage.')
    return
  }

  console.log(`Found ${docs.length} document(s) with a mainImage${dryRun ? ' (dry run)' : ''}:`)

  const transaction = client.transaction()

  for (const doc of docs) {
    const { _type, asset, _key, ...rest } = doc.mainImage
    const image = { _type: 'image', _key: randomUUID(), asset, ...rest }

    console.log(`  ${doc._type}: ${doc.title} (${doc._id})`)

    if (!dryRun) {
      transaction.patch(doc._id, (patch) =>
        patch
          .setIfMissing({ images: [] })
          .insert('after', 'images[-1]', [image])
          .unset(['mainImage'])
      )
    }
  }

  if (dryRun) {
    console.log('Dry run — no changes written.')
    return
  }

  const result = await transaction.commit()
  console.log(`Done — updated ${result.results.length} document(s).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
