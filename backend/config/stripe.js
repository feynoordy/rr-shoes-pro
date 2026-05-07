require('dotenv').config();

let stripe;

try {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
} catch (error) {
  // Stripe não configurado - usar mock
  console.warn('⚠️ Stripe não configurado. Usando modo simulação.');
  stripe = {
    checkout: {
      sessions: {
        create: async () => ({
          id: 'cs_test_' + Date.now(),
          url: (process.env.FRONTEND_URL || 'http://localhost:8000') + '/obrigado.html?session_id=mock'
        })
      }
    }
  };
}

module.exports = stripe;
