import Calculator from './components/Calculator';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <Calculator />
        </header>
      </div>
    </ErrorBoundary>
  );
}

export default App;
