 import Header from './components/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div  className='min-h-screen  w-full flex flex-wrap content-between '>
      <div className='w-full '>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
