import React from 'react';
import { useNavigate } from 'react-router-dom';

function AlumniDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name') || 'Alumni';

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>AlumniConnect</h2>
        <button style={styles.logoutBtn} onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}>Logout</button>
      </div>
      <div style={styles.body}>
        <h3 style={styles.welcome}>Welcome back, {name}! 👋</h3>
        <p style={styles.subtitle}>What would you like to do today?</p>
        <div style={styles.grid}>
          <div style={styles.card} onClick={() => navigate('/my-profile')}>
            <div style={styles.icon}>👤</div>
            <h3 style={styles.cardTitle}>My Profile</h3>
            <p style={styles.cardDesc}>View and update your personal and professional information</p>
            <button style={styles.cardBtn}>Open Profile →</button>
          </div>
          <div style={styles.card} onClick={() => navigate('/browse-alumni')}>
            <div style={styles.icon}>🎓</div>
            <h3 style={styles.cardTitle}>Browse Alumni</h3>
            <p style={styles.cardDesc}>Explore profiles of other alumni from your college</p>
            <button style={styles.cardBtn}>Browse →</button>
          </div>
          <div style={styles.card} onClick={() => navigate('/deep-search')}>
            <div style={styles.icon}>🔍</div>
            <h3 style={styles.cardTitle}>Deep Search</h3>
            <p style={styles.cardDesc}>Find where alumni are active on LinkedIn, GitHub and Twitter</p>
            <button style={styles.cardBtn}>Search →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight:'100vh', backgroundColor:'#f0f4f8' },
  navbar: { background:'#1A3C6E', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' },
  logo: { color:'#fff', margin:0 },
  logoutBtn: { padding:'6px 14px', borderRadius:'8px', background:'rgba(255,255,255,0.15)', color:'#fff', border:'none', fontSize:'13px', cursor:'pointer' },
  body: { padding:'2rem' },
  welcome: { color:'#1A3C6E', marginBottom:'8px' },
  subtitle: { color:'#888', fontSize:'14px', marginBottom:'2rem' },
  grid: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1.5rem' },
  card: { background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 10px rgba(0,0,0,0.08)', cursor:'pointer', textAlign:'center', transition:'transform 0.2s' },
  icon: { fontSize:'40px', marginBottom:'1rem' },
  cardTitle: { color:'#1A3C6E', margin:'0 0 8px' },
  cardDesc: { color:'#888', fontSize:'13px', margin:'0 0 1.5rem', lineHeight:'1.5' },
  cardBtn: { padding:'8px 20px', borderRadius:'8px', backgroundColor:'#1A3C6E', color:'#fff', border:'none', fontSize:'13px', cursor:'pointer' }
};

export default AlumniDashboard;