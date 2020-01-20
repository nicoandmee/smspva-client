const SMSPVAClient = require('..');
let client;

beforeEach(() => {
    client = new SMSPVAClient({
        key: process.env.SMSPVA_KEY,
    });
});


test('Can get a Venmo number', async () => {
    const tempPhone = await client.getNumber({country: 'US', service: 'venmo'});

    expect(tempPhone).toBeDefined();
});
