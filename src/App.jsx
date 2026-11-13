import { useEffect, useMemo, useState } from "react";

const icons = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  activity: <><path d="M3 12h4l3-8 4 16 3-8h4" /><path d="M3 4v16" opacity=".3" /></>,
  team: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1" /><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14a5 5 0 0 1 3 4.6V20" /></>,
  trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" /></>,
  dumbbell: <><path d="m6.5 6.5 11 11M4 9l5-5M15 20l5-5M3 11l8-8M13 21l8-8" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1L11 7.4h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  flame: <><path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 0 3-2 4-2 4 0-4-2-7-5-10 1 5-4 8-4 13 0 4 3 7 8 7Z" /><path d="M12 22c-2 0-3-2-3-4s2-3 3-5c1 2 3 3 3 5s-1 4-3 4Z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m7 10 5 5 5-5" />,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
};

function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
}

const initialActivities = [
  { id: 1, title: "Morning run", type: "Running", detail: "East track · 2.4 km", duration: 28, date: "Today, 8:15 AM", icon: "🏃", color: "coral" },
  { id: 2, title: "Strength circuit", type: "Strength", detail: "Fitness center · 6 exercises", duration: 35, date: "Yesterday, 3:40 PM", icon: "🏋️", color: "violet" },
  { id: 3, title: "Pool laps", type: "Swimming", detail: "Aquatics center · 16 laps", duration: 24, date: "Mon, 4:10 PM", icon: "🏊", color: "blue" },
];

const teams = [
  { name: "Peak Performers", members: 8, goal: "Move 1,000 minutes this week", progress: 72, color: "green", icon: "⛰️" },
  { name: "Early Birds", members: 6, goal: "Complete 30 morning workouts", progress: 54, color: "orange", icon: "🌤️" },
  { name: "Campus Cardio", members: 12, goal: "Run 100 km together", progress: 86, color: "blue", icon: "👟" },
];

const students = [
  { name: "Jordan Lee", initials: "JL", points: 1480, minutes: 395, change: "+2", color: "avatar-blue" },
  { name: "Maya Chen", initials: "MC", points: 1320, minutes: 342, change: "+1", color: "avatar-lilac" },
  { name: "Alex Rivera", initials: "AR", points: 1260, minutes: 318, change: "−1", color: "avatar-peach" },
  { name: "Sam Patel", initials: "SP", points: 1120, minutes: 287, change: "+3", color: "avatar-mint" },
  { name: "Taylor Kim", initials: "TK", points: 980, minutes: 254, change: "−1", color: "avatar-yellow" },
];

const workouts = [
  { title: "Quick Cardio Boost", type: "CARDIO", duration: "20 min", level: "Beginner", icon: "⚡", color: "workout-peach", description: "A heart-pumping set that fits between classes." },
  { title: "Full Body Foundations", type: "STRENGTH", duration: "30 min", level: "All levels", icon: "💪", color: "workout-lilac", description: "Build strength with simple, equipment-free moves." },
  { title: "Mindful Reset", type: "FLEXIBILITY", duration: "15 min", level: "Beginner", icon: "🧘", color: "workout-mint", description: "Stretch, breathe, and recharge for the rest of your day." },
];

const todayLabel = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  .format(new Date())
  .toUpperCase();

const navItems = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "activity", label: "My activity", icon: "activity" },
  { id: "teams", label: "Teams", icon: "team" },
  { id: "leaderboard", label: "Leaderboard", icon: "trophy" },
  { id: "workouts", label: "Workouts", icon: "dumbbell" },
];

