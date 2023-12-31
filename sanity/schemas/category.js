export default {
    name: 'category',
    type: 'document',
    title: 'category',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'title'
      },
      {
        name:'slug',
        type:'slug',
        title:'Slug',
        options:{
            source:'title',
        }
      }
    ]
  }