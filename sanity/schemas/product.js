
export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'title'
      },
      {
        name: "image",
        title: "Image",
        type: "array",
        of: [{ type: "image" }],
        options: {
          hotspot: true,
        }
      },
      {
        name:'description',
        type:'text',
        title:'blockContent',

      },
      {
        name:'slug',
        type:'slug',
        title:'Slug',
        options:{
            source:'title',
        }
      },
      {
        name:'price',
        type:'number',
        title:'price',
      },
      {
        name:'category',
        title:'category',
        type:'reference',
        to:[{
            type:'category',
        }]
      }

    ]
  }