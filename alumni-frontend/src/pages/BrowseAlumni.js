import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BrowseAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [filters, setFilters] = useState({ name:'', batch:'', branch:'', city:'', company:'' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadAlumni = async () => {
    setLoading(true);
    const res = await fetch('https://alumniconnect-fixed-swl8.vercel.app/api/alumni');
    const data = await res.json();
    let list = data.alumni || [];
    Object.entries(filters).forEach(([k, v]) => {
      if (v) list = list.filter(a => (a[k] || '').toLowerCase().includes(v.toLowerCase()));
    });
    setAlumni(list);
    setLoading(false);
  };

  useEffect(() => { loadAlumni(); }, []);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>AlumniConnect</h2>
        <button style={styles.backBtn} onClick={() => navigate('/alumni-dashboard')}>← Back</button>
      </div>
      <div style={styles.body}>
        <h3 style={styles.heading}>Browse Alumni</h3>
        <div style={styles.filterBox}>
          <div style={styles.filterGrid}>
            {['name','batch','branch','city','company'].map(f => (
              <input key={f} style={styles.input}
                placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
                value={filters[f]}
                onChange={e => setFilters({...filters, [f]: e.target.value})} />
            ))}
          </div>
          <div style={styles.btnRow}>
            <button style={styles.searchBtn} onClick={loadAlumni}>Search</button>
            <button style={styles.clearBtn} onClick={() => setFilters({ name:'', batch:'', branch:'', city:'', company:'' })}>Clear</button>
          </div>
        </div>
        <p style={styles.count}>{loading ? 'Loading...' : `${alumni.length} alumni found`}</p>
        <div style={styles.grid}>
          {alumni.map(a => (
            <div key={a.id} style={styles.card}>
              <div style={styles.avatar}>{a.name ? a.name.charAt(0).toUpperCase() : '?'}</div>
              <div style={styles.info}>
                <p style={styles.name}>{a.name}</p>
                <p style={styles.sub}>🎓 {a.branch} · Batch {a.batch}</p>
                <p style={styles.sub}>💼 {a.company} · {a.city}</p>
              </div>
              <div style={styles.actions}>
                <button style={styles.profileBtn}
                  onClick={() => navigate(`/alumni-profile/${a.id}`, { state: a })}>
                  View Profile
                </button>
                <button style={styles.searchBtnCard}
                  onClick={() => navigate('/deep-search', { state: a })}>
                  Deep Search
                </button>
              </div>
            </div>
          ))}
        </div>
        {!loading && alumni.length === 0 && (
          <div style={styles.empty}>No alumni found. Try different filters!</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight:'100vh', backgroundColor:'#f0f4f8' },
  navbar: { background:'#1A3C6E', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' },
  logo: { color:'#fff', margin:0 },
  backBtn: { color:'rgba(255,255,255,0.8)', background:'none', border:'none', fontSize:'14px', cursor:'pointer' },
  body: { padding:'2rem' },
  heading: { color:'#1A3C6E', marginBottom:'1rem' },
  filterBox: { background:'#fff', padding:'1.5rem', borderRadius:'12px', marginBottom:'1.5rem', boxShadow:'0 2px 10px rgba(0,0,0,0.08)' },
  filterGrid: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr', gap:'1rem', marginBottom:'1rem' },
  input: { padding:'10px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px' },
  btnRow: { display:'flex', gap:'8px' },
  searchBtn: { padding:'10px 24px', borderRadius:'8px', backgroundColor:'#1A3C6E', color:'#fff', border:'none', fontSize:'14px', cursor:'pointer' },
  clearBtn: { padding:'10px 24px', borderRadius:'8px', backgroundColor:'#fff', color:'#555', border:'1px solid #ddd', fontSize:'14px', cursor:'pointer' },
  count: { color:'#888', fontSize:'13px', marginBottom:'1rem' },
  grid: { display:'flex', flexDirection:'column', gap:'10px' },
  card: { background:'#fff', padding:'1rem 1.5rem', borderRadius:'12px', display:'flex', alignItems:'center', gap:'1rem', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' },
  avatar: { width:'48px', height:'48px', borderRadius:'50%', background:'#E6F1FB', color:'#0C447C', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:'600', flexShrink:0 },
  info: { flex:1 },
  name: { margin:'0 0 4px', fontSize:'14px', fontWeight:'500', color:'#1A3C6E' },
  sub: { margin:'0 0 2px', fontSize:'12px', color:'#888' },
  actions: { display:'flex', gap:'8px', flexShrink:0 },
  profileBtn: { padding:'7px 14px', borderRadius:'8px', backgroundColor:'#1A3C6E', color:'#fff', border:'none', fontSize:'12px', cursor:'pointer' },
  searchBtnCard: { padding:'7px 14px', borderRadius:'8px', backgroundColor:'#27AE60', color:'#fff', border:'none', fontSize:'12px', cursor:'pointer' },
  empty: { textAlign:'center', color:'#aaa', padding:'3rem' }
};

export default BrowseAlumni;