import React from './Calculator';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <React />
        </header>
      </div>
    </ErrorBoundary>
  );
}

export default App;
