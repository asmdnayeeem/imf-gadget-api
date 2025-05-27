import express from 'express';
import cors from 'cors';
import gadgetRoutes from './routes/gadgetRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import authRoutes from './routes/authRoutes'

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.use('/gadgets', gadgetRoutes);
app.use('/auth',authRoutes)
export default app;
