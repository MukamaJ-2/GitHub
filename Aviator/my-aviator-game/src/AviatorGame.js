import { useState, useEffect, useCallback, useRef } from 'react';
import { Rocket, Users, Timer, Settings, TrendingUp, Wallet, Crown, UserCircle2, Circle, Play, Target } from 'lucide-react';

export default function AviatorGame() {
  const [multiplier, setMultiplier] = useState(1);
  const [isFlying, setIsFlying] = useState(false);
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(0);
  const [lastWin, setLastWin] = useState(0);
  const [autoBet, setAutoBet] = useState(false);
  const [autoWithdraw, setAutoWithdraw] = useState(false);
  const [autoWithdrawAt, setAutoWithdrawAt] = useState(2);
  const [players, setPlayers] = useState([]);
  const [systemBalance, setSystemBalance] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const maxPlayers = 5;
  const [countdown, setCountdown] = useState(5);
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const [onlinePlayers, setOnlinePlayers] = useState([
    { id: 1, name: 'Alex', status: 'looking', rating: 1250 },
    { id: 2, name: 'Maria', status: 'in-game', rating: 1420 },
    { id: 3, name: 'John', status: 'looking', rating: 980 },
    { id: 4, name: 'Sarah', status: 'looking', rating: 1150 },
    { id: 5, name: 'Mike', status: 'in-game', rating: 1340 },
  ]);
  const [gameMode, setGameMode] = useState('lobby'); // 'lobby', 'single', 'multiplayer'
  const [lobbyMessage, setLobbyMessage] = useState('');
  const [showLobby, setShowLobby] = useState(true);
  
  // New state variables for odds selection
  const [targetOdd, setTargetOdd] = useState(2);
  const [playerTargetOdds, setPlayerTargetOdds] = useState(new Map());
  const [selectedWinningOdd, setSelectedWinningOdd] = useState(null);
  const [gamePhase, setGamePhase] = useState('betting'); // 'betting', 'flying', 'ended'

  // Function to select winning multiplier from player-selected odds
  const selectWinningMultiplier = useCallback(() => {
    if (playerTargetOdds.size === 0) return null;
    
    // Convert odds to array and sort
    const odds = Array.from(playerTargetOdds.values()).sort((a, b) => a - b);
    
    // Different strategies for selecting winning odd:
    // 1. Random selection with weighted probability
    // 2. Select middle value
    // 3. Select lowest or highest value
    // 4. Select value that minimizes system payout
    
    // Using weighted random selection strategy:
    const totalWeight = odds.reduce((sum, odd) => sum + (1 / odd), 0);
    let random = Math.random() * totalWeight;
    
    for (let odd of odds) {
      random -= (1 / odd);
      if (random <= 0) {
        return odd;
      }
    }
    
    return odds[0]; // Fallback to first odd
  }, [playerTargetOdds]);

  // Function to join game
  const joinGame = useCallback(() => {
    if (players.length >= maxPlayers || !playerName || betAmount <= 0 || betAmount > balance) return;
    
    const systemFee = betAmount * 0.1;
    const actualBet = betAmount - systemFee;
    
    setSystemBalance(prev => prev + systemFee);
    setBalance(prev => prev - betAmount);
    
    const newPlayer = {
      id: Date.now(),
      name: playerName,
      bet: actualBet,
      multiplier: 0,
      hasWithdrawn: false,
      targetOdd: targetOdd
    };
    
    setPlayers(prev => [...prev, newPlayer]);
    setPlayerTargetOdds(prev => new Map(prev).set(newPlayer.id, targetOdd));
    setIsJoined(true);
  }, [players, playerName, betAmount, balance, targetOdd]);

  // Function to start single player mode
  const startSinglePlayerMode = () => {
    setGameMode('single');
    setShowLobby(false);
    const newPlayer = {
      id: Date.now(),
      name: playerName || 'You',
      bet: betAmount * 0.9,
      multiplier: 0,
      hasWithdrawn: false,
      targetOdd: targetOdd
    };
    setPlayers([newPlayer]);
    setPlayerTargetOdds(new Map().set(newPlayer.id, targetOdd));
    setIsJoined(true);
  };

  // Function to invite player
  const invitePlayer = (player) => {
    setLobbyMessage(`Invitation sent to ${player.name}`);
    setTimeout(() => setLobbyMessage(''), 3000);
  };

  // Function to distribute winnings
  const distributeWinnings = useCallback((crashPoint) => {
    setPlayers(prev => prev.map(player => {
      if (player.hasWithdrawn) {
        return player;
      }
      return {
        ...player,
        multiplier: crashPoint,
        hasWithdrawn: true
      };
    }));

    // Calculate and distribute winnings for each player
    players.forEach(player => {
      if (player.hasWithdrawn && player.name === playerName) {
        const winnings = player.bet * player.multiplier;
        setBalance(prev => prev + winnings);
      }
    });
  }, [players, playerName]);

  // Draw flight path
  useEffect(() => {
    if (!isFlying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const point = {
      x: Math.min((multiplier - 1) * 100, canvas.width - 20),
      y: canvas.height - Math.min((multiplier - 1) * 50, canvas.height - 20)
    };
    pointsRef.current.push(point);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    pointsRef.current.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [multiplier, isFlying]);

  const startGame = useCallback(() => {
    if (betAmount > balance || betAmount <= 0) return;
    
    const systemFee = betAmount * 0.1;
    const actualBet = betAmount - systemFee;
    
    setBalance(prev => prev - betAmount);
    setSystemBalance(prev => prev + systemFee);
    setCurrentBet(actualBet);
    
    // Select winning multiplier before starting the game
    if (gameMode === 'multiplayer' && players.length > 1) {
      const winningOdd = selectWinningMultiplier();
      setSelectedWinningOdd(winningOdd);
    }
    
    setIsFlying(true);
    setGamePhase('flying');
    setHasGameEnded(false);
    setMultiplier(1);
    setLastWin(0);
    pointsRef.current = [];
  }, [betAmount, balance, gameMode, players.length, selectWinningMultiplier]);

  const cashOut = useCallback(() => {
    if (!isFlying || hasGameEnded) return;
    
    const winAmount = currentBet * multiplier;
    setBalance(prev => prev + winAmount);
    setLastWin(winAmount);
    setIsFlying(false);
    setHasGameEnded(true);
  }, [isFlying, hasGameEnded, currentBet, multiplier]);

  // Modified odds calculation
  const calculateCrashPoint = () => {
    const random = Math.random();
    
    // Distribution of crash points:
    // 30% chance: 1x - 2x
    // 40% chance: 2x - 5x
    // 20% chance: 5x - 20x
    // 8% chance: 20x - 100x
    // 2% chance: 100x - 200x
    
    if (random < 0.30) {
      return 1 + Math.random();
    } else if (random < 0.70) {
      return 2 + Math.random() * 3;
    } else if (random < 0.90) {
      return 5 + Math.random() * 15;
    } else if (random < 0.98) {
      return 20 + Math.random() * 80;
    } else {
      return 100 + Math.random() * 100;
    }
  };

  // Modified game logic
  useEffect(() => {
    let intervalId;
    if (isFlying && !hasGameEnded) {
      const crashPoint = gameMode === 'multiplayer' && selectedWinningOdd 
        ? selectedWinningOdd + Math.random() * 0.1 // Add small random variation
        : calculateCrashPoint();
        
      intervalId = setInterval(() => {
        setMultiplier(prev => {
          if (prev >= crashPoint) {
            setIsFlying(false);
            setHasGameEnded(true);
            setGamePhase('ended');
            return prev;
          }
          return prev + 0.01;
        });

        if (autoWithdraw && multiplier >= autoWithdrawAt) {
          cashOut();
        }
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [isFlying, hasGameEnded, autoWithdraw, autoWithdrawAt, cashOut, gameMode, selectedWinningOdd]);

  // Countdown and auto-start logic
  useEffect(() => {
    let countdownId;
    if (hasGameEnded && autoBet) {
      countdownId = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            startGame();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownId);
  }, [hasGameEnded, autoBet, startGame]);

  // Render lobby component
  const LobbyComponent = () => (
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-blue-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Game Lobby</h2>
          <button 
            onClick={() => setShowLobby(false)}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Start Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Quick Start</h3>
            <button
              onClick={startSinglePlayerMode}
              className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <Play size={20} /> Play Single Player
            </button>
            <div className="text-sm text-gray-400 text-center">
              Practice and improve your skills
            </div>
          </div>

          {/* Online Players Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Online Players</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {onlinePlayers.map(player => (
                <div 
                  key={player.id}
                  className="bg-gray-700/50 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Circle 
                      size={8} 
                      className={player.status === 'looking' ? 'text-green-500' : 'text-gray-500'} 
                      fill={player.status === 'looking' ? 'currentColor' : 'none'}
                    />
                    <UserCircle2 size={20} className="text-blue-400" />
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-xs text-gray-400">Rating: {player.rating}</div>
                    </div>
                  </div>
                  {player.status === 'looking' && (
                    <button
                      onClick={() => invitePlayer(player)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-full text-sm"
                    >
                      Invite
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {lobbyMessage && (
          <div className="mt-4 text-center text-green-400 animate-pulse">
            {lobbyMessage}
          </div>
        )}
      </div>
    </div>
  );

  // Render target odd input in game controls
  const renderTargetOddInput = () => (
    <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-3">
      <Target size={16} className="text-blue-400" />
      <input
        type="number"
        value={targetOdd}
        onChange={(e) => setTargetOdd(Number(e.target.value))}
        min="1.1"
        max="200"
        step="0.1"
        className="w-full bg-transparent border-none focus:outline-none"
        placeholder="Target multiplier"
        disabled={isFlying || isJoined}
      />
    </div>
  );

  // Render player odds in the player list
  const renderPlayerWithOdd = (player) => (
    <div key={player.id} 
         className={`bg-gray-700/50 rounded-lg p-4 border ${
           player.hasWithdrawn ? 'border-green-500/50' : 'border-blue-500/20'
         }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {player.hasWithdrawn && <Crown className="text-yellow-500 w-4 h-4" />}
          <span>{player.name}</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Bet: ${player.bet.toFixed(2)}</div>
          <div className="text-sm text-blue-400">Target: {player.targetOdd}x</div>
          {player.hasWithdrawn && (
            <div className="text-green-400">
              Won: ${(player.bet * player.multiplier).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Add to the game controls section
  const LobbyButton = () => (
    <button
      onClick={() => setShowLobby(true)}
      className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-lg flex items-center gap-2"
    >
      <Users size={20} />
      <span className="font-bold">Find Players</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Players */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users size={20} /> 
                {gameMode === 'single' ? 'Single Player' : `Players (${players.length}/${maxPlayers})`}
              </h2>
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                System Fee: 10%
              </span>
            </div>
            
            <div className="space-y-3">
              {players.map(player => renderPlayerWithOdd(player))}
            </div>

            {/* Modified join game form */}
            {!isJoined && (gameMode === 'single' || players.length < maxPlayers) && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 bg-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={gameMode === 'single' ? startSinglePlayerMode : joinGame}
                  disabled={!playerName || betAmount <= 0 || betAmount > balance}
                  className="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-bold transition-all duration-300"
                >
                  {gameMode === 'single' ? 'Start Single Player' : 'Join Game'}
                </button>
              </div>
            )}
          </div>

          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              {/* Game Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Your Balance</div>
                  <div className="text-xl font-bold">${balance.toFixed(2)}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400">System Balance</div>
                  <div className="text-xl font-bold">${systemBalance.toFixed(2)}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Multiplier</div>
                  <div className="text-xl font-bold text-blue-400">{multiplier.toFixed(2)}x</div>
                </div>
              </div>

              {/* Game Canvas */}
              <div className="relative h-[400px] bg-gray-900/50 rounded-xl mb-6 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  width={800}
                  height={400}
                />
                {isFlying && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
                    <Rocket 
                      className="absolute text-blue-400 transition-all duration-100"
                      style={{
                        bottom: `${Math.min((multiplier - 1) * 20, 80)}%`,
                        left: `${Math.min((multiplier - 1) * 10, 80)}%`,
                        transform: `rotate(-45deg)`,
                        filter: `brightness(${1 + (multiplier / 10)}) drop-shadow(0 0 ${multiplier * 2}px rgba(59, 130, 246, 0.5))`
                      }}
                      size={32}
                    />
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${Math.min((multiplier - 1) * 10, 80)}% ${100 - Math.min((multiplier - 1) * 20, 80)}%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)`
                      }}
                    />
                  </>
                )}
              </div>

              {/* Game Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="w-full p-3 bg-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Bet amount"
                    disabled={isFlying || !isJoined}
                  />
                  {gameMode === 'multiplayer' && renderTargetOddInput()}
                  <button
                    onClick={startGame}
                    disabled={isFlying || !isJoined || betAmount <= 0}
                    className="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-600 rounded-lg font-bold"
                  >
                    {gameMode === 'multiplayer' && players.length < 2 ? 'Waiting for players...' : 'Start Game'}
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    Actual Bet: ${(betAmount * 0.9).toFixed(2)}
                    <div className="text-sm text-gray-400">After 10% system fee</div>
                  </div>
                  <button
                    onClick={cashOut}
                    disabled={!isFlying || hasGameEnded || !isJoined}
                    className="w-full p-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 rounded-lg font-bold"
                  >
                    Cash Out
                  </button>
                </div>
              </div>

              {/* Auto Settings */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <Settings size={16} /> Auto Bet
                    </label>
                    <button
                      onClick={() => setAutoBet(!autoBet)}
                      className={`px-4 py-1 rounded-full ${
                        autoBet ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      {autoBet ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <TrendingUp size={16} /> Auto Withdraw
                    </label>
                    <button
                      onClick={() => setAutoWithdraw(!autoWithdraw)}
                      className={`px-4 py-1 rounded-full ${
                        autoWithdraw ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      {autoWithdraw ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  {autoWithdraw && (
                    <input
                      type="number"
                      value={autoWithdrawAt}
                      onChange={(e) => setAutoWithdrawAt(Number(e.target.value))}
                      className="w-full mt-2 p-2 bg-gray-600 rounded"
                      placeholder="Auto withdraw at multiplier"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Game Messages */}
            {lastWin > 0 && (
              <div className="mt-4 text-center text-2xl font-bold animate-bounce">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  You won ${lastWin.toFixed(2)}!
                </span>
              </div>
            )}
            {hasGameEnded && !lastWin && (
              <div className="mt-4 text-center text-2xl text-red-500 font-bold animate-pulse">
                Game Over!
              </div>
            )}
          </div>

          {/* Game Phase Indicator */}
          {gameMode === 'multiplayer' && (
            <div className="mt-4 text-center">
              <div className="inline-block px-4 py-2 rounded-full bg-gray-700/50">
                <span className="text-sm text-gray-400">Game Phase: </span>
                <span className="font-bold text-blue-400 capitalize">{gamePhase}</span>
              </div>
            </div>
          )}

          {/* Winner Announcement */}
          {gamePhase === 'ended' && selectedWinningOdd && (
            <div className="mt-4 text-center">
              <div className="text-xl font-bold text-green-400">
                Winning Multiplier: {selectedWinningOdd.toFixed(2)}x
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Lobby UI */}
      {showLobby && <LobbyComponent />}
      {!showLobby && <LobbyButton />}

      {/* Online Players Counter */}
      <div className="fixed top-6 right-6 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
        <Circle size={8} className="text-green-500" fill="currentColor" />
        <span>{onlinePlayers.filter(p => p.status === 'looking').length} Players Online</span>
      </div>
    </div>
  );
}