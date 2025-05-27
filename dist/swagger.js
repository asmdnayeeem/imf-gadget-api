"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
exports.swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "IMF Gadget API",
        version: "1.0.0",
        description: "API for managing IMF gadgets",
    },
    paths: {
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string" },
                                    password: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "User registered" },
                },
            },
        },
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login and get JWT token",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string" },
                                    password: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "JWT token returned" },
                },
            },
        },
        "/gadgets": {
            get: {
                tags: ["Gadgets"],
                summary: "Get all gadgets",
                responses: {
                    200: {
                        description: "List of gadgets",
                    },
                },
                security: [{ bearerAuth: [] }],
            },
            post: {
                tags: ["Gadgets"],
                summary: "Create a new gadget",
                responses: {
                    201: {
                        description: "Gadget created",
                    },
                },
                security: [{ bearerAuth: [] }],
            },
        },
        "/gadgets/{id}": {
            patch: {
                tags: ["Gadgets"],
                summary: "Update a gadget",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    status: {
                                        type: "string",
                                        enum: [
                                            "Available",
                                            "Deployed",
                                            "Destroyed",
                                            "Decommissioned",
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Gadget updated" },
                },
                security: [{ bearerAuth: [] }],
            },
            delete: {
                tags: ["Gadgets"],
                summary: "Decommission a gadget (soft delete)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: { description: "Gadget decommissioned" },
                },
                security: [{ bearerAuth: [] }],
            },
        },
        "/gadgets/{id}/self-destruct": {
            post: {
                tags: ["Gadgets"],
                summary: "Trigger gadget self-destruct",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: { description: "Self-destruct triggered" },
                },
                security: [{ bearerAuth: [] }],
            },
        },
        "/gadgets/filter": {
            get: {
                tags: ["Gadgets"],
                summary: "Get gadgets by status",
                parameters: [
                    {
                        name: "status",
                        in: "query",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: { description: "List of gadgets by status" },
                },
                security: [{ bearerAuth: [] }],
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};
