
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from "./pages/Root";
import HomePage from './pages/Home';
import SearchResults from './pages/SearchResults.js'
// import { loader as propertiesLoader } from './components/Properties.js';
import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./components/util/http.js";
import { queryClient } from '../src/util/http.js'
import PropertyDetails from './components/PropertyDetails.js';
import AgentProfile from './components/AgentProfile.js';
import Login from './components/Login.js';
import { action } from './components/Login.js';
import UserProfile from './components/UserProfile.js';
import UserProfileEdit from './components/UserProfileEdit.js';
import { action as editProdileAction } from './components/UserProfileEdit.js';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { index: true, element: <HomePage /> },
      { path: 'properties/:type', element: <SearchResults /> },
      { path: 'properties/:type/:address', element: <SearchResults /> },
      { path: '/properties/:type/:address/:slug', element: <PropertyDetails /> },
      { path: '/agent/:username', element: <AgentProfile /> },
      { path: '/login', element: <Login />, action: action },
      { path: '/profile', element: <UserProfile /> },
      { path: '/profile/edit', element: <UserProfileEdit />, action: editProdileAction }
    ]
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  );
}

export default App;