function loadSaved(key, fallback) {
  const saved = window.localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

function Avatar({ initials, color = "avatar-lilac", small = false }) {
  return <span className={`avatar ${color}${small ? " avatar-small" : ""}`}>{initials}</span>;
}

function SectionHeading({ eyebrow, title, action, onAction }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{action && <button className="text-button" onClick={onAction}>{action}<Icon name="arrow" size={16} /></button>}</div>;
}

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState("student");
  const [activities, setActivities] = useState(() => loadSaved("octofit-activities", initialActivities));
  const [joinedTeams, setJoinedTeams] = useState(() => loadSaved("octofit-teams", ["Peak Performers"]));
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => window.localStorage.setItem("octofit-activities", JSON.stringify(activities)), [activities]);
  useEffect(() => window.localStorage.setItem("octofit-teams", JSON.stringify(joinedTeams)), [joinedTeams]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const isTeacher = profile === "teacher";
  const name = isTeacher ? "David Park" : "Maya Chen";
  const minutes = activities.reduce((total, activity) => total + Number(activity.duration), 0);
  const weekGoal = 300;
  const weekProgress = Math.min(Math.round((minutes / weekGoal) * 100), 100);
  const userPoints = 1320 + activities.slice(0, Math.max(0, activities.length - initialActivities.length)).reduce((total, activity) => total + Number(activity.duration) * 4, 0);
  const leaderboard = useMemo(() => students.map((student) => student.name === "Maya Chen" ? { ...student, points: userPoints, minutes } : student).sort((a, b) => b.points - a.points), [userPoints, minutes]);
  const userRank = leaderboard.findIndex((student) => student.name === "Maya Chen") + 1;

  function addActivity(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title")).trim();
    const duration = Number(form.get("duration"));
    const type = String(form.get("type"));
    if (!title || !Number.isFinite(duration) || duration < 1) return;
    const details = { Running: "Outdoor route · logged activity", Strength: "Fitness center · logged activity", Swimming: "Aquatics center · logged activity", Cycling: "Campus route · logged activity", Walking: "Campus loop · logged activity" };
    const iconsByType = { Running: "🏃", Strength: "🏋️", Swimming: "🏊", Cycling: "🚴", Walking: "🚶" };
    setActivities([{ id: Date.now(), title, type, detail: details[type], duration, date: "Just now", icon: iconsByType[type], color: "coral" }, ...activities]);
    setShowActivityForm(false);
    setToast("Activity added to your progress!");
  }

  function toggleTeam(teamName) {
    setJoinedTeams((current) => current.includes(teamName) ? current.filter((team) => team !== teamName) : [...current, teamName]);
    setToast(joinedTeams.includes(teamName) ? `You left ${teamName}.` : `You joined ${teamName}!`);
  }

  function startWorkout(title) {
    setToast(`${title} is ready when you are!`);
  }

  const greeting = isTeacher ? "Here’s how your students are moving." : "Ready to make today count?";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setActiveTab("overview"); }}>
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span className="brand-name">octofit<span>.</span></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => <button key={item.id} className={`nav-link${activeTab === item.id ? " active" : ""}`} onClick={() => setActiveTab(item.id)}><Icon name={item.icon} size={19} /><span>{item.label}</span>{item.id === "teams" && <span className="nav-count">{joinedTeams.length}</span>}</button>)}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-tip">
          <div className="tip-icon">✦</div><p className="tip-title">Small steps add up.</p><p className="tip-copy">You’re building a stronger you, one day at a time.</p>
        </div>
        <button className="nav-link settings-link" onClick={() => setToast("You’re all set — profile settings are coming soon.")}><Icon name="settings" size={19} /><span>Settings</span></button>
        <button className="sidebar-profile" onClick={() => setProfile(isTeacher ? "student" : "teacher")} aria-label="Switch profile">
          <Avatar initials={isTeacher ? "DP" : "MC"} color={isTeacher ? "avatar-blue" : "avatar-lilac"} small />
          <span className="profile-copy"><strong>{name}</strong><small>{isTeacher ? "Gym teacher" : "Student profile"}</small></span><Icon name="chevron" size={16} />
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark"><span /><span /><span /><span /></span><span className="brand-name">octofit<span>.</span></span></div>
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-divider">/</span><strong>{navItems.find((item) => item.id === activeTab)?.label}</strong></div>
          <div className="topbar-actions">
            <label className="profile-switch"><span className="sr-only">Active profile</span><select value={profile} onChange={(event) => setProfile(event.target.value)}><option value="student">Student view</option><option value="teacher">Teacher view</option></select><Icon name="chevron" size={15} /></label>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setToast("You’re all caught up!")}>
              <Icon name="bell" size={19} /><span className="notification-dot" />
            </button>
            <Avatar initials={isTeacher ? "DP" : "MC"} color={isTeacher ? "avatar-blue" : "avatar-lilac"} small />
          </div>
        </header>

        <div className="page-content">
          {activeTab === "overview" && <Overview name={name} isTeacher={isTeacher} greeting={greeting} minutes={minutes} weekProgress={weekProgress} userRank={userRank} activities={activities} onLog={() => setShowActivityForm(true)} onNavigate={setActiveTab} />}
          {activeTab === "activity" && <ActivityPage activities={activities} minutes={minutes} onLog={() => setShowActivityForm(true)} />}
          {activeTab === "teams" && <TeamsPage joinedTeams={joinedTeams} onToggle={toggleTeam} />}
          {activeTab === "leaderboard" && <LeaderboardPage leaderboard={leaderboard} userRank={userRank} isTeacher={isTeacher} />}
          {activeTab === "workouts" && <WorkoutsPage onStart={startWorkout} />}
          <footer className="page-footer"><span>Made for moving, made for you.</span><span>OctoFit Tracker <span className="footer-dot">·</span> Keep showing up ✦</span></footer>
        </div>
      </main>

      {showActivityForm && <ActivityModal onClose={() => setShowActivityForm(false)} onSubmit={addActivity} />}
      {toast && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={15} /></span>{toast}</div>}
    </div>
  );
}

