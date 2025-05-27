import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateCodename, generateConfirmationCode } from '../utils/helper';

const prisma = new PrismaClient();

export const getAllGadgets = async (req: Request, res: Response) => {
  const { status } = req.query;
  const gadgets = await prisma.gadget.findMany({
    where: status ? { status: status as any } : undefined,
  });

  const result = gadgets.map(gadget => ({
    ...gadget,
    missionSuccessProbability: `${Math.floor(Math.random() * 51) + 50}%`,
  }));

  res.json(result);
};

export const createGadget = async (req: Request, res: Response) => {
  const codename = generateCodename();

  const gadget = await prisma.gadget.create({
    data: {
      name: codename,
      status: 'Available',
    },
  });

  res.status(201).json(gadget);
};

export const updateGadget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const updated = await prisma.gadget.update({
    where: { id },
    data,
  });

  res.json(updated);
};

export const decommissionGadget = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updated = await prisma.gadget.update({
    where: { id },
    data: {
      status: 'Decommissioned',
      decommissionedAt: new Date(),
    },
  });

  res.json({ message: 'Gadget decommissioned.', gadget: updated });
};

export const selfDestruct = async (req: Request, res: Response) => {
  const code = generateConfirmationCode();
  res.json({ message: 'Self-destruct sequence initiated.', confirmationCode: code });
};
