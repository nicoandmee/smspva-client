const got = require('got');
const projects = require('./lib/projects');

/**
 * @class SMSPVAClient
 * @description Wrapper class for the smspva.com API
 * @param {object} [opts] - Config options
 * @param {string} [opts.key=process.env.SMSPVA_KEY] - API key for smspva
 */
class SMSPVAClient {
    constructor(opts = {}) {
        const { key = process.env.SMSPVA_KEY } = opts;

        this._key = key;

        this._client = got.extend({
            json: true,
            retry: 5,
        });
    }


    /** @typedef {Object} SMSPVANumber
     * @property {String} id Unique identifier for this number, will be used to retrieve the SMS Code sent to it
     * @property {String} number The raw 9-digit string that makes up the virtual number
     * @property {String} response Indicates success or failure acquiring the virtual number
     */

    /**
     * @description Acquires a virtual number based on provided service (see supported services)
     * @returns {SMSPVANumber}
     */
    async getNumber(opts = {}) {
        const { country, service } = opts;
        const provider = projects.serviceToPID[service];
        const { body } = await this._client(`http://smspva.com/priemnik.php?metod=get_number&country=${country}&service=${provider}&apikey=${this._key}`);
        return body;
    }


    /**
     * @description Returns User's balance
     * @param {string} service Particular service to check balance for
     * @returns {number} User's balance
     */
    async getBalance(service) {
        const provider = projects.serviceToPID(service);
        const { body } = await this._client(`http://smspva.com/priemnik.php?metod=getBalance&service=${provider}&apikey=${this._key}`);
        const currentBalance = Number(body.balance);
        return currentBalance;
    }

    /**
     * @description Polls smspva API for response containing SMS verification code, returns this code.
     * @param {string} id Unique identifier for the number issued by smspva
     * @param {string} country Country identifier
     * @param {string} service Service the number issued from smspva is being used for
     * @param {number} [retries=20] Retry count (Optional)
     * @returns {string} SMS Code
     */
    async getSMS(opts = {}) {
        const { id, country = 'US', service = 'google', retries = 20 } = opts;
        const provider = projects.serviceToPID[service];

        const { body } = await this._client(`http://smspva.com/priemnik.php?metod=get_sms&country=${country}&service=${provider}&id=${id}&apikey=${this._key}`);
        const { response } = body;

        // SMS has not been found yet
        if (response === '2') {
            await wait(20000);
            return await this.getSMS(id, country, service, retries - 1);
        }

        if (response === '1') {
            return body.sms;
        }
    }

    /**
    * @description Bans a particular number, given its unique identifier
    * @param {string} id Unique identifier for the number
    * @param {string} country Origin country for the number
    * @param {string} service Service number is being used for
    * @returns {boolean} Whether number was banned succesfully or not
    */
    async ban(opts = {}) {
        const { id, country = 'US', service } = opts;
        const provider = projects.serviceToPID[service];
        const { body } = await this._client(`http://smspva.com/priemnik.php?metod=denial&country=${country}&service=${provider}&apikey=${this._key}&id=${id}`);
        const { response } = body;

        if (projects.errorCodes.includes(response)) {
            console.error(`Error occured attempting to ban ${id}, Error Code: ${response}`);
        }

        if (response === '1') {
            return true;
        }
    }

    /**
     * @description Retrieves the amount of free activations for a certain service
     * @param {string} service Service specified
     * @param {string} country Country
     * @returns {Number} Number of online nodes that can process sms activations
     */
    async getCountNew(opts = {}) {
        const { service, country } = opts;
        const provider = projects.serviceToPID[service];
        const { body } = await this._client(`http://smspva.com/priemnik.php?metod=get_count_new&country=${country}&service=${provider}&apikey=${this._key}`);
        const { online } = body;
        return Number(online);
    }

    /** @typedef {Object} SMSPVA_2FAResponse
    * @property {String} code2fa The target rotating authenticated code
    * @property {Number} response Indicates success or failure acquiring the 2-factor code
    * @property {String} secret The same secret as provided
    * @property {Number} tonew Number of seconds until a new 2-factor code will be generated
     */

    /**
     * @description Retrieves the 2FA code associated with the given OAUTH secret token [Useful for bypassing 2FA]
     * @param {string} secret Secret for 2FA account
     * @returns {SMSPVA_2FAResponse} 2FA authorization code
     */
    async get2FA(secret) {
        const { body } = await client(`http://smspva.com/priemnik.php?metod=get_2fa&secret=${secret}&apikey=${this._key}`);
        const { response } = body;

        if (response === '1') {
            const { code2fa, secret } = body;
            return { code2fa, secret };
        }
    }
}

module.exports = SMSPVAClient;