function Overview({ name, isTeacher, greeting, minutes, weekProgress, userRank, activities, onLog, onNavigate }) {
  const recent = activities.slice(0, 3);
  return <>
    <section className="welcome-row">
      <div><p className="eyebrow">{isTeacher ? "TEACHER DASHBOARD" : todayLabel}</p><h1>{isTeacher ? `Good morning, ${name.split(" ")[0]}.` : <>Hey, {name.split(" ")[0]} <span className="wave">✦</span></>}</h1><p className="welcome-subtitle">{greeting}</p></div>
      {!isTeacher && <button className="primary-button" onClick={onLog}><Icon name="plus" size={18} />Log activity</button>}
    </section>
    {isTeacher ? <TeacherOverview onNavigate={onNavigate} /> : <>
      <section className="stats-grid" aria-label="Your fitness statistics">
        <article className="stat-card stat-highlight"><div className="stat-top"><span className="stat-label">Active minutes</span><span className="stat-icon mint-icon"><Icon name="clock" size={18} /></span></div><div className="stat-value">{minutes}<span> min</span></div><div className="stat-caption"><span className="trend-up">↗ 12%</span> vs. last week</div><div className="mini-bars" aria-hidden="true">{[24, 37, 32, 54, 41, 69, 48, 82, 59, 70, 50, 93, 73, 62, 86, 54, 76, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></article>
        <article className="stat-card"><div className="stat-top"><span className="stat-label">Weekly goal</span><span className="stat-icon peach-icon"><Icon name="flame" size={18} /></span></div><div className="stat-value">{weekProgress}<span>%</span></div><div className="stat-caption">{Math.max(0, 300 - minutes)} min to your 300 min goal</div><div className="progress-track"><span style={{ width: `${weekProgress}%` }} /></div></article>
        <article className="stat-card"><div className="stat-top"><span className="stat-label">Leaderboard</span><span className="stat-icon lilac-icon"><Icon name="trophy" size={18} /></span></div><div className="stat-value">#{userRank}<span className="rank-out-of"> / 24</span></div><div className="stat-caption"><span className="trend-up">↑ 1 spot</span> this week</div><div className="rank-avatars"><Avatar initials="JL" color="avatar-blue" small /><Avatar initials="MC" color="avatar-lilac" small /><Avatar initials="AR" color="avatar-peach" small /><span className="rank-more">+21</span><span className="rank-label">Keep climbing!</span></div></article>
      </section>
      <section className="dashboard-grid">
        <article className="panel activity-panel">
          <SectionHeading eyebrow="YOUR MOVEMENT" title="Recent activity" action="View all" onAction={() => onNavigate("activity")} />
          <div className="activity-list">{recent.map((item) => <ActivityRow key={item.id} activity={item} />)}</div>
          {recent.length === 0 && <p className="empty-copy">Your next activity starts here.</p>}
        </article>
        <article className="panel goal-panel">
          <SectionHeading eyebrow="ONE WEEK AT A TIME" title="Weekly goal" />
          <div className="goal-visual"><div className="goal-ring" style={{ "--progress": `${weekProgress * 3.6}deg` }}><div className="goal-ring-inner"><span>{weekProgress}%</span><small>completed</small></div></div></div>
          <p className="goal-message">{minutes >= 300 ? "You reached your goal! Amazing work." : <>You’re <strong>{Math.max(0, 300 - minutes)} minutes</strong> away from your goal. You’ve got this!</>}</p>
          <div className="goal-meta"><span><i className="legend-dot" />This week</span><span>{minutes} / 300 min</span></div>
        </article>
      </section>
      <section className="panel teams-preview">
        <div className="team-preview-copy"><div><p className="eyebrow">BETTER TOGETHER</p><h2>Your teams</h2><p>Find your people and make every step count.</p></div><button className="text-button" onClick={() => onNavigate("teams")}>Explore teams<Icon name="arrow" size={16} /></button></div>
        <div className="team-mini-grid">{teams.filter((team) => ["Peak Performers", "Early Birds"].includes(team.name)).map((team) => <div className="team-mini-card" key={team.name}><div className={`team-emoji ${team.color}`}>{team.icon}</div><div className="team-mini-info"><strong>{team.name}</strong><span>{team.members} members <span className="muted-separator">·</span> {team.progress}% goal</span></div><div className="mini-progress"><span style={{ width: `${team.progress}%` }} /></div></div>)}</div>
      </section>
    </>}
  </>;
}

function TeacherOverview({ onNavigate }) {
  return <><section className="stats-grid teacher-stats"><article className="stat-card"><div className="stat-top"><span className="stat-label">Active students</span><span className="stat-icon mint-icon"><Icon name="team" size={18} /></span></div><div className="stat-value">24<span> students</span></div><div className="stat-caption"><span className="trend-up">↗ 4</span> more active this week</div></article><article className="stat-card"><div className="stat-top"><span className="stat-label">Class activity</span><span className="stat-icon peach-icon"><Icon name="activity" size={18} /></span></div><div className="stat-value">1,284<span> min</span></div><div className="stat-caption">Student activity this week</div></article><article className="stat-card"><div className="stat-top"><span className="stat-label">Team goals met</span><span className="stat-icon lilac-icon"><Icon name="trophy" size={18} /></span></div><div className="stat-value">3<span> / 5</span></div><div className="stat-caption">Teams are on track this week</div></article></section><section className="panel teacher-panel"><SectionHeading eyebrow="YOUR CLASS" title="Student leaderboard" action="Full leaderboard" onAction={() => onNavigate("leaderboard")} /><div className="activity-list">{students.slice(0, 4).map((student, index) => <div className="student-row" key={student.name}><span className={`student-rank${index < 3 ? " top-rank" : ""}`}>{String(index + 1).padStart(2, "0")}</span><Avatar initials={student.initials} color={student.color} small /><div className="student-info"><strong>{student.name}</strong><span>{student.minutes} active minutes this week</span></div><strong className="student-points">{student.points.toLocaleString()} <small>pts</small></strong></div>)}</div></section><section className="teacher-banner"><span className="teacher-banner-icon">✦</span><div><strong>Every student moves at their own pace.</strong><p>Celebrate progress, encourage participation, and keep your class moving together.</p></div></section></>;
}

function ActivityRow({ activity }) {
  return <div className="activity-row"><span className={`activity-emoji ${activity.color}`}>{activity.icon}</span><div className="activity-info"><strong>{activity.title}</strong><span>{activity.detail}</span></div><div className="activity-time"><strong>{activity.duration} <small>min</small></strong><span>{activity.date}</span></div></div>;
}

function ActivityPage({ activities, minutes, onLog }) {
  return <><section className="welcome-row"><div><p className="eyebrow">YOUR PROGRESS</p><h1>My activity</h1><p className="welcome-subtitle">Every move matters. Look how far you’ve come.</p></div><button className="primary-button" onClick={onLog}><Icon name="plus" size={18} />Log activity</button></section><section className="activity-summary"><div className="summary-icon"><Icon name="clock" size={21} /></div><div><span>Total active minutes</span><strong>{minutes} <small>min</small></strong></div><span className="summary-period">All time</span></section><section className="panel activity-page-panel"><SectionHeading eyebrow="KEEP IT GOING" title="Activity history" /><div className="activity-list">{activities.map((activity) => <ActivityRow key={activity.id} activity={activity} />)}</div>{activities.length === 0 && <p className="empty-copy">No activities yet. Log your first one to get started!</p>}</section></>;
}

function TeamsPage({ joinedTeams, onToggle }) {
  return <><section className="welcome-row"><div><p className="eyebrow">FIND YOUR PEOPLE</p><h1>Teams</h1><p className="welcome-subtitle">Good things happen when we move together.</p></div></section><section className="team-banner"><span className="banner-sparkle">✦</span><div><strong>Progress is better together.</strong><p>Join a team, cheer each other on, and reach your goals as a crew.</p></div><span className="banner-doodle">↗</span></section><section className="section-heading team-list-heading"><div><p className="eyebrow">CAMPUS COMMUNITY</p><h2>Find your next team</h2></div><span className="team-count">{teams.length} teams</span></section><div className="teams-grid">{teams.map((team) => { const joined = joinedTeams.includes(team.name); return <article className="team-card" key={team.name}><div className="team-card-top"><div className={`team-emoji team-emoji-large ${team.color}`}>{team.icon}</div><span className="team-members"><Icon name="team" size={15} />{team.members} members</span></div><h3>{team.name}</h3><p className="team-goal-label">THIS WEEK’S GOAL</p><p className="team-goal">{team.goal}</p><div className="team-progress-label"><span>Team progress</span><strong>{team.progress}%</strong></div><div className="progress-track team-progress-track"><span style={{ width: `${team.progress}%` }} /></div><button className={`team-join-button${joined ? " joined" : ""}`} onClick={() => onToggle(team.name)}>{joined ? <><Icon name="check" size={16} />Joined</> : <>Join team<Icon name="arrow" size={15} /></>}</button></article>; })}</div></>;
}

function LeaderboardPage({ leaderboard, userRank, isTeacher }) {
  return <><section className="welcome-row"><div><p className="eyebrow">{isTeacher ? "YOUR CLASS IS ON THE MOVE" : "A LITTLE FRIENDLY MOTIVATION"}</p><h1>{isTeacher ? "Class leaderboard" : "Leaderboard"}</h1><p className="welcome-subtitle">{isTeacher ? "Celebrate the effort behind every point." : "Every active minute gets you one step higher."}</p></div><span className="leaderboard-period">This week <Icon name="chevron" size={15} /></span></section><section className="leaderboard-highlight"><div className="podium-sparkle">✦</div><span className="podium-label">THIS WEEK’S TOP MOVER</span><Avatar initials={leaderboard[0]?.initials ?? "JL"} color={leaderboard[0]?.color ?? "avatar-blue"} /><h2>{leaderboard[0]?.name ?? "Your class"}</h2><p>{leaderboard[0]?.minutes ?? 0} active minutes <span>·</span> {leaderboard[0]?.points.toLocaleString() ?? 0} points</p><div className="podium-rank">#1</div></section><section className="panel leaderboard-panel"><div className="leaderboard-table-head"><span>RANK</span><span>STUDENT</span><span>ACTIVE MINUTES</span><span>POINTS</span></div><div>{leaderboard.map((student, index) => <div className={`leaderboard-row${student.name === "Maya Chen" ? " current-user" : ""}`} key={student.name}><span className={`leaderboard-rank${index < 3 ? " top-rank" : ""}`}>{index < 3 ? ["🥇", "🥈", "🥉"][index] : `#${index + 1}`}</span><div className="leaderboard-person"><Avatar initials={student.initials} color={student.color} small /><strong>{student.name}{student.name === "Maya Chen" && <span className="you-tag">YOU</span>}</strong></div><span className="leaderboard-minutes">{student.minutes} <small>min</small></span><strong className="leaderboard-points">{student.points.toLocaleString()}</strong></div>)}</div><div className="leaderboard-note">You’re currently <strong>#{userRank}</strong> — keep moving to climb the board!</div></section></>;
}

function WorkoutsPage({ onStart }) {
  return <><section className="welcome-row"><div><p className="eyebrow">MADE FOR YOUR MOMENT</p><h1>Workout ideas</h1><p className="welcome-subtitle">A little inspiration for wherever you are today.</p></div></section><section className="workout-banner"><div><p className="eyebrow">YOUR NEXT GOOD THING</p><h2>Movement that fits your day.</h2><p>Short on time or looking for a challenge? Find a workout that meets you where you are.</p></div><span className="workout-banner-art">⚡</span></section><section className="section-heading workout-list-heading"><div><p className="eyebrow">PICK YOUR PACE</p><h2>Just for you</h2></div><span className="workout-count">{workouts.length} ideas</span></section><div className="workouts-grid">{workouts.map((workout) => <article className="workout-card" key={workout.title}><div className={`workout-art ${workout.color}`}><span>{workout.icon}</span><span className="workout-art-star">✦</span></div><div className="workout-card-body"><span className="workout-type">{workout.type}</span><h3>{workout.title}</h3><p>{workout.description}</p><div className="workout-meta"><span><Icon name="clock" size={15} />{workout.duration}</span><span className="workout-level">{workout.level}</span></div><button className="workout-start" onClick={() => onStart(workout.title)}>View workout<Icon name="arrow" size={16} /></button></div></article>)}</div><p className="workout-disclaimer">Workout suggestions are general ideas. Choose movements that feel right for you and ask a teacher for guidance.</p></>;
}

function ActivityModal({ onClose, onSubmit }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="activity-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-header"><div><p className="eyebrow">A WIN WORTH NOTING</p><h2 id="modal-title">Log an activity</h2></div><button className="icon-button modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={20} /></button></div><p className="modal-intro">Big workout or little walk — it all counts.</p><form onSubmit={onSubmit}><label className="form-field">Activity name<input autoFocus name="title" placeholder="e.g. After-school walk" maxLength="50" required /></label><div className="form-row"><label className="form-field">Activity type<select name="type"><option>Running</option><option>Strength</option><option>Swimming</option><option>Cycling</option><option>Walking</option></select></label><label className="form-field">Duration (minutes)<input name="duration" type="number" min="1" max="600" placeholder="30" required /></label></div><div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button"><Icon name="check" size={17} />Save activity</button></div></form></section></div>;
}

export default App;
