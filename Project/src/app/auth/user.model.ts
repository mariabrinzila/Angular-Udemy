export class User {
    constructor(public id: string, public email: string, private _token: string,
                private _tokenExpirationDate: Date) {}


    get token() {
        // Getter (it'll be accessed like user.token)
        // Check is the token's expiration date exists and is greater than the current timestamp
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) 
            // Invalid token so return null
            return null;

        return this._token;
    }
}