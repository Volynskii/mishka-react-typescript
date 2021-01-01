export default function validateInfo(values) {
    let errors = {};
    var illegalChars = /\W/; // allow letters, numbers, and underscores
    //Name
    if (!values.userName.trim()) {
        errors.userName = "Username required"
    }  else if (values.userName.typeof=== 'number') {
        errors.userName = "цифры не катят"
    } else if ((values.userName.length < 5) || (values.userName.length > 15)) {
        errors.userName = "&bull; Username must have 5-15 characters";
    } else if (illegalChars.test(values.userName)) {
        errors.userName = "&bull; Please enter valid Username. Use only numbers and alphabets";
    }
    //Email
    if (!values.email) {
        errors.email = "Email required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    //Comment
    if(!values.comment) {
        errors.comment = "Comment is required"
    } else if (values.comment.trim().length < 6) {
        errors.comment = 'Commend need to be 6 characters of more'
    } else if (values.comment.typeOf === 'number') {
        console.log('COMMENT TYPE', typeof values.comment)
          errors.comment = 'Comment is supposed to have not only numbers'
    }

    return errors;
}
