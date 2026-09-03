import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from '@/store/StoreContext';
import { AuthProvider, useAuth } from '@/store/AuthContext';
import { UIProvider } from '@/store/UIContext';
import PublicLayout from '@/components/public/PublicLayout';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import AboutPage from '@/pages/AboutPage';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import InventoryOverview from '@/pages/admin/InventoryOverview';
import ProductForm from '@/pages/admin/ProductForm';
import OrdersLog from '@/pages/admin/OrdersLog';
import StoreAnalytics from '@/pages/admin/StoreAnalytics';
import { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InventoryOverview />} />
        <Route path="add" element={<ProductForm />} />
        <Route path="edit/:id" element={<ProductForm />} />
        <Route path="orders" element={<OrdersLog />} />
        <Route path="analytics" element={<StoreAnalytics />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <UIProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UIProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
