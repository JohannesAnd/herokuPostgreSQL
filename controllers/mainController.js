module.exports = ({}) => {
  const getIndex = (req, res) => {
    res.status(200).send('Foo');
  };

  return {
    getIndex
  };
};
