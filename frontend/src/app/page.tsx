import React from 'react';
import ButtonLanding from './components/common/ButtonLanding';
import FeatureCard from './components/common/FeatureCard';
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Trade Smarter with AI-Powered Crypto
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Leverage reinforcement learning to maximize your trading potential in the crypto market
          </p>
          <ButtonLanding text="Get Started Now →"/>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <FeatureCard 
            title="Profitable Strategies"
            description='Our AI analyzes market patterns 24/7 to execute optimal trades with proven success rates.'
            icon={<svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>}
            />

          {/* Feature 2 */}
          <FeatureCard 
            title="Risk Management"
            description='Advanced algorithms protect your investments with dynamic position sizing and stop-loss optimization.'
            icon={<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
            />

          {/* Feature 3 */}
          <FeatureCard 
            title="AI Trading Agent"
            description='Automated trading with RL agents that continuously learn and adapt to market conditions.'
            icon={<svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
            />

        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400">$2.5M+</div>
            <div className="text-gray-400 mt-2">Trading Volume</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400">89%</div>
            <div className="text-gray-400 mt-2">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400">24/7</div>
            <div className="text-gray-400 mt-2">Market Analysis</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-400">5000+</div>
            <div className="text-gray-400 mt-2">Active Traders</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders using AI to gain a competitive edge in the crypto market
          </p>
          <ButtonLanding text="Start Trading Now →"/>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-gray-400 border-t border-gray-800">
        <p>© 2024 AI Crypto Trading. All rights reserved.</p>
      </footer>
    </div>
  );
}