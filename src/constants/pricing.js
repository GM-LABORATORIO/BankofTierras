// Pricing constants and utilities for Bank of Tierras
// All prices are dynamic and update based on real-time market data

export const PRICING_CONFIG = {
    // Carbon Credits (Fixed)
    CARBON_PRICE_USD: 25,           // $25 per tCO2 (voluntary market standard)

    // EcoToken (Fixed in smart contract)
    ECOTOKEN_PRICE_AVAX: 0.001,     // 0.001 AVAX per EcoToken (from Treasury)

    // Platform Fees
    PLATFORM_FEE_PERCENT: 10,       // 10% platform fee
    PROTOCOL_FEE_PERCENT: 3,        // 3% protocol fee (Treasury)

    // Testing Mode (mutable)
    TESTING_MODE: true,             // Set to false for production pricing
    TESTING_RATE: 1                 // 1:1 for testing
};

/**
 * Toggle testing mode (for admin use)
 * @param {boolean} enabled - Enable or disable testing mode
 */
export const setTestingMode = (enabled) => {
    PRICING_CONFIG.TESTING_MODE = enabled;
    console.log(`🔧 Pricing Mode: ${enabled ? 'TESTING (1:1)' : 'PRODUCTION (Dynamic)'}`);
};

/**
 * Get current testing mode status
 * @returns {boolean} Current testing mode status
 */
export const isTestingMode = () => PRICING_CONFIG.TESTING_MODE;

/**
 * Calculate dynamic exchange rates based on current AVAX price
 * @param {number} avaxPriceUSD - Current AVAX price in USD
 * @returns {object} Exchange rates and prices
 */
export const calculatePricing = (avaxPriceUSD) => {
    // EcoToken price in USD (dynamic based on AVAX price)
    const ecoTokenPriceUSD = PRICING_CONFIG.ECOTOKEN_PRICE_AVAX * avaxPriceUSD;

    // Exchange rates
    const carbonToEcoToken = PRICING_CONFIG.CARBON_PRICE_USD / ecoTokenPriceUSD;
    const ecoTokenToCarbon = ecoTokenPriceUSD / PRICING_CONFIG.CARBON_PRICE_USD;

    // Carbon price in AVAX
    const carbonPriceAVAX = PRICING_CONFIG.CARBON_PRICE_USD / avaxPriceUSD;

    return {
        // Prices
        avaxPriceUSD,
        ecoTokenPriceUSD,
        carbonPriceUSD: PRICING_CONFIG.CARBON_PRICE_USD,
        carbonPriceAVAX,

        // Exchange Rates
        carbonToEcoToken: Math.round(carbonToEcoToken), // 1 tCO2 = X EcoToken
        ecoTokenToCarbon,                                // 1 EcoToken = X tCO2

        // For Display
        formattedRates: {
            carbonToEcoToken: Math.round(carbonToEcoToken).toLocaleString(),
            ecoTokenToCarbon: ecoTokenToCarbon.toFixed(6),
            carbonPriceAVAX: carbonPriceAVAX.toFixed(4)
        }
    };
};

/**
 * Get exchange rate for testing or production
 * @param {number} avaxPriceUSD - Current AVAX price in USD
 * @returns {number} Exchange rate (1 tCO2 = X EcoToken)
 */
export const getExchangeRate = (avaxPriceUSD) => {
    if (PRICING_CONFIG.TESTING_MODE) {
        return PRICING_CONFIG.TESTING_RATE;
    }

    const pricing = calculatePricing(avaxPriceUSD);
    return pricing.carbonToEcoToken;
};

/**
 * Calculate required EcoToken for Carbon purchase
 * @param {number} carbonAmount - Amount of tCO2 to purchase
 * @param {number} avaxPriceUSD - Current AVAX price in USD
 * @returns {number} Required EcoToken amount
 */
export const calculateRequiredEcoToken = (carbonAmount, avaxPriceUSD) => {
    const rate = getExchangeRate(avaxPriceUSD);
    return carbonAmount * rate;
};

/**
 * Calculate Carbon amount from EcoToken
 * @param {number} ecoTokenAmount - Amount of EcoToken
 * @param {number} avaxPriceUSD - Current AVAX price in USD
 * @returns {number} Carbon amount in tCO2
 */
export const calculateCarbonFromEcoToken = (ecoTokenAmount, avaxPriceUSD) => {
    const pricing = calculatePricing(avaxPriceUSD);
    return ecoTokenAmount * pricing.ecoTokenToCarbon;
};

/**
 * Example usage with current AVAX price
 */
export const exampleCalculations = () => {
    const avaxPrice = 11.69; // Current price from CoinMarketCap
    const pricing = calculatePricing(avaxPrice);

    console.log('=== PRICING CALCULATIONS ===');
    console.log(`AVAX Price: $${avaxPrice}`);
    console.log(`EcoToken Price: $${pricing.ecoTokenPriceUSD.toFixed(4)}`);
    console.log(`Carbon Price: $${pricing.carbonPriceUSD}`);
    console.log('');
    console.log('=== EXCHANGE RATES ===');
    console.log(`1 tCO2 = ${pricing.formattedRates.carbonToEcoToken} EcoToken`);
    console.log(`1 EcoToken = ${pricing.formattedRates.ecoTokenToCarbon} tCO2`);
    console.log(`1 tCO2 = ${pricing.formattedRates.carbonPriceAVAX} AVAX`);
    console.log('');
    console.log('=== EXAMPLES ===');
    console.log(`To buy 10 tCO2: ${calculateRequiredEcoToken(10, avaxPrice).toLocaleString()} EcoToken`);
    console.log(`With 1000 EcoToken: ${calculateCarbonFromEcoToken(1000, avaxPrice).toFixed(2)} tCO2`);
};

export default {
    PRICING_CONFIG,
    calculatePricing,
    getExchangeRate,
    calculateRequiredEcoToken,
    calculateCarbonFromEcoToken,
    exampleCalculations
};
