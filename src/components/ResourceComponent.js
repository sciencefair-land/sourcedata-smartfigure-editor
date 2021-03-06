import { SelectableNodeComponent, $$, renderProperty, domHelpers } from 'substance'
import Section from './Section'
import getLabel from './_getLabel'
import AttachedToComponent from './AttachedToComponent'

export default class ResourceComponent extends SelectableNodeComponent {
  render () {
    const { node } = this.props
    const document = node.getDocument()
    const el = $$('div', { class: 'sc-resource', 'data-id': node.id })
    if (this.state.selected) {
      el.addClass('sm-selected')
    }
    // card header
    el.append(
      $$(Section, { label: getLabel(node) || 'Resource' })
    )
    el.append(
      $$(Section, { label: 'URL' },
        renderProperty(this, document, [node.id, 'href'], { placeholder: 'Enter URL' }).addClass('se-href')
      )
    )

    el.append(
      $$(Section, { label: 'Title' },
        renderProperty(this, document, [node.id, 'title'], { placeholder: 'Enter title' }).addClass('se-title')
      )
    )
    el.append(
      $$(Section, { label: 'Legend' },
        renderProperty(this, document, [node.id, 'legend'], { placeholder: 'Enter legend' }).addClass('se-legend')
      )
    )

    el.append(
      $$(AttachedToComponent, { document, nodeId: node.id })
    )

    el.on('mousedown', this._onMousedown)

    return el
  }

  _onMousedown (e) {
    domHelpers.stopAndPrevent(e)
    this.send('selectItem', this.props.node)
  }
}
