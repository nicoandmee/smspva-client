<a name="SMSPVAClient"></a>

## SMSPVAClient
**Kind**: global class

* [SMSPVAClient](#SMSPVAClient)
    * [new SMSPVAClient([opts])](#new_SMSPVAClient_new)
    * [.getNumber(country, service)](#SMSPVAClient+getNumber)
    * [.getBalance(service)](#SMSPVAClient+getBalance) ⇒ <code>number</code>
    * [.getSMS(id, country, service, [retries])](#SMSPVAClient+getSMS)
    * [.ban(id, country, service)](#SMSPVAClient+ban)
    * [.getCountNew(service, country)](#SMSPVAClient+getCountNew)
    * [.get2FA(secret)](#SMSPVAClient+get2FA) ⇒ <code>string</code>

<a name="new_SMSPVAClient_new"></a>

### new SMSPVAClient([opts])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opts] | <code>object</code> |  | Config options |
| [opts.key] | <code>string</code> | <code>&quot;process.env.SMSPVA_KEY&quot;</code> | API key for smspva |

<a name="SMSPVAClient+getNumber"></a>

### smspvaClient.getNumber(country, service)
Acquires a virtual number based on provided specifications to be used for SMS verification.

**Kind**: instance method of [<code>SMSPVAClient</code>](#SMSPVAClient)

| Param | Type | Description |
| --- | --- | --- |
| country | <code>string</code> | Country code identifier from which the number will originate |
| service | <code>string</code> | Specified service the number will be used with |

<a name="SMSPVAClient+getBalance"></a>

### smspvaClient.getBalance(service) ⇒ <code>number</code>
Returns User's balance

**Kind**: instance method of [<code>SMSPVAClient</code>](#SMSPVAClient)
**Returns**: <code>number</code> - User's balance

| Param | Type | Description |
| --- | --- | --- |
| service | <code>string</code> | Particular service to check balance for |

<a name="SMSPVAClient+getSMS"></a>

### smspvaClient.getSMS(id, country, service, [retries])
Polls smspva API for response containing SMS verification code, returns this code.

**Kind**: instance method of [<code>SMSPVAClient</code>](#SMSPVAClient)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Unique identifier for the number issued by smspva |
| country | <code>string</code> | <code>&quot;US&quot;</code> | Country identifier |
| service | <code>string</code> | <code>&quot;google&quot;</code> | Service the number issued from smspva is being used for |
| [retries] | <code>number</code> | <code>20</code> | Retry count (Optional) |

<a name="SMSPVAClient+ban"></a>

### smspvaClient.ban(id, country, service)
Bans a particular number, given its unique identifier

**Kind**: instance method of [<code>SMSPVAClient</code>](#SMSPVAClient)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique identifier for the number |
| country | <code>string</code> | Origin country for the number |
| service | <code>string</code> | Service number is being used for |

<a name="SMSPVAClient+getCountNew"></a>

### smspvaClient.getCountNew(service, country)
Retrieves the amount of free activations for a certain service

**Kind**: instance method of [<code>SMSPVAClient</code>](#SMSPVAClient)

| Param | Type | Description |
| --- | --- | --- |
| service | <code>string</code> | Service specified |
| country | <code>string</code> | Country |

<a name="SMSPVAClient+get2FA"></a>

### smspvaClient.get2FA(secret) ⇒ <code>string</code>
Retrieves the 2FA code associated with the given OAUTH secret token [Useful for bypassing 2FA]

**Kind**: instance method of [<code>SMSPVAClient</code>](#SMSPVAClient)
**Returns**: <code>string</code> - 2FA authorizatio code

| Param | Type | Description |
| --- | --- | --- |
| secret | <code>string</code> | Secret for 2FA account |

