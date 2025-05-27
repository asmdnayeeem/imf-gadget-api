const codenames = ['The Nightingale', 'The Kraken', 'Phantom', 'Viper', 'Shadow'];

export const generateCodename = () =>
  codenames[Math.floor(Math.random() * codenames.length)];

export const generateConfirmationCode = () =>
  Math.floor(100000 + Math.random() * 900000);
