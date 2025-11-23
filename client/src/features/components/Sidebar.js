import LeaderboardWidget from './LeaderboardWidget';
import TopTaggedWidget from './TopTaggedWidget';
import RecentReactionsWidget from './RecentReactionsWidget';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <LeaderboardWidget />
      <TopTaggedWidget />
      <RecentReactionsWidget />
    </aside>
  );
}

export default Sidebar;

