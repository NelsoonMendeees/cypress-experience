import '@mmisty/cypress-allure-adapter/support'
import { addCommands } from 'cypress-mongodb/dist/index-browser'
addCommands()

import './commands'
import './views/components'
import './views/create'
import './views/maps'
