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

const projectsFile = path.join(__dirname, '../src/_data/projects.json')
const facilitiesFile = path.join(__dirname, '../src/_data/facilities.json')

async function fetchAndWrite() {
  const [projects, facilities] = await Promise.all([
    client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
        title,
        "slug": slug.current,
        content,
        "imageUrl": mainImage.asset->url
      }
    `),
    client.fetch(`
      *[_type == "facility"] | order(_createdAt asc) {
        title,
        "slug": slug.current,
        content,
        "imageUrl": mainImage.asset->url
      }
    `),
  ])

  const projectData = projects.map(p => ({
    ...p,
    contentHtml: p.content ? toHTML(p.content) : '',
  }))
  fs.writeFileSync(projectsFile, JSON.stringify(projectData, null, 2))
  console.log(`[sanity] fetched ${projectData.length} project(s)`)

  const facilityData = facilities.map(f => ({
    ...f,
    contentHtml: f.content ? toHTML(f.content) : '',
  }))
  fs.writeFileSync(facilitiesFile, JSON.stringify(facilityData, null, 2))
  console.log(`[sanity] fetched ${facilityData.length} facilit(ies)`)
}

module.exports = { fetchAndWrite }

if (require.main === module) {
  fetchAndWrite().catch(err => { console.error(err); process.exit(1) })
}
