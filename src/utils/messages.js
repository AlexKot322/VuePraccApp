import localizeFilter from '@/filters/localize.filter'

export default {
  logout: localizeFilter('YouAreLogout'),
  login: localizeFilter('ToGetStartedLogin'),
  'auth/user-not-found': localizeFilter('UserNotExist'),
  'auth/wrong-password': localizeFilter('InvalidPasswordOrLogin'),
  'auth/email-already-in-use': localizeFilter('UserAlreadyExist'),
}
