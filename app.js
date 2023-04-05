import IntroScreen from './IntroScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={IntroScreen} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/locations" component={Locations} />
        <Route exact path="/rewards" component={Rewards} />
      </Switch>
    </Router>
  );
}

export default App;