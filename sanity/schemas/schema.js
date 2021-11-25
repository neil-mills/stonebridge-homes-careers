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
import articlesBlock from './articlesBlock';
import imageAndTextBlock from './imageAndTextBlock';
import vacanciesListBlock from './vacanciesListBlock';
import peopleListBlock from './peopleListBlock';
import quoteListBlock from './quoteListBlock';
import settings from './settings';
import homeBanner from './homeBanner';
import imageBanner from './imageBanner';
import parallaxImageBlock from './parallaxImageBlock';
import timelineBlock from './timelineBlock';
import timelineSection from './timelineSection';
import timelineItem from './timelineItem';
import keylineGridBlock from './keylineGridBlock';
import keylineGridItem from './keylineGridItem';
import valuesBlock from './valuesBlock';
import valuesItem from './valuesItem';
import subContractorBlock from './subContractorBlock';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    homeBanner,
    imageBanner,
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
    articlesBlock,
    vacanciesListBlock,
    peopleListBlock,
    quoteListBlock,
    settings,
    parallaxImageBlock,
    timelineBlock,
    timelineSection,
    timelineItem,
    keylineGridBlock,
    keylineGridItem,
    valuesBlock,
    valuesItem,
    subContractorBlock,
  ]),
});
