type SubLinkType = {
  title: string
  href: string
}

export type LinkType = {
  title: string
  subLinks: SubLinkType[]
}

export type LinkTypeAuth = {
  title: string
  url: string
  auth: 'sup_admin' | 'user'
}
