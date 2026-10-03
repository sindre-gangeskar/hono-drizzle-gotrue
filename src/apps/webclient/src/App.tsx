import './App.css';
import Button from './components/Button';
import './index.css';

const App = () => {
  return (
    <div className="content">
      <div className="w-full h-full"></div>
      <h1 className=''>Rsbuild with React</h1>
      <p className=''>Start building amazing things with Rsbuild</p>
      <Button className='self-center' label='Hi!' onClick={() => { console.info('CLICK!') }} />
    </div>
  );
};

export default App;
