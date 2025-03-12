class ExpressError extends Error {
   constructor(status, message) {
      super(message);
      this.status = status;
   }
}

const errorMiddleware = (err, req, res, next) => {
   const statusCode = err.status || 500;
   res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
   });
};

function asyncWrap(fn) {
   return function (req, res, next) {
      fn(req, res, next).catch(next);
   };
}

module.exports = {
   ExpressError,
   errorMiddleware,
   asyncWrap
};
