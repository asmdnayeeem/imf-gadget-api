import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 5000;
import { Response } from 'express';
app.get("/",async (_,res:Response)=>{
  res.status(200).json({
    message: "Welcome to the Gadget Store API",
    version: "1.0.0",
    documentation: "/api-docs"
  });
  return
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
