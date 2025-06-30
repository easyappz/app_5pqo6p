import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operation, setOperation] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [error, setError] = useState('');
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleNumberClick = (value) => {
    if (error) {
      setError('');
      setDisplay('0');
      setCurrentValue('');
      setPreviousValue('');
      setOperation('');
      setWaitingForSecondOperand(false);
    }

    // Prevent multiple leading zeros
    if (currentValue === '0' && value === '0') {
      return;
    }

    // Prevent duplicate decimal points
    if (value === '.' && currentValue.includes('.')) {
      return;
    }

    // Replace initial zero unless the value is a decimal point
    if (currentValue === '0' && value !== '.') {
      setCurrentValue(value);
      if (waitingForSecondOperand && previousValue && operation) {
        setDisplay(previousValue + ' ' + operation + ' ' + value);
      } else {
        setDisplay(value);
      }
    } else {
      if (waitingForSecondOperand && previousValue && operation) {
        setDisplay(previousValue + ' ' + operation + ' ' + currentValue + value);
        setCurrentValue(currentValue + value);
        setWaitingForSecondOperand(false);
      } else {
        setDisplay(currentValue + value);
        setCurrentValue(currentValue + value);
      }
    }
  };

  const handleOperationClick = (op) => {
    if (error) {
      setError('');
      setDisplay('0');
      setCurrentValue('');
      setPreviousValue('');
      setOperation('');
      setWaitingForSecondOperand(false);
    }

    // If no current value, update operation if previous value exists
    if (!currentValue) {
      if (previousValue) {
        setOperation(op);
        setDisplay(previousValue + ' ' + op + ' ');
        setWaitingForSecondOperand(true);
      }
      return;
    }

    // Calculate intermediate result if both values and operation exist
    if (previousValue && operation && currentValue) {
      calculateResult(op);
    } else {
      setPreviousValue(currentValue);
      setCurrentValue('');
      setOperation(op);
      setDisplay(currentValue + ' ' + op + ' ');
      setWaitingForSecondOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperation('');
    setPreviousValue('');
    setError('');
    setWaitingForSecondOperand(false);
  };

  const calculateResult = (nextOperation = '') => {
    if (!previousValue || !currentValue || !operation) {
      if (previousValue && !currentValue && nextOperation) {
        setOperation(nextOperation);
        setDisplay(previousValue + ' ' + nextOperation + ' ');
        setWaitingForSecondOperand(true);
      }
      return;
    }

    let result = 0;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);

    if (operation === '+') {
      result = prev + curr;
    } else if (operation === '-') {
      result = prev - curr;
    } else if (operation === '*') {
      result = prev * curr;
    } else if (operation === '/') {
      if (curr === 0) {
        setError('Cannot divide by zero');
        setDisplay('Error');
        setCurrentValue('');
        setPreviousValue('');
        setOperation('');
        setWaitingForSecondOperand(false);
        return;
      }
      result = prev / curr;
    }

    // Handle result display with proper formatting (avoid scientific notation for large numbers)
    setDisplay(result.toString());
    setCurrentValue('');
    setPreviousValue(result.toString());
    setOperation(nextOperation);
    setWaitingForSecondOperand(!!nextOperation);
    if (nextOperation) {
      setDisplay(result.toString() + ' ' + nextOperation + ' ');
    }
  };

  return (
    <Box className="calculator-container">
      <Paper elevation={3} className="calculator-paper">
        <TextField
          variant="outlined"
          value={display}
          disabled
          fullWidth
          className="calculator-display"
          InputProps={{
            style: { textAlign: 'right', fontSize: '1.5rem', fontWeight: '500' }
          }}
        />
        {error && (
          <Typography color="error" variant="caption" className="calculator-error">
            {error}
          </Typography>
        )}
        <Grid container spacing={1.5} className="calculator-buttons">
          {['7', '8', '9', '/'].map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant="contained"
                color={btn === '/' ? 'secondary' : 'default'}
                fullWidth
                disableElevation
                className={`calculator-button ${btn === '/' ? 'operation' : ''}`}
                onClick={() =>
                  btn === '/' ? handleOperationClick(btn) : handleNumberClick(btn)
                }
              >
                {btn}
              </Button>
            </Grid>
          ))}
          {['4', '5', '6', '*'].map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant="contained"
                color={btn === '*' ? 'secondary' : 'default'}
                fullWidth
                disableElevation
                className={`calculator-button ${btn === '*' ? 'operation' : ''}`}
                onClick={() =>
                  btn === '*' ? handleOperationClick(btn) : handleNumberClick(btn)
                }
              >
                {btn}
              </Button>
            </Grid>
          ))}
          {['1', '2', '3', '-'].map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant="contained"
                color={btn === '-' ? 'secondary' : 'default'}
                fullWidth
                disableElevation
                className={`calculator-button ${btn === '-' ? 'operation' : ''}`}
                onClick={() =>
                  btn === '-' ? handleOperationClick(btn) : handleNumberClick(btn)
                }
              >
                {btn}
              </Button>
            </Grid>
          ))}
          {['0', '.', '=', '+'].map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant="contained"
                color={btn === '+' ? 'secondary' : btn === '=' ? 'primary' : 'default'}
                fullWidth
                disableElevation
                className={`calculator-button ${btn === '+' ? 'operation' : btn === '=' ? 'equal' : ''}`}
                onClick={() => {
                  if (btn === '=') calculateResult();
                  else if (btn === '+') handleOperationClick(btn);
                  else handleNumberClick(btn);
                }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              className="calculator-clear"
              onClick={handleClear}
            >
              C
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Calculator;
