const SMSPVAClient = require('..');
let client;

beforeEach(() => {
    client = new SMSPVAClient({
        key: process.env.SMSPVA_KEY,
    });
});

test('Can check balance', async () => {
    const bal = await client.getBalance();

    expect(bal).toBeNumber();
});

test('Can get a Venmo number', async () => {
    const tempPhone = await client.getNumber({country: 'US', service: 'venmo'});

    expect(tempPhone).toBeDefined();
});
