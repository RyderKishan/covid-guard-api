exports.bind = (router) => {
  router.get('/kishan', (req, res) => {
    res.status(200).json({
      message: 'kishan UP!',
      timeStamp: new Date(),
    });
  });
  router.get('/nemo', (req, res) => {
    res.status(200).json({
      message: 'nemo UP!',
      timeStamp: new Date(),
    });
  });
};
