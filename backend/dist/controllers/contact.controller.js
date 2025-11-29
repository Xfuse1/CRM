"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("../services/contact.service");
const apiResponse_1 = require("../utils/apiResponse");
const contactService = new contact_service_1.ContactService();
class ContactController {
    async createContact(req, res) {
        try {
            const { name, phone, email } = req.body;
            const userId = req.user?.id;
            const contact = await contactService.createContact(userId, { name, phone, email });
            return res.status(201).json(apiResponse_1.ApiResponse.success('Contact created successfully', contact));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to create contact', error.message));
        }
    }
    async getContacts(req, res) {
        try {
            const userId = req.user?.id;
            const contacts = await contactService.getContacts(userId);
            return res.json(apiResponse_1.ApiResponse.success('Contacts retrieved successfully', contacts));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to retrieve contacts'));
        }
    }
    async updateContact(req, res) {
        try {
            const { id } = req.params;
            const { name, phone, email } = req.body;
            const userId = req.user?.id;
            const contact = await contactService.updateContact(id, userId, { name, phone, email });
            return res.json(apiResponse_1.ApiResponse.success('Contact updated successfully', contact));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to update contact', error.message));
        }
    }
    async deleteContact(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            await contactService.deleteContact(id, userId);
            return res.json(apiResponse_1.ApiResponse.success('Contact deleted successfully'));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to delete contact', error.message));
        }
    }
}
exports.ContactController = ContactController;
