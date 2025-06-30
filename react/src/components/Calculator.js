import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operation, setOperation] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [error, setError] = useState('');

  const handleNumberClick = (value) => {
    if (error) {
      setError('');
    }
    if (display === '0') {
      setDisplay(value);
      setCurrentValue(value);
    } else {
      setDisplay(display + value);
      setCurrentValue(currentValue + value);
    }
  };

  const handleOperationClick = (op) => {
    if (error) {
      setError('');
    }
    if (currentValue) {
      setPreviousValue(currentValue);
      setCurrentValue('');
      setOperation(op);
      setDisplay(display + ' ' + op + ' ');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperation('');
    setPreviousValue('');
    setError('');
  };

  const calculateResult = () => {
    if (!previousValue || !currentValue || !operation) {
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
        return;
      }
      result = prev / curr;
    }

    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setPreviousValue('');
    setOperation('');
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
            style: { textAlign: 'right', fontSize: '1.5rem' }
          }}
        />
        {error && (
          <Typography color="error" variant="caption" className="calculator-error">
            {error}
          </Typography>
        )}
        <Grid container spacing={1} className="calculator-buttons">
          {['7', '8', '9', '/'].map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant="contained"
                color={btn === '/' ? 'secondary' : 'default'}
                fullWidth
                className="calculator-button"
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
                className="calculator-button"
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
                className="calculator-button"
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
                className="calculator-button"
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
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Calculator;
