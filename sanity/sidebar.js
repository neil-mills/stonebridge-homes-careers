import S from '@sanity/desk-tool/structure-builder';
import { MdSettings as icon } from 'react-icons/md';

const Sidebar = () =>
  S.list()
    .title('Stonebridge')
    .items([
      S.listItem()
        .title('Settings')
        .icon(icon)
        .child(S.editor().schemaType('settings').documentId('siteSettings')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'settings'
      ),
    ]);

export default Sidebar;
