import './App.css';
import './index.css';
import { SessionProvider } from './contexts/SessionProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './components/router/AppRouter';
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AppRouter />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default App;
