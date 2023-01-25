// MiddleWare -> Once a user is signed In then he/she can do various different
// functions like liking a post, etc. this is where middleWare comes in.
// Working of MiddleWare.
// Ex -> if user wants to like a post (one like per user) ->
// 1) user clicks on like button.
// 2) request goes to middleware and if middleware calls 'next()' function
// only then a user can like, else request is invalid.
import jwt from 'jsonwebtoken';


// next is used to define that do something after this.
const auth = async (req,res,next) => 
{
    // User gets a token only if he is signed in.
    // Token can be of two types -> 1) created by google.
    // 2) created by user during signin (cotroller > user.js).
    try {
        const token = req.headers.authorization.split(" ")[1];
        // If token length > 500 -> then its google token.
        const isCustomAuth = token.length < 500;

        let decodedData;

        // test -> secret key used to decrypt.(same key used for encryption).
        // id and sub are unique key(like primary key) to differentiate unique persons.
        // If it is custom token.
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'test');
            req.userId = decodedData?.id;
        }
        // If it is google token.
        else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        // After above thing is correct -> then we can call next.
        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;