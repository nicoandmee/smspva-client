# smspva-client

> Allows you to spoof SMS number verification using robust API provided by [smspva](https://smspva.com)

- These numbers work for a HUGE number of providers, far too many to list in the README.
- I have not found any other virtual sms provider that works so consistently.

Refer to the [Services List](http://smspva-client.com/new_theme_api.html) for all supported providers. Note that in 2020 they will be releasing a new version, check it out here: [SMSPVA Beta](http://beta.smspva-client.com/).
I have to make use of their API often enough I plan on maintaining this package once their new API spec is finalized. After finishing this package I realized they already have an official package you may well want to use prepared. However, after trying this package I discovered its lacking almost all functionality, so I recommend using this.

* These numbers are perfect for bypassing phone verification challenges during your bot operations among other things!

[![NPM](https://img.shields.io/npm/v/smspva-client.svg)](https://www.npmjs.com/package/smspva-client) [![Build Status](https://travis-ci.com/nicoandmee/smspva-client.svg?branch=master)](https://travis-ci.com/nicoandmee//smspva-client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- mostly designed for use in bypassing automated systems that require SMS number verification
- handles hundreds of known services (wechat, google, facebook, whatsapp, uber, twitter, venmo, paypal, ebay etc...)
- perfect fit for automation, bots, crawlers, credential stuffers (wait, what?)

## Install

```bash
npm install --save smspva-client
```


```js
const smspva = require('smspva-client');

const smspva = new smspva({
  key: '...', // Your API Key goes here
});

// get a number to be used for bypassing the prompt
const number = await smspva.getNumber({country: 'US', service: 'venmo'});

// provide this number to the site presenting you with the challenge, have your bot type it in and submit, etc.
await bot.fillFormAndSubmit(number.number);

// third-party service sends SMS code to the given number

// retrieves the code sent to the number, will poll according to smspva-client's API guidelines until a response is received
const code = await smspva.getSMS({ id: number.id, service: 'google' });

// number did not work? Ban it.
await smspva.ban({ id: number.id, service: 'google' });


// Retrieve count of available nodes on the network that can receive codes
await smspva.ban({ id: number.id, service: 'google' });

```

## References

Please see API documentation for full usage details: [API](https://github.com/nicoandmee/smspva-client/blob/master/api.md).
