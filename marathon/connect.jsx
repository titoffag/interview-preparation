export const StoreConnectHOC = (WrappedComponent, selectData) => {
  return class extends React.Component {
    static getDerivedStateFromProps(props) {
      return { data: selectData(props.store.getState()) };
    }

    componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(this.handleChange);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    handleChange = () => {
      const nextData = selectData(this.props.store.getState());

      if (!Object.is(this.state.data, nextData)) {
        this.forceUpdate();
      }
    };

    render() {
      const { store, ...props } = this.props;

      return (
        <WrappedComponent
          data={this.state.data}
          dispatch={store.dispatch}
          {...props}
        />
      );
    }
  };
};

export const StoreContextConsumerHOC = (InnerComponent) => (props) => {
  return (
    <StoreContext.Consumer>
      {(store) => <InnerComponent store={store} {...props} />}
    </StoreContext.Consumer>
  );
};
