//controller mai hamesha try catch bar bar likhna padta tha that's why hamne isse middleware ki tarh use kiya
//for centrailised error handling
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

module.exports = asyncHandler;