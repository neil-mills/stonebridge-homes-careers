const path = require('path')

const newsPages = async ({ graphql, actions }) => {
  const articleTemplate = path.resolve('./src/templates/Article.tsx')
  const { data } = await graphql(`
    query {
      articles: allSanityArticle {
        nodes {
          id
          title
          text
          date
          slug {
            current
          }
        }
      }
    }
  `)
  data.articles.nodes.forEach(article => {
    actions.createPage({
      path: `news/${article.slug.current}`,
      component: articleTemplate,
      context: {
        slug: article.slug.current,
      },
    })
  })
}

const newsCategories = async ({ graphql, actions }) => {
  const newsCategoryTemplate = path.resolve('./src/pages/our-community.tsx')
  const { data } = await graphql(`
    query {
      categories: allSanityNewsCategory {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
    }
  `)
  data.categories.nodes.forEach(category => {
    actions.createPage({
      path: `category/${category.slug.current}`,
      component: newsCategoryTemplate,
      context: {
        category,
      },
    })
  })
}

// export const createPages = async params => {
//   await Promise.all([newsPages(params), newsCategories(params)])
// }
