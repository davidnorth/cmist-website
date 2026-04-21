const { createClient } = require('@sanity/client')
const { toHTML } = require('@portabletext/to-html')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: 'ah6pphsm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
})

const outFile = path.join(__dirname, '../src/_data/projects.json')

async function fetchAndWrite() {
  const projects = await client.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      content,
      "imageUrl": mainImage.asset->url
    }
  `)

  const data = projects.map(p => ({
    ...p,
    contentHtml: p.content ? toHTML(p.content) : '',
  }))

  fs.writeFileSync(outFile, JSON.stringify(data, null, 2))
  console.log(`[sanity] fetched ${data.length} project(s)`)
}

module.exports = { fetchAndWrite }

if (require.main === module) {
  fetchAndWrite().catch(err => { console.error(err); process.exit(1) })
}
