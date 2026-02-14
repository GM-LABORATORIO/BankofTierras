/**
 * CPX Green Business & Loyalty Service
 * Manages incentives for merchants and cross-benefits with users.
 */

export const merchantService = {
    /**
     * Calculates the benefit for a user paying at a specific merchant.
     */
    async getUserBenefitsAtMerchant(merchantId, userScore) {
        // Mock logic: higher score = better discounts
        let discount = 0;
        if (userScore > 5000) discount = 15; // Apex Guardian
        else if (userScore > 2000) discount = 10; // Veteran
        else if (userScore > 500) discount = 5; // Guardian

        return {
            hasBenefit: discount > 0,
            discountPercent: discount,
            perkDescription: discount > 0 ? `${discount}% OFF en productos seleccionados` : "Sigue compensando para desbloquear beneficios"
        };
    },

    /**
     * Rewards the merchant for a successful climate transaction.
     */
    async rewardMerchant(merchantId, gramsCompensated) {
        console.log(`CPX: Rewarding merchant ${merchantId} for ${gramsCompensated}g transaction...`);
        // Merchants earn CPX Score too!
        const merchantPoints = Math.ceil(gramsCompensated * 0.1);
        return {
            pointsEarned: merchantPoints,
            newMerchantRank: "Green Node Silver"
        };
    },

    /**
     * Returns a list of certified Green Businesses for the UI.
     */
    async getCertifiedBusinesses() {
        return [
            { id: 'stb_01', name: 'Starbucks Amazonas', type: 'Cafe', impact_score: 8500, perk: '10% OFF a Guardianes' },
            { id: 'hlt_02', name: 'EcoHotel Pacific', type: 'Hotel', impact_score: 12000, perk: 'Late Checkout gratis' },
            { id: 'mcd_03', name: 'McGreen Terminal', type: 'Restaurant', impact_score: 5000, perk: 'Postre de cortesía' }
        ];
    }
};
