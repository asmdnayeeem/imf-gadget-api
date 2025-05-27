import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateCodename, generateConfirmationCode } from '../utils/helper';

const prisma = new PrismaClient();

export const getAllGadgets = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const gadgets = await prisma.gadget.findMany({
      where: status ? { status: status as any } : undefined,
    });

    const result = gadgets.map(gadget => ({
      ...gadget,
      missionSuccessProbability: `${Math.floor(Math.random() * 51) + 50}%`,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gadgets.', error });
  }
};

export const createGadget = async (req: Request, res: Response) => {
  try {
    const codename = generateCodename();

    const gadget = await prisma.gadget.create({
      data: {
        name: codename,
        status: 'Available',
      },
    });

    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create gadget.', error });
  }
};

export const updateGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.gadget.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update gadget.', error });
  }
};

export const decommissionGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await prisma.gadget.update({
      where: { id },
      data: {
        status: 'Decommissioned',
        decommissionedAt: new Date(),
      },
    });

    res.json({ message: 'Gadget decommissioned.', gadget: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to decommission gadget.', error });
  }
};

export const selfDestruct = async (req: Request, res: Response) => {
  try {
    const code = generateConfirmationCode();
    res.json({ message: 'Self-destruct sequence initiated.', confirmationCode: code });
  } catch (error) {
    res.status(500).json({ message: 'Failed to trigger self-destruct.', error });
  }
};

export const getByStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { status } = req.query;

    if (!status || typeof status !== 'string') {
      return res.status(400).json({ message: 'Status query parameter is required.' });
    }

    const gadgets = await prisma.gadget.findMany({
      where: { status: status as any },
      orderBy: { createdAt: 'desc' },
    });

    if (!gadgets.length) {
      return res.status(404).json({ message: 'No gadgets found with the given status.' });
    }

    return res.json(gadgets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to filter gadgets by status.', error });
  }
};
