export interface NavigationLink {
  __typename: string
  id: string
  title: string
  slug: { current: string }
}

export interface Navigation {
  nodes: NavigationLink[]
}
