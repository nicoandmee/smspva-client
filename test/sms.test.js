const SMSPVAClient = require('..');
let client;

beforeEach(() => {
    client = new SMSPVAClient({
        key: 'Agy7UgoqMOW3dS1H3QO9NOC5utciHCe9ID5sJjIl',
    });
});


test('Can get a Venmo number', async () => {
    const tempPhone = await client.getNumber('US', 'venmo');
    
    expect(tempPhone).toBeDefined();
});
