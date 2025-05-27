"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByStatus = exports.selfDestruct = exports.decommissionGadget = exports.updateGadget = exports.createGadget = exports.getAllGadgets = void 0;
const client_1 = require("@prisma/client");
const helper_1 = require("../utils/helper");
const prisma = new client_1.PrismaClient();
const getAllGadgets = async (req, res) => {
    try {
        const { status } = req.query;
        const gadgets = await prisma.gadget.findMany({
            where: status ? { status: status } : undefined,
        });
        const result = gadgets.map(gadget => ({
            ...gadget,
            missionSuccessProbability: `${Math.floor(Math.random() * 51) + 50}%`,
        }));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch gadgets.', error });
    }
};
exports.getAllGadgets = getAllGadgets;
const createGadget = async (req, res) => {
    try {
        const codename = (0, helper_1.generateCodename)();
        const gadget = await prisma.gadget.create({
            data: {
                name: codename,
                status: 'Available',
            },
        });
        res.status(201).json(gadget);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create gadget.', error });
    }
};
exports.createGadget = createGadget;
const updateGadget = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await prisma.gadget.update({
            where: { id },
            data,
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update gadget.', error });
    }
};
exports.updateGadget = updateGadget;
const decommissionGadget = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to decommission gadget.', error });
    }
};
exports.decommissionGadget = decommissionGadget;
const selfDestruct = async (req, res) => {
    try {
        const code = (0, helper_1.generateConfirmationCode)();
        res.json({ message: 'Self-destruct sequence initiated.', confirmationCode: code });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to trigger self-destruct.', error });
    }
};
exports.selfDestruct = selfDestruct;
const getByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        if (!status || typeof status !== 'string') {
            return res.status(400).json({ message: 'Status query parameter is required.' });
        }
        const gadgets = await prisma.gadget.findMany({
            where: { status: status },
            orderBy: { createdAt: 'desc' },
        });
        if (!gadgets.length) {
            return res.status(404).json({ message: 'No gadgets found with the given status.' });
        }
        return res.json(gadgets);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to filter gadgets by status.', error });
    }
};
exports.getByStatus = getByStatus;
