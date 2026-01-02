import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './client/src/components/Layout';
import Auth from './client/src/pages/Auth';
import ForgotPassword from './client/src/pages/ForgotPassword';
import ResetPassword from './client/src/pages/ResetPassword';
import EmailVerification from './client/src/pages/EmailVerification';
import EmployeeHome from './client/src/pages/EmployeeHome';
import CreateShoutOut from './client/src/pages/CreateShoutOut';
import EditShoutOut from './client/src/pages/EditShoutOut';
import Leaderboard from './client/src/pages/Leaderboard';
import Profile from './client/src/pages/Profile';
import AdminDashboard from './client/src/pages/AdminDashboard';
import AdminEmployees from './client/src/pages/AdminEmployees';
import AdminShoutOutManagement from './client/src/pages/AdminShoutOutManagement';
import AdminAnalytics from './client/src/pages/AdminAnalytics';
import Notifications from './client/src/pages/Notifications';
import Settings from './client/src/pages/Settings';
import Challenges from './client/src/pages/Challenges';
import Announcements from './client/src/pages/Announcements';
import Reports from './client/src/pages/Reports';
import MyActivity from './client/src/pages/MyActivity';
import DeptPerformance from './client/src/pages/DeptPerformance';
import Feedback from './client/src/pages/Feedback';
import AIRecommendations from './client/src/pages/AIRecommendations';
import EngagementAnalytics from './client/src/pages/EngagementAnalytics';
import IntegrationSettings from './client/src/pages/IntegrationSettings';
import AccessDenied from './client/src/pages/AccessDenied';
import AppreciationWall from './client/src/pages/AppreciationWall';
import Certificates from './client/src/pages/Certificates';
import Rewards from './client/src/pages/Rewards';
import AuditLogs from './client/src/pages/AuditLogs';
import NotFound from './client/src/pages/NotFound';
import { User, UserRole, ShoutOut, Announcement, Challenge, Transaction, Comment as AppComment } from './client/src/types';
import { apiRequest } from './client/src/services/api';

export interface AppNotification {
  id: string;
  title: string;
  msg: string;
  time: Date;
  type: 'brag' | 'badge' | 'system' | 'broadcast';
  read: boolean;
}

const ProtectedRoute = ({ children, user, requiredRole }: { children: React.ReactNode, user: User | null, requiredRole?: string | string[] }) => {
  const location = useLocation();
  const token = localStorage.getItem('bb_access_token');
  if (!token || !user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.status !== 'ACTIVE') return <Navigate to="/login" replace />;
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) return <Navigate to="/access-denied" replace />;
  }
  return <>{children}</>;
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [brags, setBrags] = useState<ShoutOut[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const flaggedCount = useMemo(() => {
    const reportedPosts = brags.filter(b => !!b.isReported).length;
    const reportedComments = brags.flatMap(b => b.comments.filter(c => !!c.isReported)).length;
    return reportedPosts + reportedComments;
  }, [brags]);

  const fetchData = async () => {
    const token = localStorage.getItem('bb_access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      // Parallel fetching from real SQLite backend via FastAPI
      const [userData, shoutoutsData, allUsersData, annData, chalData] = await Promise.all([
        apiRequest('/auth/me'),
        apiRequest('/shoutouts'),
        apiRequest('/users'),
        apiRequest('/announcements'),
        apiRequest('/challenges')
      ]);

      setUser(userData);
      setBrags(shoutoutsData);
      setUsers(allUsersData);
      setAnnouncements(annData);
      setChallenges(chalData);
    } catch (err) {
      console.error('Data Fetching Fault:', err);
      // If unauthorized, the apiRequest will handle redirect to login
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAuth = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('bragboard_user', JSON.stringify(loggedInUser));
    fetchData(); // Hydrate all other data after successful login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bragboard_user');
    localStorage.removeItem('bb_access_token');
    localStorage.removeItem('bb_refresh_token');
    window.location.hash = '#/login';
  };

  const addBrag = async (newBragData: Partial<ShoutOut>) => {
    try {
      const savedBrag = await apiRequest('/shoutouts', {
        method: 'POST',
        body: JSON.stringify(newBragData)
      });
      setBrags(prev => [savedBrag, ...prev]);
      // Points are updated in DB; refetching users ensures total accuracy
      const updatedUsers = await apiRequest('/users');
      setUsers(updatedUsers);
    } catch (err) {
      alert("System Error: Failed to publish shout-out to database.");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
          <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] animate-pulse italic">Connecting to DB Node...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Auth onLogin={handleAuth} users={users} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        
        <Route element={<Layout user={user} onLogout={handleLogout} notifications={notifications} flaggedCount={flaggedCount} />}>
          <Route path="/" element={<ProtectedRoute user={user}><EmployeeHome user={user!} brags={brags} users={users} onReaction={()=>{}} onComment={()=>{}} onReport={()=>{}} onReportComment={()=>{}} /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute user={user}><Leaderboard users={users} currentUser={user!} /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute user={user}><Profile user={user!} brags={brags} users={users} /></ProtectedRoute>} />
          <Route path="/announcements" element={<ProtectedRoute user={user}><Announcements user={user!} announcements={announcements} onCreate={()=>{}} onReact={()=>{}} onComment={()=>{}} /></ProtectedRoute>} />
          <Route path="/challenges" element={<ProtectedRoute user={user}><Challenges user={user!} users={users} challenges={challenges} onCreateChallenge={()=>{}} /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute user={user}><Settings user={user!} onUpdateProfile={()=>{}} /></ProtectedRoute>} />
          <Route path="/create-shoutout" element={<ProtectedRoute user={user}><CreateShoutOut user={user!} users={users} onAddBrag={addBrag} /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute user={user}><Notifications notifications={notifications} onMarkAllRead={()=>{}} onDelete={()=>{}} /></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute user={user}><MyActivity user={user!} brags={brags} /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute user={user}><AIRecommendations user={user!} brags={brags} users={users} /></ProtectedRoute>} />
          <Route path="/appreciation-wall" element={<ProtectedRoute user={user}><AppreciationWall brags={brags} /></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute user={user}><Rewards user={user!} transactions={transactions} onRedeem={()=>{}} /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute user={user} requiredRole={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}><AdminDashboard brags={brags} users={users} currentUser={user!} /></ProtectedRoute>} />
          <Route path="/admin/employees" element={<ProtectedRoute user={user} requiredRole={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}><AdminEmployees currentUser={user!} users={users} onToggleStatus={()=>{}} onApprove={()=>{}} onReject={()=>{}} /></ProtectedRoute>} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);