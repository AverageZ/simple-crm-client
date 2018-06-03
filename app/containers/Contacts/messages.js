/*
 * Contacts Messages
 *
 * This contains all the text for the Contacts component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.containers.Contacts';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is Contacts container !',
  },
  table: {
    id: `${scope}.table`,
    defaultMessage: 'Contacts Table',
    header: {
      id: `${scope}.table.header`,
      name: {
        id: `${scope}.table.header.name`,
        defaultMessage: 'Name',
      },
      organizations: {
        id: `${scope}.table.header.organizations`,
        defaultMessage: 'Organizations',
      },
      email: {
        id: `${scope}.table.header.email`,
        defaultMessage: 'Email',
      },
    },
  },
});
