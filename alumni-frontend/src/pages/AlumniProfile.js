import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AlumniProfile() {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://alumniconnect-fixed-swl8.vercel.app/api/alumni/${id}`);
        setAlumni(res.data.alumni || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div style={styles.loading}>Loading profile...</div>;
  if (!alumni) return <div style={styles.loading}>Alumni not found.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>AlumniConnect</h2>
        <a href="/browse-alumni" style={styles.backLink}>← Back</a>
      </div>
      <div style={styles.body}>
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.avatar}>{alumni.name ? alumni.name.charAt(0).toUpperCase() : '?'}</div>
            <p style={styles.name}>{alumni.name}</p>
            <p style={styles.role}>{alumni.job_title} {alumni.company ? `· ${alumni.company}` : ''}</p>
            <div style={styles.divider} />
            <div style={styles.infoSection}>
              <p style={styles.sectionTitle}>College Info</p>
              <div style={styles.infoRow}><span style={styles.label}>Batch</span><span>{alumni.batch}</span></div>
              <div style={styles.infoRow}><span style={styles.label}>Branch</span><span>{alumni.branch}</span></div>
              <div style={styles.infoRow}><span style={styles.label}>Roll No.</span><span>{alumni.roll_number}</span></div>
            </div>
            <div style={styles.infoSection}>
              <p style={styles.sectionTitle}>Contact</p>
              <div style={styles.infoRow}><span style={styles.label}>Email</span><span>{alumni.email}</span></div>
              <div style={styles.infoRow}><span style={styles.label}>Phone</span><span>{alumni.phone}</span></div>
              <div style={styles.infoRow}><span style={styles.label}>City</span><span>{alumni.city}</span></div>
            </div>
          </div>
          <div style={styles.card}>
            <p style={styles.sectionTitle}>Online Presence</p>
            <p style={styles.subtitle}>Profile discovery requires the deep search service, which is not currently deployed.</p>
            <div style={styles.profileList}>
              <div style={styles.profileCard}>
                <div style={{...styles.platformIcon, background: '#0077B5'}}>in</div>
                <div style={styles.profileInfo}>
                  <p style={styles.platformName}>LinkedIn</p>
                  {alumni.linkedin_url ? (
                    <a href={alumni.linkedin_url} target="_blank" rel="noreferrer" style={styles.profileLink}>{alumni.linkedin_url}</a>
                  ) : (<p style={styles.notFound}>Not provided</p>)}
                </div>
              </div>
              <div style={styles.profileCard}>
                <div style={{...styles.platformIcon, background: '#333'}}>GH</div>
                <div style={styles.profileInfo}>
                  <p style={styles.platformName}>GitHub</p>
                  {alumni.github_url ? (
                    <a href={alumni.github_url} target="_blank" rel="noreferrer" style={styles.profileLink}>{alumni.github_url}</a>
                  ) : (<p style={styles.notFound}>Not provided</p>)}
                </div>
              </div>
              <div style={styles.profileCard}>
                <div style={{...styles.platformIcon, background: '#1DA1F2'}}>X</div>
                <div style={styles.profileInfo}>
                  <p style={styles.platformName}>Twitter / X</p>
                  {alumni.twitter_handle ? (
                    <p style={styles.profileLink}>{alumni.twitter_handle}</p>
                  ) : (<p style={styles.notFound}>Not provided</p>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f4f8' },
  navbar: { background: '#1A3C6E', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: '#fff', margin: 0 },
  backLink: { color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' },
  body: { padding: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  card: { background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  avatar: { width: '56px', height: '56px', borderRadius: '50%', background: '#E6F1FB', color: '#0C447C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '600', marginBottom: '1rem' },
  name: { margin: '0 0 4px', color: '#1A3C6E', fontSize: '18px' },
  role: { margin: '0 0 1rem', color: '#888', fontSize: '13px' },
  divider: { borderTop: '1px solid #eee', margin: '1rem 0' },
  infoSection: { marginBottom: '0.5rem' },
  sectionTitle: { fontWeight: '600', color: '#1A3C6E', fontSize: '13px', margin: '0 0 8px' },
  subtitle: { color: '#888', fontSize: '12px', margin: '0 0 1rem' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' },
  label: { color: '#888' },
  profileList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  profileCard: { display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #eee', borderRadius: '10px', padding: '12px' },
  platformIcon: { width: '32px', height: '32px', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', flexShrink: 0 },
  platformName: { margin: '0 0 2px', fontSize: '13px', fontWeight: '500' },
  profileInfo: { flex: 1 },
  profileLink: { fontSize: '11px', color: '#2E6DA4', wordBreak: 'break-all' },
  notFound: { fontSize: '11px', color: '#aaa', margin: 0 },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '16px', color: '#1A3C6E' }
};

export default AlumniProfile;