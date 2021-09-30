export default {
  palette: {
    type: 'light',
    primary: {
      main: '#303f9f',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
  typography: {
    useNextVariants: true,
  },
  stylesObject: {
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: '20px',
    },
    form: {
      textAlign: 'center',
    },
    pageTitle: {
      margin: '5% auto',
    },
    textField: {
      margin: '10px auto',
    },
    button: {
      marginTop: 20,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progress: {
      position: 'absolute',
    },
  },
};
