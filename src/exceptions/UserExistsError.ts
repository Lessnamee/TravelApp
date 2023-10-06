export class UserExistsError extends Error {
    constructor(message = "UserExists") {
        super(message);
        this.name = 'UserExists';
    }
}