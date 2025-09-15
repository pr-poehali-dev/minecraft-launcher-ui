import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const MinecraftLauncher = () => {
  const [currentView, setCurrentView] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedServer, setSelectedServer] = useState('');

  const servers = [
    { id: 'hypixel', name: 'Hypixel', players: '47,382', status: 'online', ping: 24 },
    { id: 'mineplex', name: 'Mineplex', players: '12,847', status: 'online', ping: 31 },
    { id: 'cubecraft', name: 'CubeCraft', players: '8,293', status: 'online', ping: 18 },
    { id: 'hive', name: 'The Hive', players: '15,647', status: 'online', ping: 29 },
    { id: 'lifeboat', name: 'Lifeboat', players: '6,582', status: 'maintenance', ping: 0 }
  ];

  const FloatingPolygon = ({ delay = 0, size = 'w-8 h-8', position = 'top-20 left-20' }) => (
    <motion.div
      className={`absolute ${position} ${size} bg-minecraft-gradient opacity-20`}
      style={{
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
      }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const LoginView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-minecraft-dark via-minecraft-purple to-minecraft-dark relative overflow-hidden"
    >
      {/* Floating Background Polygons */}
      <FloatingPolygon delay={0} position="top-20 left-20" size="w-12 h-12" />
      <FloatingPolygon delay={1} position="top-40 right-32" size="w-8 h-8" />
      <FloatingPolygon delay={2} position="bottom-32 left-16" size="w-16 h-16" />
      <FloatingPolygon delay={3} position="bottom-20 right-20" size="w-10 h-10" />
      <FloatingPolygon delay={4} position="top-1/2 left-1/3" size="w-6 h-6" />
      <FloatingPolygon delay={5} position="top-1/3 right-1/4" size="w-14 h-14" />

      {/* Main Login Container */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <motion.div
          className="relative"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Card className="w-96 h-96 bg-card/90 backdrop-blur-sm border-minecraft-cyan/30 clip-circle relative overflow-hidden">
            <div className="absolute inset-0 bg-minecraft-gradient opacity-10" />
            
            <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center space-y-6">
              {/* Logo Area */}
              <motion.div
                className="text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Icon name="Gamepad2" size={48} className="text-minecraft-cyan mx-auto mb-2" />
                <h1 className="text-2xl font-bold text-minecraft-cyan">Minecraft</h1>
                <p className="text-minecraft-cyanbright text-sm">Launcher</p>
              </motion.div>

              {/* Login Form */}
              <motion.div
                className="w-full space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-input/50 border-minecraft-cyan/30 text-foreground placeholder-muted-foreground/70"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input/50 border-minecraft-cyan/30 text-foreground placeholder-muted-foreground/70"
                />
                <Button
                  onClick={() => setCurrentView('main')}
                  className="w-full bg-minecraft-gradient hover:opacity-90 text-minecraft-dark font-semibold"
                  disabled={!username || !password}
                >
                  Launch
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );

  const MainView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-minecraft-dark relative overflow-hidden"
    >
      {/* Wave Header */}
      <motion.header
        className="h-24 bg-minecraft-gradient clip-wave relative z-20"
        animate={{ clipPath: [
          'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
          'polygon(0 0, 100% 0, 100% 100%, 70% 80%, 0 100%)',
          'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)'
        ]}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between px-8 py-4 h-full">
          <div className="flex items-center space-x-4">
            <Icon name="User" size={32} className="text-minecraft-dark" />
            <div>
              <h2 className="text-minecraft-dark font-bold text-lg">{username}</h2>
              <p className="text-minecraft-dark/70 text-sm">Premium Account</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setCurrentView('settings')}
              variant="ghost"
              size="sm"
              className="text-minecraft-dark hover:bg-minecraft-dark/20"
            >
              <Icon name="Settings" size={20} />
            </Button>
            <Button
              onClick={() => setCurrentView('login')}
              variant="ghost"
              size="sm"
              className="text-minecraft-dark hover:bg-minecraft-dark/20"
            >
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-6rem)]">
        {/* Sidebar with Server List */}
        <motion.aside
          className="w-80 bg-sidebar clip-sidebar relative z-10 p-6"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="text-minecraft-cyan font-bold text-lg mb-6 flex items-center">
            <Icon name="Server" size={24} className="mr-2" />
            Servers
          </h3>
          
          <div className="space-y-3">
            {servers.map((server, index) => (
              <motion.div
                key={server.id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedServer(server.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedServer === server.id
                    ? 'bg-minecraft-cyan/20 border-minecraft-cyan'
                    : 'bg-card/50 border-border hover:bg-card/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Pickaxe" size={20} className="text-minecraft-cyanbright" />
                    <div>
                      <h4 className="font-semibold text-foreground">{server.name}</h4>
                      <p className="text-sm text-muted-foreground">{server.players} players</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`w-3 h-3 rounded-full mb-1 ${
                      server.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <p className="text-xs text-muted-foreground">{server.ping}ms</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            className="w-full mt-6 bg-minecraft-gradient hover:opacity-90 text-minecraft-dark font-semibold"
            disabled={!selectedServer}
          >
            <Icon name="Play" size={20} className="mr-2" />
            Join Server
          </Button>
        </motion.aside>

        {/* Main Game Area */}
        <motion.main
          className="flex-1 p-8 bg-gradient-to-br from-background to-minecraft-dark/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-full flex items-center justify-center">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-minecraft-cyan/30 max-w-md text-center">
              <Icon name="Gamepad2" size={64} className="text-minecraft-cyan mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Ready to Play</h2>
              <p className="text-muted-foreground mb-6">
                Select a server from the sidebar to start your adventure
              </p>
              {selectedServer && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 bg-minecraft-gradient/10 rounded-lg border border-minecraft-cyan/30"
                >
                  <p className="text-minecraft-cyan font-semibold">
                    Selected: {servers.find(s => s.id === selectedServer)?.name}
                  </p>
                </motion.div>
              )}
            </Card>
          </div>
        </motion.main>
      </div>
    </motion.div>
  );

  const SettingsView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen bg-minecraft-dark relative overflow-hidden p-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center mb-8"
        >
          <Button
            onClick={() => setCurrentView('main')}
            variant="ghost"
            size="sm"
            className="mr-4 text-minecraft-cyan hover:bg-minecraft-cyan/20"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-3xl font-bold text-minecraft-cyan">Settings</h1>
        </motion.div>

        <div className="space-y-6">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-minecraft-cyan/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Icon name="Monitor" size={24} className="mr-2 text-minecraft-cyanbright" />
              Display Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Fullscreen Mode</span>
                <Button variant="outline" size="sm">Toggle</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Resolution</span>
                <Button variant="outline" size="sm">1920x1080</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-minecraft-cyan/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Icon name="Gamepad2" size={24} className="mr-2 text-minecraft-cyanbright" />
              Game Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Render Distance</span>
                <Button variant="outline" size="sm">12 Chunks</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Graphics Quality</span>
                <Button variant="outline" size="sm">High</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-minecraft-cyan/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Icon name="Volume2" size={24} className="mr-2 text-minecraft-cyanbright" />
              Audio Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Master Volume</span>
                <Button variant="outline" size="sm">80%</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Music Volume</span>
                <Button variant="outline" size="sm">60%</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-minecraft-dark dark">
      <AnimatePresence mode="wait">
        {currentView === 'login' && <LoginView key="login" />}
        {currentView === 'main' && <MainView key="main" />}
        {currentView === 'settings' && <SettingsView key="settings" />}
      </AnimatePresence>
    </div>
  );
};

export default MinecraftLauncher;