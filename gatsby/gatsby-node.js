const path = require('path')
const fetch = require('isomorphic-fetch')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const fetchVacanciesAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  //turn vacancies into nodes
  const jsonData = {
    APIKey: process.env.API_KEY,
    Action: 'GetAllVacancies',
  }
  try {
    const res = await fetch('https://api.peoplehr.net/Vacancy/', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/json',
      },
      body: JSON.stringify(jsonData),
    })
    const vacancies = await res.json()
    console.log(vacancies)
    for (const vacancy of vacancies.Result) {
      const nodeMeta = {
        id: createNodeId(vacancy.Reference),
        parent: null,
        children: [],
        internal: {
          type: 'Vacancy',
          mediaType: 'application/json',
          contentDigest: createContentDigest(vacancy),
        },
      }
      actions.createNode({
        ...vacancy,
        ...nodeMeta,
      })
    }
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

const vacancyPages = async ({ graphql, actions }) => {
  const pageTemplate = path.resolve('./src/templates/Vacancy.tsx')
  const { data } = await graphql(`
    query {
      vacancies: allVacancy {
        nodes {
          City
          ClosingDate(fromNow: false)
          Company
          Country
          Department
          Experience
          IsHideSalary
          JobBordUrl
          JobDescription
          JobTitle
          Location
          Reference
          SalaryRange
          Status
          VacancyDescription
          VacancyName
          VacancyType
          id
        }
      }
    }
  `)
  data.vacancies.nodes.forEach(vacancy => {
    actions.createPage({
      path: `/vacancy/${vacancy.id}`,
      component: pageTemplate,
      context: {
        id: vacancy.id,
      },
    })
  })
}

export const createPages = async params => {
  await Promise.all([sitePages(params), vacancyPages(params)])
}
