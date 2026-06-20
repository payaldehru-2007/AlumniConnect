import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentSignup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    setSuccess('');
    if (!name || !username || !password) {
      setError('Please fill all fields');
      return;
    }
    try {
      await axios.post('https://alumniconnect-fixed-swl8.vercel.app/api/auth/register', {
        name, username, password
      });
      setSuccess('Account created! You can now sign in.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create account');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>AlumniConnect</h2>
        <p style={styles.subtitle}>Create your alumni account</p>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <input style={styles.input} type="text" placeholder="Full Name"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} type="text" placeholder="Choose a Username"
          value={username} onChange={(e) => setUsername(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Choose a Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button style={styles.button} onClick={handleSignup}>Create Account</button>
        <p style={styles.note} onClick={() => navigate('/')}>Already have an account? Sign in</p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', backgroundColor:'#f0f4f8' },
  card: { background:'#fff', padding:'2rem', borderRadius:'12px', width:'380px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', display:'flex', flexDirection:'column', gap:'1rem' },
  title: { margin:0, color:'#1A3C6E', fontSize:'24px' },
  subtitle: { margin:0, color:'#888', fontSize:'13px' },
  input: { padding:'10px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px' },
  button: { padding:'10px', borderRadius:'8px', backgroundColor:'#1A3C6E', color:'#fff', border:'none', fontSize:'14px', cursor:'pointer' },
  error: { color:'red', fontSize:'13px', margin:0 },
  success: { color:'green', fontSize:'13px', margin:0 },
  note: { margin:0, fontSize:'12px', color:'#1A3C6E', textAlign:'center', cursor:'pointer', textDecoration:'underline' }
};

export default StudentSignup;