import { getSuggestions } from '../../helpers/getSuggestions';

describe('getSuggestions', () => {
  test('should return the correct payload', async () => {
    const searchTerm = 'madrid';

    const suggestions = await getSuggestions(searchTerm);

    const expectedPayload = [
      {
        code: 'MAD',
        name: 'Madrid, Barajas, Community of Madrid, Spain (MAD)',
        city: 'Madrid',
        country: 'Spain',
      },
      {
        code: 'CLQ',
        name: 'Colima, Miguel de la Madrid, Colima, Mexico (CLQ)',
        city: 'Colima',
        country: 'Mexico',
      },
    ];

    expect(suggestions).toEqual(expectedPayload);
  });
});
