import './App.css';
import AppRoutes from './routes/app_routes';
import { UserProvider } from "./contexts/user/UserContext";
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <UserProvider >
        <AppRoutes />
      </UserProvider>
    </Provider>
  );
}

export default App;
