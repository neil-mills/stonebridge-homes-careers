import { ArticleType, CategoryType } from '../types'
export const getArticleCategories = (
  articles: ArticleType[]
): CategoryType[] => {
  const categories: CategoryType[] = articles.reduce(
    (acc: CategoryType[], article: ArticleType) => {
      if (article.categories) {
        const uniqueCats = article.categories.filter(
          ({ id }) => !acc.map(cat => cat.id).includes(id)
        )
        if (uniqueCats.length) {
          acc = [...acc, ...uniqueCats]
        }
      }
      return acc
    },
    []
  )
  return categories
}
