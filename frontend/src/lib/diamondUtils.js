// Diamond System Utilities
// 5 Diamonds = ₹1 INR

export const DIAMOND_TO_INR_RATE = 5; // 5 diamonds = 1 rupee

/**
 * Convert diamonds to INR
 * @param {number} diamonds - Number of diamonds
 * @returns {number} - INR value
 */
export const diamondsToINR = (diamonds) => {
  return diamonds / DIAMOND_TO_INR_RATE;
};

/**
 * Convert INR to diamonds
 * @param {number} inr - INR amount
 * @returns {number} - Number of diamonds
 */
export const inrToDiamonds = (inr) => {
  return inr * DIAMOND_TO_INR_RATE;
};

/**
 * Format diamonds with icon
 * @param {number} diamonds - Number of diamonds
 * @param {boolean} showIcon - Show diamond icon
 * @returns {string} - Formatted string
 */
export const formatDiamonds = (diamonds, showIcon = true) => {
  const formatted = Math.floor(diamonds).toLocaleString('en-IN');
  return showIcon ? `${formatted} 💎` : formatted;
};

/**
 * Calculate diamonds earned from purchase (Direct)
 * @param {number} purchaseAmount - Purchase amount in INR
 * @returns {number} - Diamonds earned (15%)
 */
export const calculateDirectPurchaseDiamonds = (purchaseAmount) => {
  return Math.floor(purchaseAmount * 0.15 * DIAMOND_TO_INR_RATE);
};

/**
 * Calculate diamonds earned from referral (Indirect)
 * @param {number} purchaseAmount - Purchase amount in INR
 * @returns {number} - Diamonds earned (10%)
 */
export const calculateIndirectPurchaseDiamonds = (purchaseAmount) => {
  return Math.floor(purchaseAmount * 0.10 * DIAMOND_TO_INR_RATE);
};

/**
 * Format diamonds with INR conversion
 * @param {number} diamonds - Number of diamonds
 * @returns {object} - { diamonds, inr, formatted }
 */
export const formatDiamondsWithINR = (diamonds) => {
  const inr = diamondsToINR(diamonds);
  return {
    diamonds: Math.floor(diamonds),
    inr: inr.toFixed(2),
    formatted: formatDiamonds(diamonds),
    inrFormatted: `₹${inr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  };
};

// Example calculations:
// ₹10,000 purchase (direct): 10000 * 15% * 5 = 7,500 diamonds = ₹1,500 effective
// ₹10,000 purchase (referral): 10000 * 10% * 5 = 5,000 diamonds = ₹1,000 effective
