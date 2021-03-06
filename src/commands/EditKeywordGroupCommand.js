import { $$, ItemCommand } from 'substance'
import KeywordGroupModal from '../components/KeywordGroupModal'

export default class EditKeywordGroupCommand extends ItemCommand {
  getType () {
    return 'keyword-group'
  }

  execute (params, context) {
    const { node } = params.commandState
    const editorSession = context.editorSession
    const api = context.api
    return editorSession.getRootComponent().send('requestModal', () => {
      return $$(KeywordGroupModal, {
        mode: 'edit',
        node
      })
    }).then(modal => {
      if (!modal) return
      const data = modal.getData()
      data.keywords = data.keywords.filter(Boolean)
      const keywordGroupData = {
        type: 'keyword-group',
        name: data.name,
        keywords: data.keywords
      }
      api.updateKeywordGroup(node.id, keywordGroupData)
    })
  }
}
