import React, { useState } from 'react';
import { HomeView } from './views/HomeView';
import { ItineraryView } from './views/ItineraryView';
import { AiAssistantView } from './views/AiAssistantView';
import { ProfileView } from './views/ProfileView';
import { TripDetailView } from './views/TripDetailView';
import { SearchResultsView } from './views/SearchResultsView';
import { BottomNav } from './components/BottomNav';

interface Route {
  id: string;
  params?: any;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [navStack, setNavStack] = useState<Route[]>([]);

  // The current route is the top of the stack, or just the active tab if stack is empty
  const currentOverlay = navStack.length > 0 ? navStack[navStack.length - 1] : null;

  const navigateTo = (routeId: string, params?: any) => {
    // If it's a main tab, just switch tabs and clear stack
    if (['home', 'itinerary', 'ai', 'profile'].includes(routeId)) {
      setActiveTab(routeId);
      setNavStack([]);
    } else {
      // Otherwise push to stack
      setNavStack([...navStack, { id: routeId, params }]);
    }
  };

  const goBack = () => {
    setNavStack(navStack.slice(0, -1));
  };

  const renderContent = () => {
    // If there is an overlay route (detail, search), render that
    if (currentOverlay) {
      switch (currentOverlay.id) {
        case 'trip-detail':
          return <TripDetailView tripId={currentOverlay.params?.tripId} onBack={goBack} />;
        case 'search-results':
          return (
            <SearchResultsView 
              title={currentOverlay.params?.title} 
              type={currentOverlay.params?.type}
              query={currentOverlay.params?.query}
              onBack={goBack} 
              onNavigate={navigateTo}
            />
          );
        default:
          return <HomeView onNavigate={navigateTo} />;
      }
    }

    // Otherwise render the active tab
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={navigateTo} />;
      case 'itinerary':
        return <ItineraryView onNavigate={navigateTo} />;
      case 'ai':
        return <AiAssistantView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 max-w-md mx-auto relative shadow-2xl border-x border-slate-100 overflow-hidden">
      <main className="h-full">
        {renderContent()}
      </main>
      
      {/* Hide bottom nav if we are in a sub-view (overlay) */}
      {!currentOverlay && (
        <BottomNav activeTab={activeTab} setActiveTab={(tab) => navigateTo(tab)} />
      )}
    </div>
  );
};

export default App;