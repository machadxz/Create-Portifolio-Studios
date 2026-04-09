import React from 'react';
import { Award, Trophy, Star, Target, Zap, Crown, Medal, Shield } from 'lucide-react';
import './AchievementSystem.css';

const AchievementSystem = ({ achievements, user }) => {
  const allAchievements = [
    { id: 1, name: 'Primeiro Passo', desc: 'Crie seu primeiro portfólio', icon: Target, points: 10, unlocked: !!user },
    { id: 2, name: 'Perfil Completo', desc: 'Preencha todas as informações', icon: Star, points: 20, unlocked: user && user.nome },
    { id: 3, name: 'Portfólio Profissional', desc: 'Adicione 5 projetos', icon: Award, points: 30, unlocked: false },
    { id: 4, name: 'Designer', desc: 'Use 10+ elementos visuais', icon: Zap, points: 25, unlocked: false },
    { id: 5, name: 'Colaborador', desc: 'Convide 3 amigos', icon: Shield, points: 40, unlocked: false },
    { id: 6, name: 'MVP', desc: 'Publique seu portfólio', icon: Trophy, points: 50, unlocked: false },
    { id: 7, name: 'Expert', desc: 'Complete o perfil com skills', icon: Crown, points: 35, unlocked: false },
    { id: 8, name: 'Top Creator', desc: 'Tenha 1000 visualizações', icon: Medal, points: 100, unlocked: false },
  ];

  const unlockedCount = allAchievements.filter(a => a.unlocked).length;
  const totalPoints = allAchievements.filter(a => a.unlocked).reduce((acc, a) => acc + a.points, 0);

  return (
    <div className="achievement-system">
      <div className="achievement-header">
        <h3><Trophy size={18} /> Conquistas</h3>
        <div className="achievement-stats">
          <span>{unlockedCount}/{allAchievements.length}</span>
          <span className="points">{totalPoints} pts</span>
        </div>
      </div>

      <div className="achievement-progress">
        <div className="progress-bar" style={{ width: `${(unlockedCount / allAchievements.length) * 100}%` }} />
      </div>

      <div className="achievement-list">
        {allAchievements.map(ach => (
          <div key={ach.id} className={`achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">
              <ach.icon size={20} />
            </div>
            <div className="achievement-info">
              <span className="achievement-name">{ach.name}</span>
              <span className="achievement-desc">{ach.desc}</span>
            </div>
            <span className="achievement-points">+{ach.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;