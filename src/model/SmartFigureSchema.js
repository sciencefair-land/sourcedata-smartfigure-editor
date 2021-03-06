import { SchemaBuilder } from 'substance'
import PanelMixin from './PanelMixin'

const RICH_TEXT_ANNOS = ['bold', 'cite', 'italic', 'link', 'subscript', 'superscript', 'strike']
const TITLE = () => {
  return {
    type: 'text',
    childTypes: ['italic', 'superscript', 'subscript']
  }
}
const LEGEND = () => {
  return {
    type: 'container',
    childTypes: ['paragraph'],
    defaultTextType: 'paragraph'
  }
}

export default function SmartFigureSchema () {
  const builder = new SchemaBuilder('smart-figure', 'SourceData')

  builder.nextVersion(v => {
    // smart-figure
    v.addNode('smart-figure', '@node', {
      title: TITLE(),
      authors: {
        type: 'children',
        childTypes: ['author'],
        optional: true
      },
      affiliations: {
        type: 'children',
        childTypes: ['affiliation'],
        optional: true
      },
      panels: {
        type: 'children',
        childTypes: ['panel']
      },
      additionalInformation: {
        type: 'container',
        childTypes: ['paragraph'],
        defaultTextType: 'paragraph'
      },
      files: {
        type: 'children',
        childTypes: ['file'],
        optional: true
      },
      resources: {
        type: 'children',
        childTypes: ['resource'],
        optional: true
      },
      references: {
        type: 'children',
        childTypes: ['reference'],
        optional: true
      }
    })
    // author
    v.addNode('author', '@node', {
      firstName: { type: 'string' },
      middleNames: { type: 'string-array', optional: true },
      lastName: { type: 'string' },
      prefix: { type: 'string', optional: true },
      suffix: { type: 'string', optional: true },
      affiliations: { type: 'many', targetTypes: ['affiliation'], optional: true }
    })
    v.addNode('affiliation', '@node', {
      name: { type: 'string' },
      city: { type: 'string', optional: true },
      country: { type: 'string', optional: true },
      label: { type: 'string', optional: true }
    })
    // panel
    v.addNode('panel', '@node', {
      label: { type: 'string' },
      image: { type: 'child', childTypes: ['image'] },
      legend: LEGEND(),
      keywords: {
        type: 'children',
        childTypes: ['keyword-group'],
        optional: true
      },
      files: {
        type: 'many',
        childTypes: ['file'],
        optional: true
      },
      resources: {
        type: 'many',
        childTypes: ['resource'],
        optional: true
      }
    }, { Mixin: PanelMixin })
    // image
    v.addNode('image', '@asset', {
      // ATTENTION: these are not used as regular properties, but linked to the information in the DAR
      src: { type: 'string' },
      mimetype: { type: 'string', optional: true }
    })
    // keyword-group + keyword
    v.addNode('keyword-group', '@node', {
      name: { type: 'string' },
      keywords: { type: 'children', childTypes: ['keyword'] }
    }, { omitPropertyElement: true })
    v.addNode('keyword', '@text', {
      content: { type: 'string' }
    })
    v.addNode('file', '@asset', {
      // ATTENTION: these are not used as regular properties, but linked to the information in the DAR
      src: { type: 'string' },
      mimetype: { type: 'string', optional: true },
      title: TITLE(),
      legend: LEGEND()
    })
    v.addNode('resource', '@node', {
      href: { type: 'string' },
      title: TITLE(),
      legend: LEGEND()
    })
    v.addNode('reference', '@node', {
      label: { type: 'string' },
      content: {
        type: 'text',
        childTypes: ['bold', 'italic', 'link', 'superscript', 'subscript']
      }
    }, { omitPropertyElement: true })
    // annotations
    v.addNode('bold', '@annotation')
    v.addNode('cite', '@inlinenode', {
      references: { type: 'many', targetTypes: ['reference'] }
    })
    v.addNode('italic', '@annotation')
    v.addNode('link', '@annotation', {
      href: 'string'
    })
    v.addNode('strike', '@annotation')
    v.addNode('subscript', '@annotation')
    v.addNode('superscript', '@annotation')
    // paragraph
    v.addNode('paragraph', '@text', {
      content: { type: 'text', childTypes: RICH_TEXT_ANNOS }
    })
  })

  const schema = builder.createSchema()
  // HACK: we still have to set documentSchema.defaultTextType
  schema._documentSchema.defaultTextType = 'paragraph'

  return schema
}
