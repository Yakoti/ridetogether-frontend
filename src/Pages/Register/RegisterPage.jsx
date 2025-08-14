import { useState } from 'react';

export default function RegisterForm() {
  const [role, setRole] = useState('PASSENGER');
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    homeAddress: '', officeAddress: '',
    preferredArrivalStart: '', preferredArrivalEnd: '',
    flexibilityMinutes: '', flexibilityKm: '',
    availableSeats: '', costPer100KmEUR: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...form,
      role,
      availableSeats: role === 'DRIVER' ? form.availableSeats || null : null,
      costPer100KmEUR: role === 'DRIVER' ? form.costPer100KmEUR || null : null
    };

    console.log(payload);

    await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  };

  const fieldStyle = { display: 'block', margin: '8px 0', padding: '6px', width: '100%', maxWidth: '300px' };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '320px', margin: '0 auto' }}>
      <input name="name" placeholder="Name" onChange={handleChange} required style={fieldStyle} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={fieldStyle} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={fieldStyle} />
      <input name="phone" placeholder="Phone" onChange={handleChange} required style={fieldStyle} />
      <input name="homeAddress" placeholder="Home Address" onChange={handleChange} style={fieldStyle} />
      <input name="officeAddress" placeholder="Office Address" onChange={handleChange} style={fieldStyle} />
      <input name="preferredArrivalStart" type="time" placeholder="Preferred Arrival Start" onChange={handleChange} style={fieldStyle} />
      <input name="preferredArrivalEnd" type="time" placeholder="Preferred Arrival End" onChange={handleChange} style={fieldStyle} />
      <input name="flexibilityMinutes" type="number" placeholder="Flexibility Minutes" onChange={handleChange} style={fieldStyle} />
      <input name="flexibilityKm" type="number" step="0.1" placeholder="Flexibility Km" onChange={handleChange} style={fieldStyle} />

      <select value={role} onChange={e => setRole(e.target.value)} style={fieldStyle}>
        <option value="PASSENGER">Passenger</option>
        <option value="DRIVER">Driver</option>
      </select>

      {role === 'DRIVER' && (
        <>
          <input name="availableSeats" type="number" placeholder="Available Seats" onChange={handleChange} style={fieldStyle} />
          <input name="costPer100KmEUR" type="number" step="0.01" placeholder="Cost per 100 km" onChange={handleChange} style={fieldStyle} />
        </>
      )}

      <button type="submit" style={{ ...fieldStyle, width: 'auto' }}>Register</button>
    </form>
  );
}
