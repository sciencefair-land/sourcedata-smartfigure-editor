import { $$ } from 'substance'
import FigurePanelComponent from './FigurePanelComponent'
import { NodeComponent } from 'substance-texture'

export default class FigurePanels extends NodeComponent {
  render () {
    const node = this.props.node
    const panels = node.resolve('panels')
    const el = $$('div', { class: 'sc-figure-panels' })

    for (let idx = 0; idx < panels.length; idx++) {
      const panel = panels[idx]
      el.append(
        $$(FigurePanelComponent, { node: panel }).ref(panel.id)
      )
    }

    return el
  }

  _onNodeUpdate (change) {
    // Only rerender this when 'panels' have changed, as opposed to other properties such as title
    if (change.hasUpdated([this.props.node.id, 'panels'])) {
      this.rerender()
    }
  }
}
