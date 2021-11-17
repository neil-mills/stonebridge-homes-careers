// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import article from './article';
import newsCategory from './newsCategory';
import person from './person';
import page from './page';
import navigation from './navigation';
import contentBlock from './contentBlock';
import navigationLink from './navigationLink';
import externalLink from './externalLink';
import contentType from './contentType';
import imageAndTextBlock from './imageAndTextBlock';
import videoAndTextBlock from './videoAndTextBlock';
import newsListBlock from './newsListBlock';
import vacanciesListBlock from './vacanciesListBlock';
import peopleListBlock from './peopleListBlock';
import quoteListBlock from './quoteListBlock';
import settings from './settings';
import homeBanner from './homeBanner';
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    homeBanner,
    article,
    newsCategory,
    person,
    page,
    navigation,
    contentBlock,
    navigationLink,
    externalLink,
    contentType,
    imageAndTextBlock,
    videoAndTextBlock,
    newsListBlock,
    vacanciesListBlock,
    peopleListBlock,
    quoteListBlock,
    settings,
  ]),
});
