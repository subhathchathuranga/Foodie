const getTheme = (isDarkTheme) => ({
    backgroundColor: isDarkTheme ? '#121212' : '#fff',
    textColor: isDarkTheme ? '#fff' : '#000',
    cardBackgroundColor: isDarkTheme ? '#1e1e1e' : '#f9f9f9',
    borderColor: isDarkTheme ? '#444' : '#ccc',
  });
  
  export default getTheme;
  