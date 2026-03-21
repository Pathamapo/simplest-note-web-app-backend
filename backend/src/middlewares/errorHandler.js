module.exports = function middlewareHandler(controllerMethod) {
  return async function handler(req, res, next) {
    try {
      await controllerMethod(req, res, next);
    } catch (error) {
      console.error("Error in controller:", error); 
      next(error); 
    }
  };
};