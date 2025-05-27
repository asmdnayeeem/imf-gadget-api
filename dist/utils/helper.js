"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConfirmationCode = exports.generateCodename = void 0;
const codenames = ['The Nightingale', 'The Kraken', 'Phantom', 'Viper', 'Shadow'];
const generateCodename = () => codenames[Math.floor(Math.random() * codenames.length)];
exports.generateCodename = generateCodename;
const generateConfirmationCode = () => Math.floor(100000 + Math.random() * 900000);
exports.generateConfirmationCode = generateConfirmationCode;
