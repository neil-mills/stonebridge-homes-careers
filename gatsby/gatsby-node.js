const path = require('path')
import fetch from 'isomorphic-fetch'

async function fetchVacanciesAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  //turn vacancies into nodes
  console.log('fetch vacancies!')
  const jsonData = {
    APIKey: '63070fff-b064-42a9-a231-58f1a0dda087',
    Action: 'GetAllVacancies',
  }
  try {
    const res = await fetch('https://api.peoplehr.net/Vacancy', {
      type: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    const vacancies = await res.json()
    console.log(vacancies)
  } catch (err) {
    console.log('ERROR=', err)
  }
}
export const sourceNodes = async params => {
  //fetch list of beers and source them into gatsby api
  await Promise.all([fetchVacanciesAndTurnIntoNodes(params)])
}
// const newsPages = async ({ graphql, actions }) => {
//   const articleTemplate = path.resolve('./src/templates/Article.tsx')
//   const { data } = await graphql(`
//     query {
//       articles: allSanityArticle {
//         nodes {
//           id
//           title
//           text
//           date
//           slug {
//             current
//           }
//         }
//       }
//     }
//   `)
//   data.articles.nodes.forEach(article => {
//     actions.createPage({
//       path: `news/${article.slug.current}`,
//       component: articleTemplate,
//       context: {
//         slug: article.slug.current,
//       },
//     })
//   })
// }

// const newsCategories = async ({ graphql, actions }) => {
//   const newsCategoryTemplate = path.resolve('./src/pages/our-community.tsx')
//   const { data } = await graphql(`
//     query {
//       categories: allSanityNewsCategory {
//         nodes {
//           id
//           title
//           slug {
//             current
//           }
//         }
//       }
//     }
//   `)
//   data.categories.nodes.forEach(category => {
//     actions.createPage({
//       path: `category/${category.slug.current}`,
//       component: newsCategoryTemplate,
//       context: {
//         category,
//       },
//     })
//   })
// }

const sitePages = async ({ graphql, actions }) => {
  const pageTemplate = path.resolve('./src/templates/Page.tsx')
  const { data } = await graphql(`
    query {
      pages: allSanityPage {
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
  data.pages.nodes.forEach(page => {
    actions.createPage({
      path: `/${page.slug.current}`,
      component: pageTemplate,
      context: {
        id: page.id,
        title: page.title,
        slug: page.slug.current,
      },
    })
  })
}

export const createPages = async params => {
  await Promise.all([sitePages(params)])
}
