import constantsMain from 'constants/main'
import constantsDev from 'constants/development'
import constantsProd from 'constants/production'

export default Object.assign({}, constantsMain, APP_ENV === 'production' ? constantsProd : constantsDev)