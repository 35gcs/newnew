import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 py-6">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">MovementRx</div>
          <Link
            href="/assessment"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Assessment
          </Link>
          <Link
            href="/training"
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            My Training Plan
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Personal Physical Therapy
            <span className="text-blue-600"> At Home</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Take control of your movement health. Our comprehensive assessment identifies
            mobility restrictions and provides personalized corrective exercises to
            prevent chronic pain.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Begin Your Assessment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">8 Movement Screens</h3>
            <p className="text-gray-600">
              Comprehensive assessment covering squats, hip hinges, balance, mobility, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analysis</h3>
            <p className="text-gray-600">
              AI-powered engine identifies dysfunction patterns and prioritizes your corrective needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Exercises</h3>
            <p className="text-gray-600">
              Get a customized corrective exercise program with detailed instructions and progressions.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Perform Movements</h4>
              <p className="text-sm text-gray-600">
                Follow guided instructions for each movement screen
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Self-Assess</h4>
              <p className="text-sm text-gray-600">
                Score your movement quality and note any compensations
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Your Analysis</h4>
              <p className="text-sm text-gray-600">
                Receive a detailed breakdown of your movement dysfunctions
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Follow Your Program</h4>
              <p className="text-sm text-gray-600">
                Practice your personalized corrective exercise routine
              </p>
            </div>
          </div>
        </div>

        {/* Movement Screens Preview */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What We Assess</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Overhead Squat', icon: '🏋️' },
              { name: 'Single Leg Balance', icon: '🦩' },
              { name: 'Hip Hinge', icon: '🔄' },
              { name: 'Shoulder Mobility', icon: '💪' },
              { name: 'Thoracic Rotation', icon: '🔃' },
              { name: 'Ankle Mobility', icon: '🦶' },
              { name: 'Hip 90/90', icon: '🧘' },
              { name: 'Straight Leg Raise', icon: '🦵' },
            ].map((screen) => (
              <div
                key={screen.name}
                className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl mb-2 block">{screen.icon}</span>
                <span className="text-sm font-medium text-gray-700">{screen.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Improve Your Movement?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Take the first step toward pain-free movement. The assessment takes about 15-20 minutes
            and you will receive a complete corrective exercise program.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Start Free Assessment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p className="mb-2">
            This tool is for educational purposes and is not a substitute for professional medical advice.
          </p>
          <p>
            If you experience pain or have concerns about your movement, please consult a healthcare professional.
          </p>
        </div>
      </footer>
    </div>
  );
}
