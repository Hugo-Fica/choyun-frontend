interface SubLinkType {
  title: string
  href: string
}

export interface LinkType {
  title: string
  subLinks: SubLinkType[]
}
