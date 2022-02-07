const path = require('path')
const fetch = require('isomorphic-fetch')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const getArticleCategories = articles => {
  const categories = articles.reduce((acc, article) => {
    if (article.categories) {
      const uniqueCats = article.categories.filter(
        ({ id }) => !acc.map(cat => cat.id).includes(id)
      )
      if (uniqueCats.length) {
        acc = [...acc, ...uniqueCats]
      }
    }
    return acc
  }, [])
  return categories
}

const fetchVacanciesAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  //turn vacancies into nodes
  const jsonData = {
    APIKey: process.env.GATSBY_APIKEY,
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

const sitePages = async ({ graphql, actions }) => {
  const articleTemplate = path.resolve('./src/templates/Article.tsx')
  const pageTemplate = path.resolve('./src/templates/Page.tsx')
  //query all pages and articles
  const { data } = await graphql(`
    query {
      pages: allSanityPage {
        totalCount
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
      articles: allSanityArticle {
        totalCount
        nodes {
          id
          title
          categories {
            title
            slug {
              current
            }
            id
          }
        }
      }
    }
  `)

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(data.articles.totalCount / pageSize)
  const categories = getArticleCategories(data.articles.nodes)
  const categoryIds = categories.map(cat => cat.id)

  //loop to create the paginated pages
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/our-community/page/${i + 1}`,
      component: pageTemplate,
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
        title: 'Our community',
        categoryIds,
        categories,
      },
    })
  })

  //create article category pages
  categories.forEach(({ id, slug }) => {
    actions.createPage({
      path: `/our-community/category/${slug.current}`,
      component: pageTemplate,
      context: {
        categoryIds: [id],
        categories,
        title: 'Our community',
        skip: 0,
        currentPage: 1,
        pageSize: data.articles.totalCount,
      },
    })
  })

  data.articles.nodes.forEach(article => {
    actions.createPage({
      path: `/articles/${article.id}`,
      component: articleTemplate,
      context: {
        id: article.id,
        skip: 0,
        currentPage: 1,
        pageSize: data.articles.totalCount,
        categoryIds,
        categories,
      },
    })
  })

  data.pages.nodes.forEach(page => {
    actions.createPage({
      path: page.slug.current === 'home' ? '/' : `/${page.slug.current}`,
      component: pageTemplate,
      context: {
        id: page.id,
        title: page.title,
        slug: page.slug.current,
        skip: 0,
        currentPage: 1,
        pageSize: data.articles.totalCount,
        categoryIds,
        categories,
      },
    })
  })
}

export const createPages = async params => {
  await Promise.all([sitePages(params), vacancyPages(params)])
}
