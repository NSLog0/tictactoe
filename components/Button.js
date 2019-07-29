const Button = props => {
  const { onClick, value } = props;

  return (
    <button
      className="Button Button-square"
      onClick={onClick}
    >
      {value}
    </button>
  );
};
