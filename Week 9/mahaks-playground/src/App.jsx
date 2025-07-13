import './index.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Hero from './components/Hero';
import MultiColumn from './components/MultiColumn';
import Footer from './components/Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Menu />
      <Hero />
      <MultiColumn />
      <div className="separator"></div>
      <Footer />
    </div>
  );
}

export default App;