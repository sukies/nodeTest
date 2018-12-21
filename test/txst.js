export default class App extends React.Component {
  state = {
    expand: flase,
    renList: []
  };
  handleCheck = value => {
    const { expand, renList } = this.state;
    this.setState({ expand: !expand });
    renList.push(value);
  };

  render() {
    return (
      <div>
        {list.map(subItem => (
          <div>
            <div
              className={`${css.sunKind} ${
                this.state.expand === true ? css.active : null
              }`}
              onClick={() => this.handleCheck(subItem)}
            >
              {subItem.name}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
