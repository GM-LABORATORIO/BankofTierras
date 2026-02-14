/**
 * CPX CO2Pay Webhook Service
 * Handles incoming signals from POS terminals and Visa/Mastercard networks.
 */

import { supabaseService } from './supabaseService';
import { liquidationService } from './liquidationService';

export const co2PayWebhookService = {
    /**
     * Entry point for incoming payment notifications.
     * @param {Object} paymentData { cardId, amountUsd, merchantName, userEmail? }
     */
    async handleIncomingPayment(paymentData) {
        console.log(`CO2Pay: Webhook received from ${paymentData.merchantName}...`);

        // 1. Identification / Silent Onboarding
        let userProfile = await this.getOrCreateUserByCard(paymentData.cardId, paymentData.userEmail);

        // 2. Volume Calculation (Simulating 500g per transaction fixed or based on amount)
        const gramsToCompensate = 500;

        // 3. Instant Execution (Auto-Retire)
        console.log(`CPX: Auto-retiring ${gramsToCompensate}g for user ${userProfile.wallet_address}...`);

        const impactResult = await liquidationService.recordCompensation(
            'DEFAULT_PROJECT_ID',
            gramsToCompensate,
            userProfile.wallet_address
        );

        // 4. Notification Dispatch (Mock)
        this.sendImpactNotification(userProfile, gramsToCompensate, paymentData.merchantName);

        return {
            status: 'SUCCESS',
            impactId: impactResult.impactId,
            userCreated: userProfile.isNew
        };
    },

    async getOrCreateUserByCard(cardId, email) {
        // Logic to check Supabase and create profile if missing
        // This simulates the "Silent Onboarding"
        return {
            wallet_address: '0x' + Math.random().toString(16).substring(2, 42),
            isNew: true,
            email: email || 'new_guardian@cpx.eco'
        };
    },

    sendImpactNotification(user, grams, merchant) {
        console.log(`CPX ALERT: [SMS/Push] ¡Impacto Real! Tu pago en ${merchant} acaba de salvar ${grams}g de CO2. Tu CPX Score subió.`);
    }
};
