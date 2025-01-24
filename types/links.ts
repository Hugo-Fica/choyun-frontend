type SubLinkType = {
  title: string
  href: string
}

export type LinkType = {
  title: string
  subLinks: SubLinkType[]
}

export type UserRole = 'sup_admin' | 'admin' | 'user'

export type LinkTypeAuth = {
  title: string
  url: string
  auth: UserRole[]
}
