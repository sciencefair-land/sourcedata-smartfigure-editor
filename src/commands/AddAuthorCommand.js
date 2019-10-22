import { Command, $$ } from 'substance'
import AuthorModal from '../components/AuthorModal'

export default class AddAuthorCommand extends Command {
  getCommandState () {
    return { disabled: false }
  }

  execute (params, context) {
    context.editorSession.getRootComponent().send('requestModal', () => {
      return $$(AuthorModal, { mode: 'create' })
    }).then(modal => {
      if (!modal) return
      const firstName = modal.refs.firstName.val()
      const lastName = modal.refs.lastName.val()
      context.api.addAuthor({ firstName, lastName })
    })
  }
}
