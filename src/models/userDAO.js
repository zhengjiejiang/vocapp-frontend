import slugify from "slugify"; // Note: npm install slugify
import shortid from "shortid";
import hash from "hash.js"; // https://github.com/indutny/hash.js

const TABLE_NAME = "treePalUser";


class User {
    constructor(email, password, firstName, lastName) {
        const slug = slugify(firstName.toLowerCase())+"-"+slugify(lastName.toLowerCase())+"-"+shortid.generate();
        const passwordHash = hash.sha256().update(password).digest('hex')
        this.slug = slug;
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    checkPassword(passwordPlaintext) {
        const passwordHash = hash.sha256().update(passwordPlaintext).digest('hex')
        return this.passwordHash === passwordHash;
    }
}


export default class UserDAO {
    constructor() {
        const usersJSON = localStorage.getItem(TABLE_NAME)
        const usersArr = JSON.parse(usersJSON);
        if (usersArr === undefined || usersArr === null || usersArr === "") {
            const emptyArr = [];
            const emptyJSON = JSON.stringify(emptyArr);
            localStorage.setItem(TABLE_NAME, emptyJSON);
        }
    }

    /**
      * Private function.
      */
    saveToLocalStorage(usersArr) {
        localStorage.setItem(TABLE_NAME, JSON.stringify(usersArr));
    }

    getList() {
        const usersJSON = localStorage.getItem(TABLE_NAME);
        const usersArr = JSON.parse(usersJSON);
        return usersArr;
    }

    addObject(email, password, firstName, lastName) {
        const user = new User(email, password, firstName, lastName);

        const usersArr = this.getList();
        usersArr.push(user);

        this.saveToLocalStorage(usersArr);
    }

    getObjectByEmail(email) {
        let userObj;
        for (userObj of this.getList()) {
            if (userObj.email === email) {
                return userObj;
            }
        }
        return null;
    }

    authenticate(email, passwordPlaintext) {
        const userObj = this.getObjectByEmail(email);
        if (userObj === null) {
            return null;
        }

        const passwordHash = hash.sha256().update(passwordPlaintext).digest('hex')
        const isValid = userObj.passwordHash === passwordHash;


        if (isValid) {
            return userObj;
        } else {
            return null;
        }
    }
}
