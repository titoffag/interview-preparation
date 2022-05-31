// Slomux — упрощённая, сломанная реализация Flux.
// Перед вами небольшое приложение, написанное на React + Slomux.
// Это нерабочий секундомер с настройкой интервала обновления.

// Исправьте ошибки и потенциально проблемный код, почините приложение и прокомментируйте своё решение.

// При нажатии на "старт" должен запускаться секундомер и через заданный интервал времени увеличивать свое значение на значение интервала
// При нажатии на "стоп" секундомер должен останавливаться и сбрасывать свое значение

const createStore = (reducer, initialState = {}) => {
  let currentState = initialState
  const listeners = []

  const getState = () => currentState
  const dispatch = action => {
    currentState = reducer(currentState, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = listener => listeners.push(listener)

  return { getState, dispatch, subscribe }
}

const connect = (mapStateToProps = () => { }, mapDispatchToProps = () => { }) =>
  Component => {
    class WrappedComponent extends React.Component {
      render() {
        return (
          <Component
            {...this.props}
            {...mapStateToProps(this.context.store.getState(), this.props)}
            {...mapDispatchToProps(this.context.store.dispatch, this.props)}
          />
        )
      }

      componentDidMount() {
        this.context.store.subscribe(this.handleChange)
      }

      handleChange = () => {
        this.forceUpdate()
      }
    }

    WrappedComponent.contextTypes = {
      store: PropTypes.object,
    }

    return WrappedComponent
  }

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store,
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

Provider.childContextTypes = {
  store: PropTypes.object,
}

// APP

// actions
const CHANGE_INTERVAL = 'CHANGE_INTERVAL'

// action creators
const changeInterval = value => ({
  type: CHANGE_INTERVAL,
  payload: value,
})


// reducers
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INTERVAL:
      return { ...state, interval: state.interval + action.payload }
    default:
      return state;
  }
}

// components

class IntervalComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return {
      isNegativeInterval: props.currentInterval <= 1
    };
  }

  incrementInterval = () => {
    this.props.changeInterval(1)
  }

  decrementInterval = () => {
    this.props.changeInterval(-1)
  }

  render() {
    return (
      <div>
        <span>Интервал обновления секундомера: {this.props.currentInterval} сек.</span>
        <span>
          <button disabled={this.state.isNegativeInterval} onClick={this.decrementInterval}>-</button>
          <button onClick={this.incrementInterval}>+</button>
        </span>
      </div>
    )
  }
}

const Interval = connect(state => ({
  currentInterval: state.interval,
}), dispatch => ({
  changeInterval: value => dispatch(changeInterval(value)),
}))(IntervalComponent)

class TimerComponent extends React.Component {
  state = {
    currentTime: 0,
    enabled: false
  }

  render() {
    return (
      <div>
        <Interval />
        <div>
          Секундомер: {this.state.currentTime} сек.
        </div>
        <div>
          <button disabled={this.state.enabled} onClick={this.handleStart}>Старт</button>
          <button onClick={this.handleStop}>Стоп</button>
        </div>
      </div>
    )
  }

  handleStart = () => {
    this.setState({ enabled: true })
    this.timerId = setInterval(() => this.setState((state, props) => ({
      currentTime: state.currentTime + props.currentInterval
    })), this.props.currentInterval * 1000)
  }

  handleStop = () => {
    this.setState({ currentTime: 0, enabled: false })
    clearInterval(this.timerId)
  }
}

const Timer = connect(state => ({
  currentInterval: state.interval,
}))(TimerComponent)

// init
ReactDOM.render(
  <Provider store={createStore(reducer, { interval: 1 })}>
    <Timer />
  </Provider>,
  document.getElementById('app')
)
