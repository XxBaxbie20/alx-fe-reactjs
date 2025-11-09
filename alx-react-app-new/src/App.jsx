import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import Header from './components/Header'
import MainContent from './components/MainContent'
import UserProfile from './components/UserProfile'
import Counter from './components/Counter'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      
      {/* Welcome Section */}
      <WelcomeMessage />

      {/* Main App Components */}
      <Header />
      <MainContent />
      <UserProfile
        name="Alice"
        age="25"
        bio="Loves hiking and photography."
      />

      {/* Counter Component */}
      <Counter />

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default App
