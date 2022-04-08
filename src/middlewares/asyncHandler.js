const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        error.message ||
        'Internal server error, Please try again letter',
    });
  }
};
export default asyncHandler;
