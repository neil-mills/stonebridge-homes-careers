import S from '@sanity/desk-tool/structure-builder';

const Sidebar = () =>
  S.list()
    .title('Stonebridge')
    .items([
      S.listItem()
        .title('Settings')
        .child(S.editor().schemaType('settings').documentId('siteSettings')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'settings'
      ),
    ]);

export default Sidebar;
