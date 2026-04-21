import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ah6pphsm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const projects = [
  {
    _type: 'project',
    title: 'Workshop Restoration',
    slug: {_type: 'slug', current: 'workshop-restoration'},
    content: [
      {
        _type: 'block',
        _key: 'a1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'a1s1',
            text: 'Our workshop restoration project has been one of our most rewarding undertakings. A group of members spent several months refurbishing an old timber-framed workshop, replacing the roof, installing new workbenches, and fitting out dedicated areas for woodworking, metalwork, and electronics repair.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'a2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'a2s1',
            text: 'The space now hosts weekly drop-in sessions where members can work on personal projects, learn new skills, and share their expertise with others. It has become the heart of our community, welcoming everyone from retired tradespeople to those who have never picked up a tool before.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'project',
    title: 'Community Garden Planters',
    slug: {_type: 'slug', current: 'community-garden-planters'},
    content: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'b1s1',
            text: "In partnership with the local primary school, our members designed and built a set of raised garden planters for the school's outdoor learning area. The project gave our members a chance to apply their woodworking and construction skills while giving back to the wider community.",
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'b2s1',
            text: 'Eight large cedar planters were constructed over four Saturday sessions, with children from the school joining us on the final day to paint and decorate them. The planters are now filled with vegetables and herbs tended by the students throughout the school year.',
            marks: [],
          },
        ],
      },
    ],
  },
]

for (const doc of projects) {
  const result = await client.create(doc)
  console.log(`Created: ${result.title} (${result._id})`)
}
