import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ah6pphsm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const facilities = [
  {
    _type: 'facility',
    title: 'Woodwork',
    slug: {_type: 'slug', current: 'woodwork'},
    content: [
      {
        _type: 'block',
        _key: 'w1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'w1s1',
            text: 'Our woodwork workshop is fully equipped with hand tools, power tools, and benches for all levels of experience. Members work on everything from small repairs and furniture restoration to bespoke joinery projects. Whether you\'re a seasoned carpenter or picking up a chisel for the first time, there\'s always someone on hand to share knowledge and guidance.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'facility',
    title: 'Metalwork',
    slug: {_type: 'slug', current: 'metalwork'},
    content: [
      {
        _type: 'block',
        _key: 'm1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'm1s1',
            text: 'The metalwork area houses welding equipment, an angle grinder, vices, and a range of hand tools for working with steel, aluminium, and other metals. Members have fabricated garden furniture, repaired gates and railings, and built custom brackets and fittings. Safety inductions are provided before using the welding equipment.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'facility',
    title: 'Textile Crafts',
    slug: {_type: 'slug', current: 'textile-crafts'},
    content: [
      {
        _type: 'block',
        _key: 't1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 't1s1',
            text: 'Our textile crafts space includes sewing machines, an overlocker, and materials for embroidery, weaving, and upholstery. Projects have ranged from mending and alterations to making bags, cushion covers, and soft furnishings. It\'s a relaxed, sociable space that welcomes complete beginners and experienced crafters alike.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'facility',
    title: 'Pottery',
    slug: {_type: 'slug', current: 'pottery'},
    content: [
      {
        _type: 'block',
        _key: 'p1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'p1s1',
            text: 'The pottery studio is equipped with a kick wheel, an electric wheel, a kiln, and a full range of hand-building tools and glazes. Members create functional pieces such as mugs, bowls, and vases as well as sculptural and decorative work. Regular firing sessions are scheduled throughout the month.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'facility',
    title: '3D Printing & Laser Cutter',
    slug: {_type: 'slug', current: '3d-printing-laser-cutter'},
    content: [
      {
        _type: 'block',
        _key: 'd1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'd1s1',
            text: 'Our digital fabrication suite features FDM 3D printers and a CO₂ laser cutter, opening up possibilities for precision parts, signage, enclosures, and decorative items. Members have used these machines to produce replacement components, personalised gifts, and prototypes for community projects. Training sessions cover design software and safe machine operation.',
            marks: [],
          },
        ],
      },
    ],
  },
]

for (const doc of facilities) {
  const result = await client.create(doc)
  console.log(`Created: ${result.title} (${result._id})`)
}
